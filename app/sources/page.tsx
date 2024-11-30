"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentSourceDataTable } from "@/components/sources/data-table";
import { columns } from "@/components/sources/columns";
import Link from "next/link";
import { LoadingState } from "@/components/shared/loading-state";
import { EmptyState } from "@/components/shared/empty-state";
import type { ContentSource } from "@/types/resources";

export default function ContentSourcesPage() {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSources() {
      try {
        const response = await fetch("/api/sources");
        if (!response.ok) throw new Error("Failed to fetch content sources");
        const data = await response.json();
        setSources(data);
      } catch (error) {
        console.error("Error fetching content sources:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSources();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!sources.length) {
    return (
      <EmptyState
        title="No content sources found"
        description="Get started by adding your first content source."
        actionLabel="Add Content Source"
        actionHref="/sources/new"
      />
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Sources</h1>
          <p className="text-muted-foreground mt-2">
            Manage content synchronization sources and settings.
          </p>
        </div>
        <Button asChild>
          <Link href="/sources/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg">
        <ContentSourceDataTable columns={columns} data={sources} />
      </div>
    </div>
  );
}