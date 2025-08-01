import { type PrismaService } from '@prisma-service/prisma.service';

export type PermissionChecker = (
  user: number,
  paramId: number,
  prisma: PrismaService,
) => Promise<boolean>;
