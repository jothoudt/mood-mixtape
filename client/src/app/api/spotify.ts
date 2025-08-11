import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from '../components/PlaylistItem';

type CreatePlaylistRequest = {
  name?: string;
  songs: Song[];
  accessToken: string;
};

type CreatePlaylistResponse = {
  playlistId: string;
  url: string;
};

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    createSpotifyPlaylist: builder.mutation<CreatePlaylistResponse, CreatePlaylistRequest>({
      query: ({ name, songs, accessToken }) => ({
        url: '/spotify/playlist',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { name, songs },
      }),
    }),
  }),
});

export const { useCreateSpotifyPlaylistMutation } = spotifyApi;
