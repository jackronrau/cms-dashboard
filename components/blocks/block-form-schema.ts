import * as z from "zod";

export const blockFormSchema = z.object({
  type: z.string().min(1, "Type is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  order: z.number().min(0, "Order must be 0 or greater"),
  status: z.enum(["draft", "published", "archived"]),
  toolId: z.string().optional(),
  sourceId: z.string().optional(),
  version: z.string().optional(),
});

export type BlockFormValues = z.infer<typeof blockFormSchema>;

export const defaultValues: Partial<BlockFormValues> = {
  type: "overview",
  status: "draft",
  order: 0,
};