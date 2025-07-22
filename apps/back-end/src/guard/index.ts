import { ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { permissionCheckers } from './permissions/index';
import { PrismaService } from '../prisma/prisma.service';
import { BasicUser } from '../domains/user/types/users';

export const isAuthorized = async (
  request: Request,
  paramId: number,
  prismaService: PrismaService,
): Promise<boolean> => {
  const resource = request.originalUrl.split('/')[1];
  const user = request.user as BasicUser;

  const permissionChecker = permissionCheckers[resource];

  if (!permissionChecker) {
    throw new ForbiddenException('Unauthorized resource type');
  }

  return await permissionChecker(user.id, paramId, prismaService);
};
