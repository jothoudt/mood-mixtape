import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from '../components/PlaylistItem';

export const recommendationApi = createApi({
  reducerPath: 'recommendationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getRecommendations: builder.query<Song[], { mood: string; genre: string }>({
      query: ({ mood, genre }) => ({
        url: '/chatgpt/tracks',
        method: 'GET',
        params: { mood, genre },
      }),
    }),
  }),
});

export const { useLazyGetRecommendationsQuery } = recommendationApi;
