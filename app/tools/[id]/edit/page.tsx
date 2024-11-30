"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolEditForm } from "@/components/tools/tool-edit-form";
import { LoadingState } from "@/components/shared/loading-state";
import type { Tool } from "@/types";

interface EditToolPageProps {
  params: {
    id: string;
  };
}

export default function EditToolPage({ params }: EditToolPageProps) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTool() {
      try {
        const response = await fetch(`/api/tools/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch tool");
        }
        const data = await response.json();
        setTool(data);
      } catch (error) {
        console.error("Error fetching tool:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTool();
  }, [params.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!tool) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Tool</h1>
        <p className="text-muted-foreground mt-2">
          Update tool information and settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tool Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ToolEditForm tool={tool} />
        </CardContent>
      </Card>
    </div>
  );
}