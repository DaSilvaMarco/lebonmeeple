import { checkPostPermission } from './post';
import { PermissionChecker } from './type';
import { checkUserPermission } from './user';
import { checkCommentPermission } from './comment';

export const permissionCheckers: Record<string, PermissionChecker> = {
  post: checkPostPermission,
  user: checkUserPermission,
  comment: checkCommentPermission,
};
