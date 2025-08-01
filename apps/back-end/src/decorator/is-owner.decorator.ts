import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IsOwnerGuard } from '@guard/is-owner.guard';

export function IsOwner() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), IsOwnerGuard),
    ApiBearerAuth('access-token'),
  );
}
