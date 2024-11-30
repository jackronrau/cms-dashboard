"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { name: "Jan", tools: 125, visitors: 35 },
  { name: "Feb", tools: 156, visitors: 42 },
  { name: "Mar", tools: 178, visitors: 48 },
  { name: "Apr", tools: 201, visitors: 52 },
  { name: "May", tools: 225, visitors: 58 },
  { name: "Jun", tools: 248, visitors: 62 },
];

export function Overview() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tools"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}