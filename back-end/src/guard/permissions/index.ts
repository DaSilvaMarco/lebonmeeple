import { checkPostPermission } from "./post";
import { PermissionChecker } from "./type";
import { checkUserPermission } from "./user";

export const permissionCheckers: Record<string, PermissionChecker> = {
  post: checkPostPermission,
  user: checkUserPermission,
};
