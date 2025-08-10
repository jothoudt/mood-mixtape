import { z } from 'zod';

const song = z.object({
  title: z.string(),
  artist: z.string(),
});

export type Song = z.infer<typeof song>;
