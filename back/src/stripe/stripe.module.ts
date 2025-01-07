import {Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { DonationModule } from 'src/donation/donation.module';
@Module({
  imports: [ConfigModule, EmailModule, UserModule, DonationModule], 
  providers: [StripeService,
    {
    provide: "STRIPE",
    useValue: new (require('stripe'))(process.env.STRIPE_API_KEY, {apiVersion: '2024-12-18.acacia', timeout: 10000}),
    }, PrismaService
  ],
  controllers: [StripeController],
  exports: [StripeService ],

})
export class StripeModule {}
