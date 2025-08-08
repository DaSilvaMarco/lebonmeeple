import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@prisma-service/prisma.service';

type User = {
  userId: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    const secretKey = configService.get<string>('SECRET_KEY');
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
      ignoreExpiration: false,
    });
  }

  async validate(user: User) {
    const { email } = user;
    const userData = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!userData) throw new UnauthorizedException('Unauthorized');
    return userData;
  }
}
