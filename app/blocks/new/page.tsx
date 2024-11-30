"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlockForm } from "@/components/blocks/block-form";

export default function NewBlockPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Content Block</h1>
        <p className="text-muted-foreground mt-2">
          Create a new reusable content block.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Block Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BlockForm />
        </CardContent>
      </Card>
    </div>
  );
}