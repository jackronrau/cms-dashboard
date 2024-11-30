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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import { toolFormSchema, type ToolFormValues, defaultValues } from "./tool-form-schema";
import type { Tool } from "@/types";

interface ToolFormProps {
  tool?: Tool;
  categories: Array<{ id: string; name: string }>;
}

export function ToolForm({ tool, categories }: ToolFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    tool?.categories || []
  );

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: tool ? {
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      type: tool.type,
      usage: tool.usage,
      websiteUrl: tool.websiteUrl,
      logoUrl: tool.logoUrl,
      contentStatus: tool.contentStatus,
      categories: tool.categories,
      metaTitle: tool.metaTitle,
      metaDescription: tool.metaDescription,
      ogImage: tool.ogImage,
      canonicalUrl: tool.canonicalUrl,
    } : defaultValues,
  });

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

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];

      form.setValue("categories", newSelection);
      return newSelection;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Next.js" {...field} />
                </FormControl>
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
                  <Input placeholder="nextjs" {...field} />
                </FormControl>
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
              <FormLabel className="required">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of the tool..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type and Usage Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="github">GitHub Project</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Usage Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select usage type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* URLs Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Categories Section */}
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel className="required">Categories</FormLabel>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <span>{category.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={selectedCategories.includes(category.id) ? "text-primary" : "text-muted-foreground"}
                      >
                        {selectedCategories.includes(category.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.map((categoryId) => (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleCategoryToggle(categoryId)}
                  >
                    {categories.find(c => c.id === categoryId)?.name}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SEO Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="SEO title" {...field} />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ogImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Social share image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="canonicalUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canonical URL</FormLabel>
                <FormControl>
                  <Input placeholder="Canonical URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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