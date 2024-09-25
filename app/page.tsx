import Questions from "@/components/questions";
import questions from "@/lib/questions";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full grow">
      <Questions questions={questions} />
    </main>
  );
}
