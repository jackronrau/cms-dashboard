"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicInfoBlock } from "./blocks/basic-info-block";
import { TypeSettingsBlock } from "./blocks/type-settings-block";
import { SeoSettingsBlock } from "./blocks/seo-settings-block";
import { toolFormSchema, type ToolFormValues, defaultValues } from "./tool-form-schema";
import { LoadingState } from "@/components/shared/loading-state";
import type { Tool } from "@/types";
import type { Category } from "@/lib/services/category-service";

interface ToolFormProps {
  tool?: Tool;
}

export function ToolForm({ tool }: ToolFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: tool ? {
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      type: tool.type,
      usage: tool.usage,
      websiteUrl: tool.websiteUrl,
      logoUrl: tool.logoUrl || "",
      contentStatus: tool.contentStatus,
      categories: tool.categories,
      metaTitle: tool.metaTitle || "",
      metaDescription: tool.metaDescription || "",
      ogImage: tool.ogImage || "",
      canonicalUrl: tool.canonicalUrl || "",
    } : defaultValues,
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  async function onSubmit(data: ToolFormValues) {
    setIsLoading(true);
    try {
      const url = tool ? `/api/tools/${tool.id}` : "/api/tools";
      const method = tool ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(tool ? "Failed to update tool" : "Failed to create tool");
      }

      router.push("/admin/tools");
      router.refresh();
    } catch (error) {
      console.error("Error saving tool:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isCategoriesLoading) {
    return <LoadingState />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoBlock form={form} />
        <TypeSettingsBlock form={form} categories={categories} />
        <SeoSettingsBlock form={form} />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : tool ? "Save Changes" : "Create Tool"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/tools")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}