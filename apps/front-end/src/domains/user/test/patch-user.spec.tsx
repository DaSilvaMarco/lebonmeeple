import { vi } from 'vitest';
// Mock getMe at top-level for Vitest
vi.mock('../api/get-me', () => ({
  getMe: vi.fn(),
}));
import { patchUser } from '../api/patch-user';
import { getMe } from '../api/get-me';
import { API_USER_UPDATE, PATCH_METHOD } from '../constants';

describe('patchUser', () => {
  const token = 'test-token';
  const userId = 123;
  const formData = {
    email: 'test@example.com',
    username: 'testuser',
    avatar: 'avatar.png',
  };
  const updatedUser = { id: userId, ...formData };

  beforeEach(() => {
    vi.resetAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (getMe as any).mockResolvedValue({ id: userId });
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue({ json: vi.fn().mockResolvedValue(updatedUser) }),
    );
  });

  it('should patch user and return updated user', async () => {
    const result = await patchUser(formData, token);
    expect(result).toEqual(updatedUser);
    expect(getMe).toHaveBeenCalledWith(token);
    expect(fetch).toHaveBeenCalledWith(
      API_USER_UPDATE().replace('{id}', String(userId)),
      expect.objectContaining({
        method: PATCH_METHOD,
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
        body: JSON.stringify(formData),
      }),
    );
  });
});
