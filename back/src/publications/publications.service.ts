import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPublicationDto: CreatePublicationDto) {
    const {
      title,
      description,
      petType,
      dateLost,
      location,
      contactInfo,
      photoUrl,
    } = createPublicationDto;

    const publication = await this.prisma.publication.create({
      data: {
        title,
        description,
        petType,
        dateLost,
        location,
        contactInfo,
        photoUrl,
      },
    });

    return publication;
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
