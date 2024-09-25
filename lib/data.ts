import { Answer, AnswerStatus, RankEntry, User } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const userId = cookies().get("user_id")?.value;

  if (!userId) {
    return null;
  }

  const { rows } = await sql`SELECT * FROM users WHERE id = ${userId}`;
  return rows[0] as User;
}

export async function getUserByName(username: string) {
  const { rows } = await sql`SELECT * FROM users WHERE username = ${username}`;
  return rows[0] as User;
}

export async function getUserAnswers(userId: number) {
  const { rows } = await sql`SELECT * FROM answers WHERE user_id = ${userId}`;

  return rows as Answer[];
}

export async function signup(username: string) {
  const { rows } =
    await sql`INSERT INTO users (username) VALUES (${username}) RETURNING *`;

  cookies().set("user_id", rows[0].id.toString(), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: "lax",
  });
}

export async function submit(
  answers: Answer[],
  testDuration: number,
  testTimeLeft: number
) {
  const user = await getCurrentUser();

  if (!user) {
    return { errors: { user: ["Não está logado"] } };
  }

  const correctAnswers = answers.filter(
    (answer) => answer.status === AnswerStatus.CORRECT
  );

  const points = correctAnswers.length * testTimeLeft;

  await sql.query(`
    INSERT INTO answers (user_id, question, answer, correct_answer, status)
    VALUES ${answers
      .map(
        (answer) =>
          `(${user.id}, '${answer.question}', '${answer.answer}', '${answer.correct_answer}', '${answer.status}')`
      )
      .join(", ")}
    RETURNING *;
  `);

  await sql`INSERT INTO ranking (user_id, points, test_duration) VALUES (${user.id}, ${points}, ${testDuration})`;
}

export async function getRanking() {
  const { rows } =
    await sql`SELECT ranking.points as points, ranking.test_duration as test_duration, users.username as username FROM ranking JOIN users ON users.id = ranking.user_id ORDER BY points DESC`;

  return rows as RankEntry[];
}
