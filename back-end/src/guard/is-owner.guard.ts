import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { isAuthorized } from './index';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService
  ) {}

  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const paramId = request.params['id'];

    if (!user || !paramId) {
      throw new ForbiddenException('Missing user or target resource');
    }

    return await isAuthorized(request, Number(paramId), this.prismaService);
  };
}
