import { SigninDto } from 'apps/back-end/src/domains/user/dtos';

export const SIGNIN_DTO = new SigninDto('testuser@gmail.com', 'pouetpouet');

export const SIGNIN_WRONG_DTO = new SigninDto(
  'testuser@gmail.com',
  'wrongpassword',
);
