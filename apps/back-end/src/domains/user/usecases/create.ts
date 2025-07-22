import { ConflictException } from '@nestjs/common';
import { SignupDto } from '../dtos/signup';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const createUser = async (
  signupDto: SignupDto,
  prismaService: PrismaService,
) => {
  const { email, password, passwordConfirmation, username, avatar } = signupDto;

  if (password !== passwordConfirmation)
    throw new ConflictException('password is not the same');

  const user = await prismaService.user.findUnique({
    where: { email },
  });

  if (user) throw new ConflictException('User already exists !');

  const hash = await bcrypt.hash(password, 10);

  return prismaService.user.create({
    data: { email, username, password: hash, avatar },
  });
};
