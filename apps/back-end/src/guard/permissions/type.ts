import { PrismaService } from '../../prisma/prisma.service';

export type PermissionChecker = (
  user: number,
  paramId: number,
  prisma: PrismaService,
) => Promise<boolean>;
