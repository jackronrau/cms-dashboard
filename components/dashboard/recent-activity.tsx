"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

const activities = [
  {
    type: "tool_added",
    tool: "Next.js",
    time: "2 hours ago",
    description: "New tool added to the database",
  },
  {
    type: "sync_completed",
    tool: "TypeScript",
    time: "4 hours ago",
    description: "GitHub data sync completed",
  },
  {
    type: "tool_updated",
    tool: "React",
    time: "6 hours ago",
    description: "Tool information updated",
  },
  {
    type: "category_added",
    tool: "Frontend Tools",
    time: "8 hours ago",
    description: "New category created",
  },
  {
    type: "tool_deleted",
    tool: "Legacy Tool",
    time: "1 day ago",
    description: "Tool removed from database",
  },
];

const typeStyles = {
  tool_added: "text-green-500",
  sync_completed: "text-blue-500",
  tool_updated: "text-yellow-500",
  category_added: "text-purple-500",
  tool_deleted: "text-red-500",
};

export function RecentActivity() {
  return (
    <ScrollArea className="h-[350px] pr-4">
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className="relative">
              <Circle
                className={cn(
                  "h-2 w-2 fill-current",
                  typeStyles[activity.type as keyof typeof typeStyles]
                )}
              />
              {index !== activities.length - 1 && (
                <div className="absolute left-[3px] top-[12px] h-full w-[2px] bg-muted" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{activity.tool}</span>
                <span className="text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}