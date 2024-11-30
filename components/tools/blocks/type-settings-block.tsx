"use client";

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "../tool-form-schema";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TypeSettingsBlockProps {
  form: UseFormReturn<ToolFormValues>;
  categories: Array<{ id: string; name: string; }>;
}

export function TypeSettingsBlock({ form, categories }: TypeSettingsBlockProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(form.getValues("categories") || []);

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
    <Card className="border-l-4 border-l-purple-500/40">
      <CardHeader>
        <CardTitle>Type Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tool type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="github">GitHub Project</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The type of tool being added.
              </FormDescription>
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
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
              <FormDescription>
                The pricing model of the tool.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormDescription>
                Select the categories that best describe this tool.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Content Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The current status of the tool content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}