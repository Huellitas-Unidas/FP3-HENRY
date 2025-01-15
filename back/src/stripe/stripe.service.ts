import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StripeService {
  constructor(
    @Inject('STRIPE') private readonly stripe: Stripe,
    private readonly emailService: EmailService,
    private prisma: PrismaService,
  ) {}

  async createCheckoutSession(amount: number, currency: string, email: string) {
    try {
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
          { email, amount: `$ ${amount / 100}` },
          'donationCreation',
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
        console.log('esto ES SESSION', session);
        console.log('ESTO ES EMAIL', session.customer_email);
        

        const existingDonation = await this.prisma.donations.findFirst({
          where: { paymentIntent: session.payment_intent as string },
        });

        if (existingDonation) {
          console.log(
            `El pago con intent ${session.payment_intent} ya fue procesado.`,
          );
          return;
        }

        try {
            await this.emailService.sendMailWithTemplate(
                session.customer_email,
                'Pago de donación exitoso',
                { amount: session.amount_total / 100 },
                'donationSuccess',
              );
          const usuerCheckout = await this.prisma.donations.create({
            data: {
              amount: session.amount_total / 100,
              email: session.customer_email,
              id: uuidv4(),
              paymentIntent: session.payment_intent as string,
            },
          });
          console.log('esto es usuerCheckout', usuerCheckout);

        
        } catch (error) {
          console.error('Error al crear donacion', error);
        }
        break;
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;
        console.log('esto ES charge', charge);

        const existingChargeDonation = await this.prisma.donations.findFirst({
          where: { paymentIntent: charge.payment_intent as string },
        });

        if (existingChargeDonation) {
          console.log(
            `El pago con intent ${charge.payment_intent} ya fue procesado.`,
          );
          return;
        }

        try {
            await this.prisma.donations.create({
                data: {
                  amount: charge.amount / 100,
                  email: charge.billing_details.email,
                  id: uuidv4(),
                  paymentIntent: charge.payment_intent as string, // Corregí para usar `charge.payment_intent`
                },
              });
          await this.emailService.sendMailWithTemplate(
            charge.billing_details.email,
            'Pago de donación exitoso',
            { amount: charge.amount / 100 },
            'donationSuccess',
          );
        } catch (error) {
          console.error(
            'Error al registrar la donacion en charge-sussecced',
            error,
          );
        }
        break;
        case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('esto es paymentIntent', paymentIntent);

        const existingPaymentIntentDonation = await this.prisma.donations.findFirst({
          where: { paymentIntent: paymentIntent.id }, // Aquí usas el ID del PaymentIntent
        });

        if (existingPaymentIntentDonation) {
          console.log(`El pago con intent ${paymentIntent.id} ya fue procesado.`);
          return;
        }

        try {
          const donation = await this.prisma.donations.create({
            data: {
              amount: paymentIntent.amount_received / 100, // El monto del pago exitoso
              email: "pf3shhuellasunidas@gmail.com", // El correo del cliente, si está disponible
              id: uuidv4(),
              paymentIntent: paymentIntent.id, // Guardamos el PaymentIntent ID
            },
          });
          console.log('Donación registrada', donation);

          // Enviar correo de éxito de la donación
          await this.emailService.sendMailWithTemplate(
            'pf3shhuellasunidas@gmail.com', // Usamos el correo del PaymentIntent ARREGLAR
            'Pago de donación exitoso',
            { amount: paymentIntent.amount_received / 100 },
            'donationSuccess',
          );
        } catch (error) {
          console.error('Error al registrar donación en payment_intent.succeeded', error);
        }
        break;

      case 'payment_intent.payment_failed':
        console.error('PaymentIntent was not successful');
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
