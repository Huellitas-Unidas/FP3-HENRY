import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNumber()
  amount: number;
    @IsNumber()
  quantity: number

  @IsString()
  currency: string;

  @IsUrl()
  successUrl: string;

  @IsUrl()
  cancelUrl: string;
}
