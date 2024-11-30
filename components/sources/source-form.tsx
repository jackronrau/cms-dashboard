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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { sourceFormSchema, type SourceFormValues } from "./source-form-schema";

interface SourceFormProps {
  source?: SourceFormValues;
  tools: Array<{ id: string; name: string }>;
}

export function SourceForm({ source, tools }: SourceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SourceFormValues>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: source || {
      type: "official",
      updateFrequency: "weekly",
      isActive: true,
    },
  });

  async function onSubmit(data: SourceFormValues) {
    setIsLoading(true);
    try {
      const url = source ? `/api/sources/${source.id}` : "/api/sources";
      const method = source ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(source ? "Failed to update source" : "Failed to create source");
      }

      router.push("sources");
      router.refresh();
    } catch (error) {
      console.error("Error saving source:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="toolId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Tool</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tool" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tools.map((tool) => (
                      <SelectItem key={tool.id} value={tool.id}>
                        {tool.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Source Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="official">Official Documentation</SelectItem>
                    <SelectItem value="github">GitHub Repository</SelectItem>
                    <SelectItem value="community">Community Content</SelectItem>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Source URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/docs" {...field} />
              </FormControl>
              <FormDescription>
                The URL where the content will be synced from.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <FormField
            control={form.control}
            name="updateFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Update Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Active Status</FormLabel>
                  <FormDescription>
                    Enable or disable content synchronization
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : source ? "Save Changes" : "Create Source"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("sources")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}