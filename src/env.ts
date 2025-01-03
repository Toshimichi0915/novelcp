import { z } from "zod";

export const EnvSchema = z.object({
  NAROU_USER_ID: z.string(),
});

export const env = EnvSchema.parse(process.env);
