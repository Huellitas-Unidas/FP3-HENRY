import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create')
  async createCheckoutSession(
    @Body() body: { amount: number; currency: string; successUrl: string; cancelUrl: string },
  ) {
    try {
      const { amount, currency, successUrl, cancelUrl } = body;
      const session = await this.stripeService.createCheckoutSession(
        amount,
        currency,
        successUrl,
        cancelUrl,
      );
      return { checkoutUrl: session.url }; 
    } catch (error) {
      throw new HttpException('Error al crear la session', 400);
    }
  }
}
