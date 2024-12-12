import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { isUUID } from 'class-validator';
import { FilesUploadService } from '../files-upload/files-upload.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesUploadService: FilesUploadService,
  ) {}

  async create(createPostDto: CreatePostDto, file: Express.Multer.File) {
    const {
      title,
      description,
      petType,
      dateLost,
      location,
      contactInfo,
      userId,
    } = createPostDto;

    if (!isUUID(userId)) throw new HttpException('el uuid no es valido', 404);

    const userFound = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userFound) throw new HttpException('El usuario no existe', 404);

    // Subimos la imagen a Cloudinary
    let photoUrl = '';
    if (file) {
      try {
        const uploadResult =
          await this.filesUploadService.uploadPostImage(file);
        photoUrl = uploadResult.secure_url;
      } catch (error) {
        throw new HttpException('Error al subir la imagen: ', 500);
      }
    }
    const post = await this.prisma.post.create({
      data: {
        title,
        description,
        petType,
        dateLost,
        location,
        contactInfo,
        photoUrl,
        userId,
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
    });

    if (!post) {
      throw new HttpException(`Post con ID ${id} no encontrado`, 404);
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
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
