import { z } from 'zod';

export const SongSchema = z.object({
  title: z.string(),
  artist: z.string(),
});

export const CreatePlaylistBody = z.object({
  name: z.string().min(1),
  songs: z.array(SongSchema).min(1),
});

export type CreatePlaylistInput = z.infer<typeof CreatePlaylistBody>;
