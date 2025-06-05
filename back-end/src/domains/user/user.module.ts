import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/domains/user/jwtStrategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [JwtStrategy, UserService],
})
export class UserModule {}
