import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Middleware par défaut avec serialization check désactivé pour les fonctions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer ces actions qui peuvent contenir des fonctions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks typés pour TypeScript
export { useDispatch, useSelector } from 'react-redux';
export type { TypedUseSelectorHook } from 'react-redux';

// Hooks personnalisés avec types
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
