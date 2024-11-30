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
import { blockFormSchema, type BlockFormValues } from "./block-form-schema";

interface BlockFormProps {
  block?: BlockFormValues;
}

export function BlockForm({ block }: BlockFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BlockFormValues>({
    resolver: zodResolver(blockFormSchema),
    defaultValues: block || {
      type: "overview",
      status: "draft",
      order: 0,
    },
  });

  async function onSubmit(data: BlockFormValues) {
    setIsLoading(true);
    try {
      const url = block ? `/api/blocks/${block.id}` : "/api/blocks";
      const method = block ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(block ? "Failed to update block" : "Failed to create block");
      }

      router.push("blocks");
      router.refresh();
    } catch (error) {
      console.error("Error saving block:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select block type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                  <SelectItem value="examples">Examples</SelectItem>
                  <SelectItem value="tips">Tips & Tricks</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The type of content block you're creating.
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
                The content of this block. Supports Markdown formatting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
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
                  Order in which this block appears.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
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
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Current status of this content block.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : block ? "Save Changes" : "Create Block"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("blocks")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}