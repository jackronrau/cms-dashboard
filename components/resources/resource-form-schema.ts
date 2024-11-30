import * as z from "zod";

export const resourceFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  type: z.enum(["tutorial", "guide", "best-practice"]),
  content: z.string().min(10, "Content must be at least 10 characters"),
  estimatedReadTime: z.number().min(1, "Must be at least 1 minute"),
  toolId: z.string().optional(),
  slug: z.string().optional(),
  contentBlockId: z.string().optional(),
  isContentBlock: z.boolean().default(false),
});

export type ResourceFormValues = z.infer<typeof resourceFormSchema>;

export const defaultValues: Partial<ResourceFormValues> = {
  type: "tutorial",
  isContentBlock: false,
  estimatedReadTime: 5,
};