import { type User } from '@backend/domains/user/types';
import { ForbiddenException } from '@nestjs/common';

export const checkUserPermission = async (
  user: User,
  paramId: number,
): Promise<boolean> => {
  if (user.id === paramId || user.roles.includes('ADMIN')) {
    return true;
  }

  throw new ForbiddenException('The user is not you');
};
