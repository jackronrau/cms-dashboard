import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  displayOrder: z.number().min(0, "Display order must be 0 or greater"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const defaultValues: Partial<CategoryFormValues> = {
  name: "",
  slug: "",
  description: "",
  displayOrder: 0,
  metaTitle: "",
  metaDescription: "",
};