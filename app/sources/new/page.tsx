"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SourceForm } from "@/components/sources/source-form";
import { LoadingState } from "@/components/shared/loading-state";

export default function NewSourcePage() {
  const [tools, setTools] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch('/api/tools');
        if (!response.ok) throw new Error('Failed to fetch tools');
        const data = await response.json();
        setTools(data.map((tool: any) => ({
          id: tool.id,
          name: tool.name
        })));
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTools();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Content Source</h1>
        <p className="text-muted-foreground mt-2">
          Configure a new content synchronization source.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Source Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SourceForm tools={tools} />
        </CardContent>
      </Card>
    </div>
  );
}