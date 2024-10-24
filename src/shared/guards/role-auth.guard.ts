import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/domains/user/models/user.model';
import { TokenData } from '../modules/auth/auth.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserType[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) return true;
    const { user }: { user: TokenData } = context.switchToHttp().getRequest();
    return !!this.matchRoles(roles, user.payload.type);
  }
  matchRoles(roles: UserType[], userRole: UserType) {
    return roles.some((role) => role === userRole);
  }
}
export const ROLES_KEY = 'roles';
