import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaModule } from '@prisma-service/prisma.module';
import { IsOwnerGuard } from './is-owner.guard';

@Module({
  imports: [PrismaModule],
  providers: [IsOwnerGuard, Reflector],
  exports: [IsOwnerGuard],
})
export class GuardModule {}
