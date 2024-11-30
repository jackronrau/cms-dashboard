"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentBlockDataTable } from "@/components/blocks/data-table";
import { columns } from "@/components/blocks/columns";
import Link from "next/link";
import { LoadingState } from "@/components/shared/loading-state";
import { EmptyState } from "@/components/shared/empty-state";
import type { ContentBlock } from "@/types/resources";

export default function ContentBlocksPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const response = await fetch("/api/blocks");
        if (!response.ok) throw new Error("Failed to fetch content blocks");
        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching content blocks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlocks();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!blocks.length) {
    return (
      <EmptyState
        title="No content blocks found"
        description="Get started by creating your first content block."
        actionLabel="Add Content Block"
        actionHref="/blocks/new"
      />
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Blocks</h1>
          <p className="text-muted-foreground mt-2">
            Manage reusable content blocks for documentation.
          </p>
        </div>
        <Button asChild>
          <Link href="/blocks/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Block
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg">
        <ContentBlockDataTable columns={columns} data={blocks} />
      </div>
    </div>
  );
}