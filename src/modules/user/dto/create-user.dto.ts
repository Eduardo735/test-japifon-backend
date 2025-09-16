import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  @Expose()
  id: string;

  @IsOptional()
  @IsString()
  @Expose()
  first_name?: string;

  @IsOptional()
  @IsString()
  @Expose()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  @Expose()
  email?: string;

  @IsOptional()
  @IsString()
  @Expose()
  job_position?: string;

  @IsBoolean()
  @Expose()
  is_active: boolean;
}
