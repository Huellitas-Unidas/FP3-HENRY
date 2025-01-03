import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Headers,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/create.checkoutSession.dto';
import { log } from 'console';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create')
  @UsePipes()
  async createCheckoutSession(
    @Body()
    body: CreateCheckoutSessionDto,
  ) {
    try {
      const { amount, currency, email } = body;
      const session = await this.stripeService.createCheckoutSession(
        amount,
        currency,
        email,
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

  @Post('webhook')
  async handleWebhoook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
  ) {
    const payload = Buffer.from(req.body as any);

    try {
      const event = await this.stripeService.verifyWebhoock(payload, signature);
      await this.stripeService.processEvent(event);
      return { received: true };
    } catch (err) {
      throw new HttpException(`Error ${err}`, HttpStatus.BAD_REQUEST);
    }
  }
}
