"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryForm } from "@/components/categories/category-form";
import { LoadingState } from "@/components/shared/loading-state";
import type { Category } from "@/components/categories/columns";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch(`/api/categories/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategory();
  }, [params.id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!category) {
    return notFound();
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-muted-foreground mt-2">
          Update category information and settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}