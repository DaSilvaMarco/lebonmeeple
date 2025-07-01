import { SignupDto } from 'src/domains/user/dtos';

export const SIGNUP_DTO = new SignupDto(
  'testuser',
  'testuser@gmail.com',
  'pouetpouet',
  'pouetpouet',
  'https://example.com/avatar.png',
);

export const CREATE_USER_WRONG_PASSWORDS_CREATE_DTO = new SignupDto(
  'testuser',
  'testuser@gmail.com',
  'pouetpouet',
  'pouetpouet2',
  'https://example.com/avatar.png',
);

export const CREATE_USER_ALREADY_EXISTS_CREATE_DTO = new SignupDto(
  'testuser',
  'existing@example.com',
  'pouetpouet',
  'pouetpouet',
  'https://example.com/avatar.png',
);

export const CREATE_USER_WITHOUT_AVATAR = new SignupDto(
  'usernameTest',
  'email@test.com',
  'password123',
  'password123',
);

export const CREATE_USER_WITH_AVATAR = new SignupDto(
  'usernameTest',
  'email@test.com',
  'password123',
  'password123',
  'https://example.com/avatar.png', // avatar fourni explicitement
);