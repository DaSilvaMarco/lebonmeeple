import { describe, it, expect, vi } from 'vitest';
import { getMe } from '../api/get-me';
import { GET_METHOD } from '../constants';

const mockToken = 'test-token';
const mockMe = { id: 1, name: 'John Doe' };

vi.mock('../constants', () => ({
  API_USER_ME: vi.fn(() => 'https://api.test/me'),
  GET_METHOD: 'GET',
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockMe),
  }),
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

describe('getMe', () => {
  it('fetches user data with correct headers and returns parsed json', async () => {
    const result = await getMe(mockToken);
    expect(global.fetch).toHaveBeenCalledWith('https://api.test/me', {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockToken}`,
      },
    });
    expect(result).toEqual(mockMe);
  });
});
