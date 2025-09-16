// roles.guard.ts (simple, un solo rol por usuario)
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { clerkClient, getAuth } from '@clerk/express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    type RequestWithAuth = Request & {
      claims?: {
        publicMetadata?: {
          roles?: string;
        };
      };
      auth?: {
        userId?: string | string[];
      };
    };

    const req = context.switchToHttp().getRequest<RequestWithAuth>();

    const auth = getAuth(req);

    const user = await clerkClient.users.getUser(auth?.userId ?? '');

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const userRole: string | string[] = user.publicMetadata.roles as string;

    if (!userRole) {
      throw new ForbiddenException('Required role not met');
    }
    // If userRole is an array, check intersection
    if (Array.isArray(userRole)) {
      const hasRequiredRole = userRole.some((role: string) =>
        requiredRoles.includes(role),
      );
      if (!hasRequiredRole) {
        throw new ForbiddenException('Required role not met');
      }
    } else {
      // userRole is a string
      if (!requiredRoles.includes(userRole)) {
        throw new ForbiddenException('Required role not met');
      }
    }

    return Promise.resolve(true);
  }
}
