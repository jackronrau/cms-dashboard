"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { categoryFormSchema, type CategoryFormValues, defaultValues } from "./category-form-schema";
import type { Category } from "./columns";

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  console.log('CategoryFormCategoryFormCategoryForm')
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: category ? {
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      displayOrder: category.displayOrder,
      metaTitle: category.metaTitle || "",
      metaDescription: category.metaDescription || "",
    } : defaultValues,
  });

  async function onSubmit(data: CategoryFormValues) {
    console.log("submit")
    setIsLoading(true);
    try {
      const url = category
        ? `/api/categories/${category.id}`
        : "/api/categories";
      const method = category ? "PUT" : "POST";
      console.log("url:", url, method);
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(category ? "Failed to update category" : "Failed to create category");
      }

      router.push("categories");
      router.refresh();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Development Tools" {...field} />
                      </FormControl>
                      <FormDescription>
                        Display name of the category
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="development-tools" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL-friendly version of the name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of what this category contains..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem className="max-w-[180px]">
                    <FormLabel className="required">Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Lower numbers appear first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO optimized title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Title used for SEO purposes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO description" {...field} />
                      </FormControl>
                      <FormDescription>
                        Description used for SEO purposes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : category ? "Save Changes" : "Create Category"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("categories")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}