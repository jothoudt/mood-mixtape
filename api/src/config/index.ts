import z from 'zod';
import dotenv from 'dotenv';
dotenv.config();

export const ConfigSchema = z.object({
  port: z.coerce.number().gte(1000),
  openApiKey: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

const safeParsedConfig = ConfigSchema.safeParse({
  port: process.env.PORT,
  openApiKey: process.env.OPEN_API_KEY,
});

if (!safeParsedConfig.success) {
  console.log('Unable to parse config', JSON.stringify(safeParsedConfig.error.issues));
  process.exit(1)
}

export const config = safeParsedConfig.data;
