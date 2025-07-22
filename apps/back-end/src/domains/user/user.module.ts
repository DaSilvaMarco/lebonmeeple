import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [JwtStrategy, UserService],
})
export class UserModule {}
