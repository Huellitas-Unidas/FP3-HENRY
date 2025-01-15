import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

enum Role {
  user = 'user',
  admin = 'admin',
}

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  googleId?: string; // Google ID se usará si el registro es con Google

  @IsOptional()
  @IsEnum(Role)
  @Transform(({ value }) => value?.toLowerCase())
  role?: Role;
}
