import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/domains/user/slice';
import postSlice from '@/domains/post/slice';
import commentSlice from '@/domains/comment/slice';
import { lebonmeepleApi } from './lebonmeepleApi';
import gamesSlice from '@/domains/games/slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
    games: gamesSlice,
    [lebonmeepleApi.reducerPath]: lebonmeepleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lebonmeepleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
