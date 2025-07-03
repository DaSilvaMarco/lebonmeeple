import { PrismaService } from 'src/prisma/prisma.service';

export type PermissionChecker = (
  user: number,
  paramId: number,
  prisma: PrismaService,
) => Promise<boolean>;
