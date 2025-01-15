import { IsEmail, IsNumber, IsString, MinLength, IsOptional, IsEnum, IsUUID } from 'class-validator';
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

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;


  @IsOptional()
  @IsEnum(Role)
  @Transform(({ value }) => value?.toLowerCase())
  role?: Role;

}
