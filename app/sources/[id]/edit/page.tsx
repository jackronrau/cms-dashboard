"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SourceForm } from "@/components/sources/source-form";
import { LoadingState } from "@/components/shared/loading-state";
import type { ContentSource } from "@/types/resources";

interface EditSourcePageProps {
  params: {
    id: string;
  };
}

export default function EditSourcePage({ params }: EditSourcePageProps) {
  const [source, setSource] = useState<ContentSource | null>(null);
  const [tools, setTools] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [sourceResponse, toolsResponse] = await Promise.all([
          fetch(`/api/sources/${params.id}`),
          fetch('/api/tools')
        ]);

        if (!sourceResponse.ok) {
          if (sourceResponse.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch source");
        }

        if (!toolsResponse.ok) {
          throw new Error("Failed to fetch tools");
        }

        const [sourceData, toolsData] = await Promise.all([
          sourceResponse.json(),
          toolsResponse.json()
        ]);

        setSource(sourceData);
        setTools(toolsData.map((tool: any) => ({
          id: tool.id,
          name: tool.name
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!source) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Content Source</h1>
        <p className="text-muted-foreground mt-2">
          Update content source configuration.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Source Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SourceForm source={source} tools={tools} />
        </CardContent>
      </Card>
    </div>
  );
}