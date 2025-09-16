import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { RegisterDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { RolesGuard } from '../strategies/RoleGuard';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Roles('admin')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return {
        success: true,
        message: 'Success deleted user',
        data: { userCreated: await this.authService.register(registerDto) },
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
}
