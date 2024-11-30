"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library, Users, Activity, Star } from "lucide-react";

const stats = [
  {
    name: "Total Tools",
    value: "248",
    change: "+12",
    icon: Library,
  },
  {
    name: "Monthly Visitors",
    value: "45.2K",
    change: "+18%",
    icon: Users,
  },
  {
    name: "Active Now",
    value: "573",
    change: "+201",
    icon: Activity,
  },
  {
    name: "Total Stars",
    value: "120.8K",
    change: "+4.3K",
    icon: Star,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-green-500 mt-1">
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}