import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_API_KEY');
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY no está definida');
    }
    this.stripe = new Stripe(apiKey, { apiVersion: '2024-11-20.acacia' });
  }

  async createCheckoutSession(
    amount: number,
    currency: string,
    successUrl: string,
    cancelUrl: string,
  ) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: 'Sample Product',
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return session;
    } catch (error) {
      throw new Error(`Stripe error}`);
    }
  }
}
