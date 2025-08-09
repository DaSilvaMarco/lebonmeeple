import { describe, it, expect, vi } from 'vitest';
import {
  API_USER_ME,
  API_USER_SIGNIN,
  API_USER_UPDATE,
  API_USER_SIGNUP,
  GET_METHOD,
  POST_METHOD,
  PATCH_METHOD,
  DELETE_METHOD,
  initialState,
} from '../constants';

// Mock the api-config module
vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: vi.fn(() => 'http://localhost:3000'),
}));

describe('User Constants', () => {
  describe('API URL functions', () => {
    it('should return correct API URLs', () => {
      expect(API_USER_ME()).toBe('http://localhost:3000/user/me');
      expect(API_USER_SIGNIN()).toBe('http://localhost:3000/user/signin');
      expect(API_USER_UPDATE()).toBe('http://localhost:3000/user/{id}');
      expect(API_USER_SIGNUP()).toBe('http://localhost:3000/user/signup');
    });
  });

  describe('HTTP methods', () => {
    it('should export correct HTTP method constants', () => {
      expect(GET_METHOD).toBe('GET');
      expect(POST_METHOD).toBe('POST');
      expect(PATCH_METHOD).toBe('PATCH');
      expect(DELETE_METHOD).toBe('DELETE');
    });
  });

  describe('Initial state', () => {
    it('should have correct initial state structure', () => {
      expect(initialState).toEqual({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    });
  });
});
