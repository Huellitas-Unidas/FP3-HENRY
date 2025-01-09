import { IsEmail, IsNumber, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';  // Importar el transformador

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
  phone: number;

  @IsOptional()
  @IsEnum(Role)
  @Transform(({ value }) => value?.toLowerCase())
  role?: Role;
}
