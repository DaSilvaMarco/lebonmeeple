import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/domains/user/slice';
import { lebonmeepleApi } from './lebonmeepleApi';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [lebonmeepleApi.reducerPath]: lebonmeepleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lebonmeepleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
