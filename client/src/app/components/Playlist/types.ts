import { Song } from '../PlaylistItem/types';

export type PlaylistProps = {
  mood: string;
  genre: string;
  accessToken: string | null;
  songs: Song[];
};
