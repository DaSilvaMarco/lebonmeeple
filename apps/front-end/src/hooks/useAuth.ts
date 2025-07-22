import { useAppSelector } from '../store';
import {
  selectUser,
  selectToken,
  selectIsAuthenticated,
  selectIsLoading,
} from '../store/authSlice';

/**
 * Hook personnalisé pour accéder facilement aux données d'authentification
 */
export function useAuth() {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
  };
}

/**
 * Hook pour créer des headers d'authentification pour les appels API
 */
export function useAuthHeaders() {
  const { token } = useAuth();

  const getAuthHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  return { getAuthHeaders };
}
