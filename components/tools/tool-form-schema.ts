import * as z from "zod";

export const toolFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["github", "resource"]),
  usage: z.enum(["free", "paid", "freemium"]),
  websiteUrl: z.string().url("Must be a valid URL"),
  logoUrl: z.string().url("Must be a valid URL").nullable(),
  contentStatus: z.enum(["draft", "published"]),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  ogImage: z.string().url("Must be a valid URL").nullable(),
  canonicalUrl: z.string().url("Must be a valid URL").nullable(),
});

export type ToolFormValues = z.infer<typeof toolFormSchema>;

export const defaultValues: Partial<ToolFormValues> = {
  type: "github",
  usage: "free",
  contentStatus: "draft",
  categories: [],
  metaTitle: null,
  metaDescription: null,
  ogImage: null,
  canonicalUrl: null,
  logoUrl: null
};