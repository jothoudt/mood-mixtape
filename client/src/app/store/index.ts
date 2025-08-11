import { configureStore } from '@reduxjs/toolkit';
import { recommendationApi } from '../api/chatgpt';
import { spotifyApi } from '../api/spotify';

export const store = configureStore({
  reducer: {
    [recommendationApi.reducerPath]: recommendationApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(recommendationApi.middleware)
      .concat(spotifyApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
