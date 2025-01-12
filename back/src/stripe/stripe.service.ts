import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE') private readonly stripe: Stripe,
    private readonly emailService: EmailService,
    private prisma: PrismaService,
  ) {}

  async createCheckoutSession(amount: number, currency: string, email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('User not found');
      }
  
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: 'Donación a Huellas Unidas',
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
      await this.emailService.sendMailWithTemplate(
        email,
        'Donación en proceso',
        { email, amount: amount / 100 },
        'donationCreation'
      );
  
      return session;
    } catch (error) {
      throw new Error('Stripe error');
    }
  }
  

  async verifyWebhoock(payload: Buffer, signature: string) {
    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        endPointSecret,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error to verify webhook');
    }

    await this.processEvent(event);
    return event;
  }

  async processEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
  
        const existingDonation = await this.prisma.donations.findFirst({
          where: { paymentIntent: session.payment_intent as string },
        });
  
        if (existingDonation) {
          console.log(
            `El pago con intent ${session.payment_intent} ya fue procesado.`,
          );
          return;
        }
  
        const user = await this.prisma.user.findUnique({
          where: { email: session.customer_email },
        });
        if (!user) {
          console.error('User not found');
          return;
        }
  
        await this.prisma.donations.create({
          data: {
            amount: session.amount_total / 100,
            email: session.customer_email,
            userId: user.id,
            paymentIntent: session.payment_intent as string,
          },
        });

        await this.emailService.sendMailWithTemplate(
          session.customer_email,
          'Pago de donación exitoso',
          { amount: session.amount_total / 100 },
          'donationSuccess'
        );
        break;
  
      case 'payment_intent.payment_failed':
        console.error('PaymentIntent was not successful');
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
  
  
  
}
