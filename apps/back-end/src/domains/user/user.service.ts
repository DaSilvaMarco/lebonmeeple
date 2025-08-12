import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { throwError } from '@utils/errors';
import { PrismaService } from '@prisma-service/prisma.service';
import { SignupUserDto } from './dtos/signup-user-dto';
import { SigninUserDto } from './dtos/signin-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { createUser } from './usecases/create-user';
import { signinUser } from './usecases/signin-user';
import { getUser } from './usecases/get-user';
import { updateUser } from './usecases/update-user';
import { meUser } from './usecases/me-user';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signup = async (signupDto: SignupUserDto) => {
    try {
      return await createUser(signupDto, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  signin = async (signinDto: SigninUserDto) => {
    try {
      return await signinUser(
        signinDto,
        this.prismaService,
        this.jwtService,
        this.configService,
      );
    } catch (error) {
      throwError(error);
    }
  };

  getById = async (id: number) => {
    try {
      return await getUser(id, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  update = async (id: number, updateDto: UpdateUserDto) => {
    try {
      return await updateUser(id, updateDto, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  me = async (request: Request) => {
    try {
      return await meUser(request, this.jwtService);
    } catch (error) {
      throwError(error);
    }
  };
}
