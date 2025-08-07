import z from 'zod';

export const ConfigSchema = z.object({
  port: z.coerce.number().gte(1000),
  openApiKey: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

const safeParsedConfig = ConfigSchema.safeParse({
  port: process.env.PORT,
  openApiKey: process.env.OPEN_API_KEY,
});

export const config = safeParsedConfig.data;
