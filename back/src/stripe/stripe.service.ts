import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    constructor(@Inject('STRIPE_CLIENT')private readonly stripeClient : Stripe){}
    async createCheckoutSession (amount: number, currency: string, successUrl:string, cancelUrl:string){
        return await this.stripeClient.checkout.sessions.create({
            payment_method_types: ['card', 'amazon_pay', 'acss_debit'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Donacion Huellas Unidas',
                            description: 'los animales necesitan de ti',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl
        })
    }
}
