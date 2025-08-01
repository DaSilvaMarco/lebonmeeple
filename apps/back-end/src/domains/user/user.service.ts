import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { type SigninDto, type SignupDto, type UpdateDto } from './dtos';
import { throwError } from '@utils/errors';
import { createUser, getById, me, signinUser, updateUser } from './usecases';
import { PrismaService } from '@prisma-service/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signup = async (signupDto: SignupDto) => {
    try {
      return await createUser(signupDto, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  signin = async (signinDto: SigninDto) => {
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
      return await getById(id, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  update = async (id: number, updateDto: UpdateDto) => {
    try {
      return await updateUser(id, updateDto, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  me = async (request: Request) => {
    try {
      return await me(request, this.jwtService);
    } catch (error) {
      throwError(error);
    }
  };
}
