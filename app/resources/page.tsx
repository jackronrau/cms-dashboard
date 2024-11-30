"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceDataTable } from "@/components/resources/data-table";
import { columns } from "@/components/resources/columns";
import Link from "next/link";
import { LoadingState } from "@/components/shared/loading-state";
import { EmptyState } from "@/components/shared/empty-state";
import type { Resource } from "@/types/resources";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch("/api/resources");
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResources();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!resources.length) {
    return (
      <EmptyState
        title="No resources found"
        description="Get started by creating your first resource."
        actionLabel="Add Resource"
        actionhref="/resources/new"
      />
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground mt-2">
            Manage educational content and documentation.
          </p>
        </div>
        <Button asChild>
          <Link href="/resources/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-lg">
        <ResourceDataTable columns={columns} data={resources} />
      </div>
    </div>
  );
}