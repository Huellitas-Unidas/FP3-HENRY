import { IsNumber, IsString, IsUrl, Min, IsPositive } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  amount: number;

  @IsString()
  currency: string;

  @IsUrl()
  successUrl: string;

  @IsUrl()
  cancelUrl: string;
}
