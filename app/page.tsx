import Questions from "@/components/questions";
import ibcData from "@/lib/ibc-data";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full grow">
      <Questions questions={ibcData.questions} />
    </main>
  );
}
