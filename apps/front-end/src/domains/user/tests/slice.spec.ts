import { configureStore } from '@reduxjs/toolkit';
import {
  login,
  logout,
  selectIsAuthenticated,
  selectIsLoading,
  selectToken,
  selectUser,
  updateUser,
  userSlice,
} from '../slice';
import { initialState } from '../constants';
import { type User, type UserState } from '../type';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('userSlice', () => {
  let store: ReturnType<typeof configureStore<{ user: UserState }>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
    });
    localStorageMock.clear();
  });

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    avatar: 'avatar.jpg',
    roles: ['USER'],
  };

  const mockToken = 'mock-jwt-token';

  describe('login action', () => {
    it('should handle login action', () => {
      const action = login({ user: mockUser, token: mockToken });

      store.dispatch(action);
      const state = store.getState().user;

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
      expect(localStorageMock.getItem('authToken')).toBe(mockToken);
      expect(localStorageMock.getItem('user')).toBe(JSON.stringify(mockUser));
    });
  });

  describe('logout action', () => {
    it('should handle logout action', () => {
      // First login
      store.dispatch(login({ user: mockUser, token: mockToken }));

      // Then logout
      store.dispatch(logout());
      const state = store.getState().user;

      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(localStorageMock.getItem('authToken')).toBe(null);
      expect(localStorageMock.getItem('user')).toBe(null);
    });
  });

  describe('updateUser action', () => {
    it('should update user when user exists', () => {
      // First login
      store.dispatch(login({ user: mockUser, token: mockToken }));

      const updatedData = {
        username: 'updateduser',
        email: 'updated@example.com',
        avatar: 'new-avatar.jpg',
        roles: ['USER'],
      };

      store.dispatch(updateUser(updatedData));
      const state = store.getState().user;

      const expectedUser = { ...mockUser, ...updatedData };
      expect(state.user).toEqual(expectedUser);
      expect(localStorageMock.getItem('user')).toBe(
        JSON.stringify(expectedUser),
      );
    });

    it('should not update user when user is null', () => {
      const updatedData = {
        username: 'updateduser',
        email: 'updated@example.com',
        roles: ['USER'],
      };

      store.dispatch(updateUser(updatedData));
      const state = store.getState().user;

      expect(state.user).toBe(null);
      expect(localStorageMock.getItem('user')).toBe(null);
    });
  });

  describe('selectors', () => {
    const mockState = {
      user: {
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      } as UserState,
    };

    it('should select user', () => {
      expect(selectUser(mockState)).toEqual(mockUser);
    });

    it('should select token', () => {
      expect(selectToken(mockState)).toBe(mockToken);
    });

    it('should select isAuthenticated', () => {
      expect(selectIsAuthenticated(mockState)).toBe(true);
    });

    it('should select isLoading', () => {
      expect(selectIsLoading(mockState)).toBe(false);
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().user;
      expect(state).toEqual(initialState);
    });
  });
});
