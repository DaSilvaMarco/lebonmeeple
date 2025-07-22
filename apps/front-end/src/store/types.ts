// Types centralisés pour le store Redux

import type { RootState } from './index';

// Sélecteurs typés avec RootState
export const createTypedSelector = <T>(selector: (state: RootState) => T) =>
  selector;

// Types d'export pour les autres fichiers
export type { RootState } from './index';
export type { AppDispatch } from './index';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};
