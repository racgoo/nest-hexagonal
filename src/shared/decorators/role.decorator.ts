import { UserType } from 'src/domains/user/models/user.model';
import { ROLES_KEY } from '../guards/role-auth.guard';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
