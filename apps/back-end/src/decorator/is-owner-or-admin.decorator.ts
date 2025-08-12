import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IsOwnerOrAdminGuard } from '@guard/is-owner-or-admin.guard';

export function IsOwner() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), IsOwnerOrAdminGuard),
    ApiBearerAuth('access-token'),
  );
}
