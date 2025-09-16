import { clerkClient } from '@clerk/express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    const { emailAddress, password } = registerDto;
    const user = await clerkClient.users
      .createUser({
        emailAddress: [emailAddress],
        password: password,
        publicMetadata: { roles: ['user'] },
      })
      .catch((error: ApiError) => {
        if (error.clerkError && error.errors?.length) {
          const [firstError] = error.errors;
          throw new NotFoundException(firstError.longMessage || error.message);
        }
      });
    return user;
  }
}

export interface ApiError {
  statusCode: number;
  message: string;
  clerkError?: boolean;
  errors?: {
    code: string;
    message: string;
    longMessage?: string;
    meta?: Record<string, any>;
  }[];
  traceId?: string;
}
