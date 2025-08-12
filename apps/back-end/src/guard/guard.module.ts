import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaModule } from '@prisma-service/prisma.module';
import { IsOwnerOrAdminGuard } from './is-owner-or-admin.guard';

@Module({
  imports: [PrismaModule],
  providers: [IsOwnerOrAdminGuard, Reflector],
  exports: [IsOwnerOrAdminGuard],
})
export class GuardModule {}
