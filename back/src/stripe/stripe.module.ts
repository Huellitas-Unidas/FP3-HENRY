import {Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { timeout } from 'rxjs';
@Module({
  imports: [ConfigModule],
  providers: [StripeService,
    {
    provide: "STRIPE",
    useValue: new (require('stripe'))(process.env.STRIPE_API_KEY, {apiVersion: '2024-12-18.acacia', timeout: 10000}),
    }
  ],
  controllers: [StripeController],
  exports: [StripeService ],
})
export class StripeModule {}
