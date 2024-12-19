import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}


  @Post('location')
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    return await this.mapService.createLocation(createLocationDto);
  }


  @Get('location/:postId')
  async getLocation(@Param('postId') postId: string) {
    return await this.mapService.getLocation(postId);
  }
}
