import { DynamicModule, Global, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import Stripe from 'stripe';
@Global()
@Module({
  providers: [StripeService],
  controllers: [StripeController]
})
export class StripeModule {
    static forRoot(apiKey: string): DynamicModule {
        const stripe = new Stripe(apiKey, {
            apiVersion: '2024-11-20.acacia',
        })
        return {
            module: StripeModule,
            providers: [
                {
                    provide: 'STRIPE_CLIENT',
                    useValue: stripe,
                }
            ],
            exports: ['STRIPE_CLIENT']
        }
    }
}
