import { describe, it, expect, vi } from 'vitest';
import { postSignin } from '../api/post-signin';
import { API_USER_SIGNIN, POST_METHOD } from '../constants';

const mockResponse = {
  token: 'fake-token',
  user: { id: 1, email: 'test@test.com' },
};

// Mock global fetch
const fetchMock = vi.fn(async () => ({
  json: async () => mockResponse,
}));

describe('postSignin', () => {
  it('should call fetch with correct params and return response json', async () => {
    // @ts-expect-error: global.fetch n'est pas typé dans l'environnement de test
    global.fetch = fetchMock;
    const data = { email: 'test@test.com', password: '123456' };
    const result = await postSignin(data);
    expect(fetchMock).toHaveBeenCalledWith(API_USER_SIGNIN(), {
      method: POST_METHOD,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    expect(result).toEqual(mockResponse);
  });
});
