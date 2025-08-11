import { Song } from '../PlaylistItem/types';

export type PlaylistProps = {
  accessToken?: string;
  songs: Song[];
};
