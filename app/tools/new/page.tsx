"use client";

import { ToolForm } from "@/components/tools/tool-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewToolPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Tool</h1>
        <p className="text-muted-foreground mt-2">
          Add a new developer tool to the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tool Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ToolForm categories={[]} />
        </CardContent>
      </Card>
    </div>
  );
}