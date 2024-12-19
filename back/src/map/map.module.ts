import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  controllers: [MapController],
  providers: [MapService, PrismaService],
})
export class MapModule {}
