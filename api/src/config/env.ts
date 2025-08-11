import 'dotenv/config';
import { z } from 'zod';

const Env = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://127.0.0.1:3000'),

  OPEN_API_KEY: z.string(),
  SPOTIFY_API_BASE_URL: z.string().default('https://api.spotify.com/v1'),
});

export const env = Env.parse(process.env);
