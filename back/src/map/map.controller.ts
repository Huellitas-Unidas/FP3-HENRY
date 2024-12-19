import { Controller, Get, Param } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('location/:postId')
  async getLocation(@Param('postId') postId: string) {
    return await this.mapService.getLocation(postId);
  }
}
