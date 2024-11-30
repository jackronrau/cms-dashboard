"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlockForm } from "@/components/blocks/block-form";
import { LoadingState } from "@/components/shared/loading-state";
import type { ContentBlock } from "@/types/resources";

interface EditBlockPageProps {
  params: {
    id: string;
  };
}

export default function EditBlockPage({ params }: EditBlockPageProps) {
  const [block, setBlock] = useState<ContentBlock | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlock() {
      try {
        const response = await fetch(`/api/blocks/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch block");
        }
        const data = await response.json();
        setBlock(data);
      } catch (error) {
        console.error("Error fetching block:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlock();
  }, [params.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!block) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Content Block</h1>
        <p className="text-muted-foreground mt-2">
          Update content block information and settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Block Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BlockForm block={block} />
        </CardContent>
      </Card>
    </div>
  );
}