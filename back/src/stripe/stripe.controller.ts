import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/create.checkoutSession.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    const { amount, currency, successUrl, cancelUrl } =
      createCheckoutSessionDto;
    try {
      const session = await this.stripeService.createCheckoutSession(
        amount,
        currency,
        successUrl,
        cancelUrl,
      );
      return {
        message: 'Checkout session created successfully',
        sessionId: session.id,
        url: session.url,
      };
    } catch (error) {
      return {
        message: 'Failed to create checkout session',
        error: error,
      };
    }
  }
}
