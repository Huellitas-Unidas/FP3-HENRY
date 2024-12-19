import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
      } 
    });

    await this.emailService.sendMail(
      userFound.email,
      'Mascota registrada exitosamente',
      `Hola ${userFound.name},\n\n¡Gracias por registrar a tu mascota! Aquí están los detalles de la publicación:\n\n` +
        `Título: ${title}\n` +
        `Descripción: ${description}\n` +
        `Tipo de mascota: ${petType}\n` +
        `Fecha de pérdida: ${dateLost}\n` +
        `Ubicación: ${location}\n` +
        `Información de contacto: ${contactInfo}\n\n` +
        `¡Gracias por ser parte de nuestra comunidad! Estamos aquí para ayudarte a encontrar a tu mascota.\n\n` +
        `Saludos,\nEl equipo de Huellas Unidas!`,
    );

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
