import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE') private readonly stripe: Stripe) {}

  async createCheckoutSession(amount: number, currency: string, email: string) {

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
        customer_email: email,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });

      return session;
    } catch (error) {
      throw new Error(`Stripe error`);
    }
  }
  verifyWebhoock(payload: Buffer, signature: string) {
    
    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event: Stripe.Event;
    
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        endPointSecret,
      );
    } catch (error) {
        throw new Error('Error to verify  webhook');
    }
    console.log('ESTO ES EVENT', event);

    return event;
  }
  async processEvent(event: Stripe.Event) {
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(` PaymentIntent for ${paymentIntent.amount} was successful` );
            
            break;
        case 'payment_intent.payment_failed':
            console.error('PaymentIntent was not successful');
            break;
        default: 
            console.log(`Unhandled event type ${event.type}`);
    }
  }
}
