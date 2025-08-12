import { SigninUserDto } from '@backend/domains/user/dtos/signin-user-dto';

export const SIGNIN_DTO = new SigninUserDto('testuser@gmail.com', 'pouetpouet');

export const SIGNIN_WRONG_DTO = new SigninUserDto(
  'testuser@gmail.com',
  'wrongpassword',
);
