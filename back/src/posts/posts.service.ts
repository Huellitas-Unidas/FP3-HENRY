import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { isUUID } from 'class-validator';
import { FilesUploadService } from '../files-upload/files-upload.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesUploadService: FilesUploadService,
    private emailService: EmailService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File | undefined,
  ) {
    const {
      title,
      description,
      petType,
      dateLost,
      location,
      contactInfo,
      userId,
      status = 'Perdido',
    } = createPostDto;

    if (!isUUID(userId)) {
      throw new HttpException('El userId no es un UUID válido', 400);
    }
  
    const userFound = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!userFound) {
      throw new HttpException('El usuario no existe', 404);
    }
  
    let photoUrl = '';
    if (file) {
      const uploadResult = await this.filesUploadService.uploadPostImage(file);
      photoUrl = uploadResult.secure_url;
    }
  
    let locationId: string | null = null;
    if (location) {
      const { latitude, longitude, address } = location;

      const newLocation = await this.prisma.location.create({
        data: {
          latitude,
          longitude,
          address,
        },
      });
  
      locationId = newLocation.id; 
    }
  
    const post = await this.prisma.post.create({
      data: {
        title,
        description,
        petType,
        dateLost,
        contactInfo,
        photoUrl,
        status,
        userId,
        location: locationId ? { connect: { id: locationId } } : undefined,
      },
    });
  
    return post;
  }
  

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) throw new HttpException('El UUID no es válido', 404);

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { location: true },
    });

    if (!post) {
      throw new HttpException(`Post con ID ${id} no encontrado`, 404);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (!isUUID(id)) throw new HttpException('El UUID no es válido', 404);

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { location: true },
    });

    if (!post) {
      throw new HttpException(`Post con ID ${id} no encontrado`, 404);
    }

    const data: any = { ...updatePostDto };

    if (updatePostDto.location) {
      const { latitude, longitude, address } = updatePostDto.location;
      const newLocation = await this.prisma.location.upsert({
        where: { id: post.location?.id ?? '' },
        update: {
          latitude,
          longitude,
          address,
        },
        create: {
          latitude,
          longitude,
          address,
        },
      });

      data.location = { connect: { id: newLocation.id } };
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: data,
    });

    return {
      message: `Post con ID ${id} actualizado correctamente`,
      updatedPost,
    };
  }

  async remove(id: string) {
    if (!isUUID(id)) throw new HttpException('El UUID no es válido', 404);

    const post = await this.prisma.post.delete({
      where: { id },
    });

    return { message: `Post con ID ${id} eliminado correctamente` };
  }
}
