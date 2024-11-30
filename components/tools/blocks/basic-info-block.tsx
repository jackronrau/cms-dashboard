"use client";

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "../tool-form-schema";

interface BasicInfoBlockProps {
  form: UseFormReturn<ToolFormValues>;
}

export function BasicInfoBlock({ form }: BasicInfoBlockProps) {
  return (
    <Card className="border-l-4 border-l-blue-500/40">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Name</FormLabel>
              <FormControl>
                <Input placeholder="Next.js" {...field} />
              </FormControl>
              <FormDescription>
                The name of the tool as it will appear on the platform.
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
                <Input placeholder="nextjs" {...field} />
              </FormControl>
              <FormDescription>
                The URL-friendly version of the name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormDescription>
                A clear and concise description of the tool.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}