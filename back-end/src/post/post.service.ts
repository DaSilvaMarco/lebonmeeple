import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';
import { Request } from 'express';

const PRISMA_CLIENT_KNOWN_REQUEST_ERROR = 'PrismaClientKnownRequestError';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, request: Request) {
    const id = request.user['id'];
    const { body, title, image } = createPostDto;
    const post = await this.prismaService.post.create({
      data: {
        body: body,
        title: title,
        userId: id,
        image: image,
      },
    });

    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
        },
      });

      return { ...post, user };
    } catch (err) {
      throw new BadRequestException('User not found');
    }
  }

  async delete(id: number, request: Request) {
    try {
      const userId = request.user['userId'];
      await this.prismaService.post.delete({ where: { id, userId } });
      return { data: 'Post deleted !' };
    } catch (err) {
      if (err.name === PRISMA_CLIENT_KNOWN_REQUEST_ERROR) {
        throw new NotFoundException('Post or User Not found !');
      }
    }
  }

  async getAll() {
    try {
      const userInclude = {
        user: {
          select: {
            username: true,
            email: true,
            password: false,
            userId: true,
          },
        },
      };

      return await this.prismaService.post.findMany({
        include: {
          ...userInclude,
        },
      });
    } catch (err) {
      throw new NotFoundException('Posts not found');
    }
  }

  async get(id: number) {
    try {
      return await this.prismaService.post.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              username: true,
              email: true,
              password: false,
              id: true,
            },
          },
        },
      });
    } catch (err) {
      throw new NotFoundException('Post not found !');
    }
  }

  async update(id: number, request: Request, updatePostDto: UpdatePostDto) {
    try {
      const userId = request.user['userId'];
      await this.prismaService.post.update({
        where: { id, userId },
        data: { ...updatePostDto },
      });
      return { data: 'Post updated !' };
    } catch (err) {
      throw new UnauthorizedException('Unauthorized action !');
    }
  }
}
