import { IsEmail, IsNumber, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

enum Role {
  user = 'user',
  admin = 'admin',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  phone: string;

  @IsOptional()
  @IsEnum(Role)
  @Transform(({ value }) => value?.toLowerCase())
  role?: Role;
}
