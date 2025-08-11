import { z } from 'zod';

export const song = z.object({
  title: z.string(),
  artist: z.string(),
});

export type Song = z.infer<typeof song>;
