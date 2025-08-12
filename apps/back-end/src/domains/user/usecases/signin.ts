import { type SigninDto } from '../dtos/signin';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { type JwtService } from '@nestjs/jwt';
import { type ConfigService } from '@nestjs/config';
import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const signinUser = async (
  signinDto: SigninDto,
  prismaService: PrismaService,
  jwtService: JwtService,
  configService: ConfigService,
) => {
  const { password, email } = signinDto;

  const user = await prismaService.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedException('Credentials are not good');
  }

  const userToken = {
    id: user.id,
    username: user.username,
    email: user.email,
    roles: user.roles,
  };

  const userStorage = { ...userToken, avatar: user.avatar };

  const token = jwtService.sign(userToken, {
    expiresIn: '2h',
    secret: configService.get('SECRET_KEY'),
  });

  return {
    token,
    userStorage,
  };
};
