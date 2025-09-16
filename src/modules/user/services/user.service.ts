import { clerkClient, getAuth } from '@clerk/express';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  async findAll(query: PaginationQueryDto) {
    const { limit, offset } = query;
    const { data, totalCount } = await clerkClient.users.getUserList({
      limit: limit,
      offset: offset,
    });

    return { data, totalCount };
  }

  async findOne(id: string) {
    return await clerkClient.users.getUser(id);
  }

  async update(id: string, data: Partial<UpdateUserDto>) {
    const params = { firstName: data.first_name, lastName: data.last_name };
    return await clerkClient.users.updateUser(id, params);
  }

  async remove(id: string) {
    return await clerkClient.users.deleteUser(id);
  }

  getMe(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ) {
    const auth = getAuth(req);
    return auth;
  }
}
