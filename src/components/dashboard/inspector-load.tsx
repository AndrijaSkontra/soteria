"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "John Hernandez",
    inProgress: 186,
    needVerification: 80,
    created: 123,
  },
  {
    month: "Emily Brown",
    inProgress: 305,
    needVerification: 200,
    created: 123,
  },
  {
    month: "Peter Smith",
    inProgress: 237,
    needVerification: 120,
    created: 123,
  },
  {
    month: "Isabella Doe",
    inProgress: 73,
    needVerification: 190,
    created: 123,
  },
  {
    month: "Henry Thompson",
    inProgress: 209,
    needVerification: 130,
    created: 123,
  },
  {
    month: "Jacob White",
    inProgress: 214,
    needVerification: 140,
    created: 123,
  },
];

const chartConfig = {
  inProgress: {
    label: "In Progress",
    color: "hsl(220, 62%, 53%)",
  },
  needVerification: {
    label: "Needs Verification",
    color: "hsl(220, 65%, 40%)",
  },
  created: {
    label: "Created",
    color: "hsl(220, 97%, 23%)",
  },
};

export default function InspectorLoad() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspector Load</CardTitle>
        <CardDescription className="text-wrap">
          Optional description about the inspector load
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[400px] w-[300px] sm:w-[350px] md:w-[600px] lg:w-[750px] xl:w-[900px]"
        >
          <BarChart accessibilityLayer data={chartData} layout="vertical" className="my-2">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="month" type="category" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel className="min-w-44" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="inProgress" stackId="a" fill="var(--color-inProgress)" />
            <Bar dataKey="needVerification" stackId="a" fill="var(--color-needVerification)" />
            <Bar dataKey="created" stackId="a" fill="var(--color-created)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
