import { type PrismaBasicUser } from './types';

export const PRISMA_BASIC_USER: PrismaBasicUser = {
  username: true,
  email: true,
  avatar: true,
  password: false,
  id: false,
  createdAt: false,
  updateAt: false,
};
