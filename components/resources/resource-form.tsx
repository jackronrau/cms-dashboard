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
import { resourceFormSchema, type ResourceFormValues } from "./resource-form-schema";

interface ResourceFormProps {
  resource?: ResourceFormValues;
}

export function ResourceForm({ resource }: ResourceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: resource || {
      type: "tutorial",
      isContentBlock: false,
      estimatedReadTime: 5,
    },
  });

  async function onSubmit(data: ResourceFormValues) {
    setIsLoading(true);
    try {
      const url = resource ? `/api/resources/${resource.id}` : "/api/resources";
      const method = resource ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(resource ? "Failed to update resource" : "Failed to create resource");
      }

      router.push("resources");
      router.refresh();
    } catch (error) {
      console.error("Error saving resource:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Title</FormLabel>
              <FormControl>
                <Input placeholder="Getting Started Guide" {...field} />
              </FormControl>
              <FormDescription>
                The title of your resource or documentation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="best-practice">Best Practice</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The type of content you're creating.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your content here..."
                  className="min-h-[300px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The main content of your resource. Supports Markdown formatting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estimatedReadTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Estimated Read Time (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Approximate time it takes to read this content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : resource ? "Save Changes" : "Create Resource"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("resources")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}