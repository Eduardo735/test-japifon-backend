import { verifyToken } from '@clerk/backend';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class ClerkAuthGuard {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const publicKeys = [
      'CLERK_SECRET_KEY',
      'CLERK_SECRET_KEY_ADMIN_PANEL',
    ].filter((key): key is string => !!key);
    const req = context.switchToHttp().getRequest<Request>();
    const token = req?.headers.authorization?.split(' ').pop() || null;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      for (const pubKey of publicKeys) {
        if (typeof token === 'string') {
          const verified = await verifyToken(token, {
            secretKey: this.configService.get(pubKey),
          });
          return verified;
        }
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
