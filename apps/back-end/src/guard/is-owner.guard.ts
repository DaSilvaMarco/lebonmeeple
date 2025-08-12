import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { isAuthorized } from './index';
import { PrismaService } from '@prisma-service/prisma.service';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  canActivate = async (context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();

    const { user } = request;
    const paramId = request.params['id'];

    if (!user || !paramId) {
      throw new ForbiddenException('Missing user or target resource');
    }

    return await isAuthorized(request, Number(paramId), this.prismaService);
  };
}
