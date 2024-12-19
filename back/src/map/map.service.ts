import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}

  async createLocation(createLocationDto: CreateLocationDto) {
    const { latitude, longitude, address, postId } = createLocationDto;

    const location = await this.prisma.location.create({
      data: {
        latitude,
        longitude,
        address,
        post: postId ? { connect: { id: postId } } : undefined,
      },
    });

    return location;
  }

  async getLocation(postId: string) {
    const location = await this.prisma.location.findFirst({
      where: { postId: postId },
    });

    if (!location) {
      throw new NotFoundException('Ubicación no encontrada para este post');
    }

    return location;
  }
}
