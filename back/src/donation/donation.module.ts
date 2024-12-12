import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';

@Module({
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}
