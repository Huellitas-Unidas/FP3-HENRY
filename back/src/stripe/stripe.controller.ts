import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create')
  async createCheckoutSession(
    @Body()
    body: {
      amount: number;
      currency: string;
      
    },
  ) {
    try {
      const { amount, currency, } = body;
      const session = await this.stripeService.createCheckoutSession(
        amount,
        currency,
       
      );
      return { checkoutUrl: session.url };
    } catch (error) {
      throw new HttpException('Error al crear la session', 400);
    }
  }
  @Get('success')
  success() {
    return {
      message: 'Pago realizado exitosamente. Gracias por tu donación.',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      message: 'El pago fue cancelado. Vuelve a intentarlo.',
    };
  }
}
