import { ForbiddenException } from '@nestjs/common';

export const checkUserPermission = async (
  userId: number,
  paramId: number
): Promise<boolean> => {
  if (userId === paramId) {
    return true;
  }

  throw new ForbiddenException('The user is not you');
};
