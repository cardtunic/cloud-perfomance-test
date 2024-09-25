import Results from "@/components/pages/results";
import { getCurrentUser, getRanking, getUserAnswers } from "@/lib/data";
import { User } from "@/lib/definitions";
import questions from "@/lib/questions";

export default async function Page() {
  const user = (await getCurrentUser()) as User;
  const userAnswers = await getUserAnswers(user.id);
  const ranking = await getRanking();

  const userPos = ranking.findIndex((rank) => rank.username === user.username);

  const userPoints = ranking[userPos].points;
  const userCorrectAnswers = userAnswers.filter(
    (answer) => answer.status === "correct"
  ).length;

  const userResults = {
    position: userPos + 1,
    points: userPoints,
    correctAnswers: userCorrectAnswers,
    testDuration: questions.length * 30 - userPoints / userCorrectAnswers,
  };

  return (
    <main className="flex flex-col items-center gap-12 w-full grow">
      <Results ranking={ranking} userResults={userResults} />
    </main>
  );
}
