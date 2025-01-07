import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNumber()
  amount: number;
  quantity: number;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  currency: string;

  successUrl: string;

  cancelUrl: string;
}
