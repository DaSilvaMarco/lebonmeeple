import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDto {
  constructor(
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    avatar: string = '',
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
    this.avatar = avatar;
  }

  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly passwordConfirmation: string;
  @ApiProperty()
  readonly avatar: string;
}
