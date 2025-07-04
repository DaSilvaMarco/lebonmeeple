import { SigninDto, SignupDto, UpdateDto } from 'src/domains/user/dtos';
import { UserController } from 'src/domains/user/user.controller';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('UserController', () => {
  let controller: UserController;
  // eslint-disable-next-line
  let userServiceMock: any;

  beforeEach(() => {
    userServiceMock = {
      signup: vi.fn(),
      signin: vi.fn(),
      me: vi.fn(),
      getById: vi.fn(),
      update: vi.fn(),
    };

    controller = new UserController(userServiceMock);
  });

  it('should call signup with correct dto and return result', async () => {
    const dto: SignupDto = {
      email: 'test@test.com',
      password: 'pass',
      username: 'user',
      passwordConfirmation: 'pass',
      avatar: 'avatar.png',
    };
    const expectedResult = { id: 1, ...dto };

    userServiceMock.signup.mockResolvedValue(expectedResult);

    const result = await controller.signup(dto);

    expect(userServiceMock.signup).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });

  it('should call signin with correct dto and return result', async () => {
    const dto: SigninDto = { email: 'test@test.com', password: 'pass' };
    const expectedResult = { token: 'jwt.token' };

    userServiceMock.signin.mockResolvedValue(expectedResult);

    const result = await controller.signin(dto);

    expect(userServiceMock.signin).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });

  it('should call me with request and return user data', async () => {
    const fakeRequest = { user: { id: 1 } };
    const expectedResult = { id: 1, email: 'test@test.com' };

    userServiceMock.me.mockResolvedValue(expectedResult);

    // eslint-disable-next-line
    const result = await controller.me(fakeRequest as any);

    expect(userServiceMock.me).toHaveBeenCalledWith(fakeRequest);
    expect(result).toEqual(expectedResult);
  });

  it('should call getById with id and return user', async () => {
    const userId = 5;
    const expectedResult = { id: userId, email: 'test@test.com' };

    userServiceMock.getById.mockResolvedValue(expectedResult);

    const result = await controller.getById(userId);

    expect(userServiceMock.getById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedResult);
  });

  it('should call update with id and dto and return updated user', async () => {
    const userId = 5;
    const dto: UpdateDto = {
      username: 'newName',
      email: 'test@gmail.com',
      avatar: 'newAvatar.png',
    };
    const expectedResult = { id: userId, username: 'newName' };

    userServiceMock.update.mockResolvedValue(expectedResult);

    const result = await controller.update(userId, dto);

    expect(userServiceMock.update).toHaveBeenCalledWith(userId, dto);
    expect(result).toEqual(expectedResult);
  });
});
