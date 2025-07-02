import { createUser } from 'src/domains/user/usecases';
import { expect, test, vi } from 'vitest';
import {
  CREATE_USER_ALREADY_EXISTS_CREATE_DTO,
  CREATE_USER_WITH_AVATAR,
  CREATE_USER_WITHOUT_AVATAR,
  CREATE_USER_WRONG_PASSWORDS_CREATE_DTO,
  SIGNUP_DTO,
} from './const';
import {
  prismaMockConflict,
  prismaMock as prismaMockCreate,
  prismaMockUserAlreadyExists,
} from './mock';
import { ConflictException } from '@nestjs/common';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

test('The user can create an account', async () => {
  const prismaMock = prismaMockCreate(SIGNUP_DTO);
  const result = await createUser(SIGNUP_DTO, prismaMock);

  expect(prismaMock.user.create).toHaveBeenCalledWith({
    data: {
      email: SIGNUP_DTO.email,
      username: SIGNUP_DTO.username,
      password: 'hashedPassword',
      avatar: SIGNUP_DTO.avatar,
    },
  });

  expect(result).toMatchObject({
    id: 1,
    email: SIGNUP_DTO.email,
    username: SIGNUP_DTO.username,
    password: 'hashedPassword',
    avatar: SIGNUP_DTO.avatar,
  });
});

test('should throw error if passwords are not the same', async () => {
  await expect(
    createUser(CREATE_USER_WRONG_PASSWORDS_CREATE_DTO, prismaMockConflict)
  ).rejects.toBeInstanceOf(ConflictException);
});

test('should throw error if user already exists', async () => {
  await expect(
    createUser(
      CREATE_USER_ALREADY_EXISTS_CREATE_DTO,
      prismaMockUserAlreadyExists
    )
  ).rejects.toBeInstanceOf(ConflictException);

  await expect(
    createUser(
      CREATE_USER_ALREADY_EXISTS_CREATE_DTO,
      prismaMockUserAlreadyExists
    )
  ).rejects.toThrow('User already exists !');
});

test('should set default avatar to empty string when not provided', () => {
  expect(CREATE_USER_WITHOUT_AVATAR.avatar).toBe('');
});

test('should set avatar when provided', () => {
  expect(CREATE_USER_WITH_AVATAR.avatar).toBe('https://example.com/avatar.png');
});
