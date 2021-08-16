// @flow
import { ROLE } from '../enums/role';

export function isAdmin(ctx: any) {
  const roles = ctx.user?.roles || [];

  console.log('roles:', roles);

  return roles.includes(ROLE.ADMIN);
}
