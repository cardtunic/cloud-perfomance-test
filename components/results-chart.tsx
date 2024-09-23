"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Percentage } from "@/lib/definitions";

const chartConfig = {
  value: {
    label: "%",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ResultsChart({
  data,
  className,
}: {
  data: Percentage[];
  className?: string;
}) {
  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[225px] min-[330px]:max-h-[300px] w-full"
      >
        <RadarChart data={data}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="label" />
          <PolarGrid
            className="fill-[--color-value] opacity-20"
            gridType="circle"
          />
          <Radar dataKey="value" fill="var(--color-value)" fillOpacity={0.6} />
        </RadarChart>
      </ChartContainer>
    </div>
  );
}
