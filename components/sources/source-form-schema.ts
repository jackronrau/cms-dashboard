import * as z from "zod";

export const sourceFormSchema = z.object({
  toolId: z.string({
    required_error: "Tool is required",
  }),
  type: z.enum(["official", "github", "community", "manual"], {
    required_error: "Source type is required",
  }),
  url: z.string().url("Must be a valid URL"),
  updateFrequency: z.enum(["daily", "weekly", "manual"], {
    required_error: "Update frequency is required",
  }),
  isActive: z.boolean().default(true),
});

export type SourceFormValues = z.infer<typeof sourceFormSchema>;

export const defaultValues: Partial<SourceFormValues> = {
  type: "official",
  updateFrequency: "weekly",
  isActive: true,
};