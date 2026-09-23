import { treeifyError } from 'node_modules/zod/v4/core';
import { envSchema } from './env.schema';

export function validateEnv(config: Record<string, string>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error('❌ Invalid environment variables configuration:');
    // Format and print Zod errors cleanly to the console log on crash
    console.error(JSON.stringify(treeifyError(result.error), null, 2));
    throw new Error('Environment validation failed');
  }

  return result.data;
}
