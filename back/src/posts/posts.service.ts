import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { isUUID } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: CreatePostDto) {
    const user = await this.prisma.user.findUnique({ where: { id: post.userId} });

    if (!user) throw new NotFoundException('el usuario no existe');

    const createPost = await this.prisma.post.create({
      data: {
        title: post.title,
        description: post.description,
        petType: post.petType,
        dateLost: post.dateLost,
        location: post.location,
        contactInfo: post.contactInfo,
        photoUrl: post.photoUrl,
        userId: user.id,
      },
    });

    return createPost;
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
