"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceForm } from "@/components/resources/resource-form";
import { LoadingState } from "@/components/shared/loading-state";
import type { Resource } from "@/types/resources";

interface EditResourcePageProps {
  params: {
    id: string;
  };
}

export default function EditResourcePage({ params }: EditResourcePageProps) {
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResource() {
      try {
        const response = await fetch(`/api/resources/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch resource");
        }
        const data = await response.json();
        setResource(data);
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResource();
  }, [params.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!resource) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Resource</h1>
        <p className="text-muted-foreground mt-2">
          Update resource information and content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceForm resource={resource} />
        </CardContent>
      </Card>
    </div>
  );
}