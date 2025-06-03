import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dtos/SignupDto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dtos/SigninDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateDto } from './dtos/UpdateDto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, passwordConfirmation, username, avatar } =
      signupDto;

    if (password !== passwordConfirmation)
      throw new ConflictException('password is not the same');

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user) throw new ConflictException('User already exists !');

    const hash = await bcrypt.hash(password, 10);

    await this.prismaService.user.create({
      data: { email, username, password: hash, avatar },
    });

    return 'User successfully created';
  }

  async signin(signinDto: SigninDto) {
    const { password, email } = signinDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Credentials are not good');
    }

    const userToken = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const userStorage = { ...userToken, avatar: user.avatar };

    const token = this.jwtService.sign(userToken, {
      expiresIn: '2h',
      secret: this.configService.get('SECRET_KEY'),
    });

    return {
      token,
      userStorage,
    };
  }

  async get(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  async update(id: number, updateDto: UpdateDto) {
    const { username, email, avatar } = updateDto;

    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: { username, email, avatar },
      });

      const userReturned = {
        username: user.username,
        userId: user.id,
        email: user.email,
        avatar: user.avatar,
      };

      return userReturned;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  getMe = async (req: Request) => {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    return this.jwtService.decode(token);
  };
}
