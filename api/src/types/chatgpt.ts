import { z } from 'zod';

export const TracksQuery = z.object({
  mood: z.string().min(1),
  genre: z.string().min(1),
});

export type TracksInput = z.infer<typeof TracksQuery>;
