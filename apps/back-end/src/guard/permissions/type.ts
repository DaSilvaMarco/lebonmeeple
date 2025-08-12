import { type User } from '@backend/domains/user/types';
import { type PrismaService } from '@prisma-service/prisma.service';

export type PermissionChecker = (
  user: User,
  paramId: number,
  prisma: PrismaService,
) => Promise<boolean>;
