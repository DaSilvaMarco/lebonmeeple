import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma-service/prisma.module';
import { GuardModule } from '@guard/guard.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [ConfigModule, PrismaModule, GuardModule, JwtModule.register({})],
  controllers: [UserController],
  providers: [JwtStrategy, UserService],
  exports: [JwtStrategy],
})
export class UserModule {}
