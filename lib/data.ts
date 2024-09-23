import { SignupData } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { SafeParseSuccess } from "zod";

async function findByPhoneOrEmail(phone: string, email: string) {
  try {
    const { rows: phoneRows } =
      await sql`SELECT * FROM cadastros WHERE phone = ${phone}`;
    const { rows: emailRows } =
      await sql`SELECT * FROM cadastros WHERE email = ${email}`;

    const result: Record<string, boolean> = {};

    if (phoneRows[0]) result.phone = true;
    if (emailRows[0]) result.email = true;

    return result;
  } catch (error) {
    console.error(error);
  }
}

async function signup({ data }: SafeParseSuccess<SignupData>) {
  try {
    await sql`INSERT INTO cadastros (email, phone, name, areas) VALUES (${
      data.email
    }, ${data.phone}, ${data.name}, ARRAY [${JSON.stringify(data.areas)}])`;
  } catch (error) {
    console.error(error);
  }
}

const data = {
  signup,
  findByPhoneOrEmail,
};

export default data;
