"use client";

import { ResourceForm } from "@/components/resources/resource-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewResourcePage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Resource</h1>
        <p className="text-muted-foreground mt-2">
          Create educational content or documentation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceForm />
        </CardContent>
      </Card>
    </div>
  );
}