import {Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [StripeService],
  controllers: [StripeController],
  exports: [StripeService]
})
export class StripeModule {}
