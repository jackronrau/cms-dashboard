"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "../tool-form-schema";

interface SeoSettingsBlockProps {
  form: UseFormReturn<ToolFormValues>;
}

export function SeoSettingsBlock({ form }: SeoSettingsBlockProps) {
  return (
    <Card className="border-l-4 border-l-amber-500/40">
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}