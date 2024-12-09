import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'La contraseña debe tener al menos 5 caracteres' })
  password: string;
}
