import { Module } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { AdministrationController } from './administration.controller';

@Module({
  controllers: [AdministrationController],
  providers: [AdministrationService],
})
export class AdministrationModule {}
