import { configureStore } from "@reduxjs/toolkit";
import { recommendationApi } from "../api/chatgpt";

export const store = configureStore({
  reducer: {
    [recommendationApi.reducerPath]: recommendationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(recommendationApi.middleware);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
