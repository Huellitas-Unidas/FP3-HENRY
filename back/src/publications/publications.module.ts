import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PrismaService],
})
export class PublicationsModule {}
