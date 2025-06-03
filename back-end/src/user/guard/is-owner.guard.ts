import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = request.params['id'];

    if (!user || !paramId) {
      throw new ForbiddenException('Missing user or target resource');
    }

    if (user.id !== Number(paramId)) {
      throw new ForbiddenException('You can only modify your own data');
    }

    return true;
  }
}
