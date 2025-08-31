import { z } from "zod";

export const outreachResultSchema = z.object({
  clientsReached: z.number().min(0),
  executionTime: z.number().min(0),
  emailsSent: z.number().min(0),
  successRate: z.number().min(0).max(100),
  avgPersonalization: z.number().min(0).max(100)
});

export type OutreachResult = z.infer<typeof outreachResultSchema>;

export const triggerOutreachSchema = z.object({
  timestamp: z.string().optional(),
  source: z.string().optional()
});

export type TriggerOutreach = z.infer<typeof triggerOutreachSchema>;
