import { postSignup } from '../api/post-signup';
import { API_USER_SIGNUP, POST_METHOD } from '../constants';
import type { SignupFormData } from '../type';

global.fetch = vi.fn();

describe('postSignup', () => {
  const mockData: SignupFormData = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
    passwordConfirmation: 'password',
    avatar: 'avatar.png',
  };

  it('should call fetch with correct arguments and return response', async () => {
    const mockResponse = { success: true };

    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await postSignup(mockData);

    expect(fetch).toHaveBeenCalledWith(API_USER_SIGNUP(), {
      method: POST_METHOD,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: mockData.username,
        email: mockData.email,
        password: mockData.password,
        passwordConfirmation: mockData.passwordConfirmation,
        avatar: mockData.avatar,
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should set avatar to empty string if not provided', async () => {
    const dataNoAvatar = { ...mockData, avatar: undefined };
    const mockResponse = { success: true };
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    await postSignup(dataNoAvatar);
    const lastCall = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.at(-1);
    expect(lastCall).toBeDefined();
    expect(JSON.parse(lastCall![1].body).avatar).toBe('');
  });
});
