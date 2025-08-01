import { ForbiddenException } from '@nestjs/common';
import { type Request } from 'express';
import { permissionCheckers } from './permissions/index';
import { type PrismaService } from '@prisma-service/prisma.service';
import { type BasicUser } from '@domains/user/types/users';

export const isAuthorized = async (
  request: Request,
  paramId: number,
  prismaService: PrismaService,
): Promise<boolean> => {
  // eslint-disable-next-line prefer-destructuring
  const resource = request.originalUrl.split('/')[1];
  const user = request.user as BasicUser;

  const permissionChecker = permissionCheckers[resource];

  if (!permissionChecker) {
    throw new ForbiddenException('Unauthorized resource type');
  }

  return await permissionChecker(user.id, paramId, prismaService);
};
