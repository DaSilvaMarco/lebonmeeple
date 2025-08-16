import { Module } from '@nestjs/common';
import { UserModule } from '@domains/user/user.module';
import { PrismaModule } from '@prisma-service/prisma.module';
import { GuardModule } from '@guard/guard.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [UserModule, PrismaModule, GuardModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
