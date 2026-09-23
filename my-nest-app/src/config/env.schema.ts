import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z
    .string()
    .min(32, { message: 'JWT_SECRET must be at least 32 characters long' }),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

// Create a TypeScript type inferred directly from the Zod validation schema
export type EnvConfig = z.infer<typeof envSchema>;
