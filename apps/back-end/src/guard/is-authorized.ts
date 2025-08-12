import { ForbiddenException } from '@nestjs/common';
import { type Request } from 'express';
import { permissionCheckers } from './permissions/permission-checker';
import { type PrismaService } from '@prisma-service/prisma.service';
import { type User } from '@backend/domains/user/types';

export const isAuthorized = async (
  request: Request,
  paramId: number,
  prismaService: PrismaService,
): Promise<boolean> => {
  // eslint-disable-next-line prefer-destructuring
  const ressource = request.originalUrl.split('/')[1];
  const user = request.user as User;

  const permissionChecker = permissionCheckers[ressource];

  if (!permissionChecker) {
    throw new ForbiddenException('Unauthorized resource type');
  }

  return await permissionChecker(user, paramId, prismaService);
};
