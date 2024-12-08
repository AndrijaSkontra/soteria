"use client";

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Link } from "@/i18n/routing";
import { getCookie } from "@/lib/get-cookie";

type ChartData = {
  name: string;
  value: number;
  fillLight: string;
  fillDark: string;
};

const chartConfig = {
  value: {
    label: "Value",
  },
} satisfies ChartConfig;

function RadialChart({ data }: { data: ChartData }) {
  const theme = getCookie("theme");
  return (
    <div className="flex flex-col items-center">
      <Link href="#" className="font-medium hover:underline">
        {data.name}
      </Link>
      <ChartContainer config={chartConfig} className="aspect-square h-40">
        <RadialBarChart
          data={[data]}
          startAngle={-70}
          endAngle={250}
          innerRadius={60}
          outerRadius={80}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background dark:first:fill-gray-600"
            polarRadius={[64, 56]}
          />
          <RadialBar
            dataKey="value"
            background
            cornerRadius={10}
            fill={theme === "dark" ? data.fillDark : data.fillLight}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-semibold text-xl"
                      fill={theme === "dark" ? "white" : "black"}
                    >
                      {data.value.toLocaleString()}
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}

const chartsData: ChartData[] = [
  {
    name: "Created",
    value: 988,
    fillLight: "hsl(213 100% 40%)",
    fillDark: "hsl(213 100% 40%)",
  },
  {
    name: "In Progress",
    value: 23,
    fillLight: "hsl(50 100% 40%)",
    fillDark: "hsl(50 100% 40%)",
  },
  {
    name: "Missed",
    value: 42,
    fillLight: "hsl(0 100% 40%)",
    fillDark: "hsl(0 100% 40%)",
  },
  {
    name: "Needs Verification",
    value: 8,
    fillLight: "",
    fillDark: "hsl(13 100% 17%)",
  },
];

export default function TasksByStatus() {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between w-full">
          <div>
            <CardTitle>Tasks based on status</CardTitle>
            <CardDescription className="text-wrap">
              Optional description about tasks based on status
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 gap-4">
          {chartsData.map((data) => (
            <RadialChart key={data.name} data={data} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
