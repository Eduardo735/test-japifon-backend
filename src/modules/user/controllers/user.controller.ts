import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/strategies/RoleGuard';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Roles('user', 'admin')
  async getMe(@Req() req: Request) {
    try {
      const userMe = await this.userService.getMe(req);
      return {
        success: true,
        message: 'Success fetching  privateMetadata ',
        data: { me: userMe },
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  @Get()
  @Roles('admin')
  async findAllUsers(@Query() query: PaginationQueryDto) {
    try {
      const pagination = await this.userService.findAll(query);
      return {
        success: true,
        message: 'Success fetching pagination',
        data: { pagination },
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  @Get(':id')
  @Roles('admin')
  async findUser(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return {
        success: true,
        message: 'Success fetching user',
        data: { user },
      };
    } catch (e) {
      return {
        success: false,
        message: e instanceof Error ? e.message : 'An unknown error occurred',
      };
    }
  }

  @Patch(':id')
  @Roles('admin')
  async updateUser(@Body() updateUser: UpdateUserDto, @Param('id') id: string) {
    try {
      const updatedUser = await this.userService.update(id, updateUser);
      return {
        success: true,
        message: 'Success update user',
        data: { updatedUser },
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  @Delete(':id')
  @Roles('admin')
  async deleteUser(@Body() updateUser: UpdateUserDto, @Param('id') id: string) {
    try {
      const deletedUser = await this.userService.remove(id);
      return {
        success: true,
        message: 'Success deleted user',
        data: { deletedUser },
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
