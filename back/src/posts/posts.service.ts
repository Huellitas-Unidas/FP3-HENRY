import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    const {
      title,
      description,
      petType,
      dateLost,
      location,
      contactInfo,
      photoUrl,
      userId,
    } = createPostDto;

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
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      throw new Error(`Post con ID ${id} no encontrado`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new Error(`Post con ID ${id} no encontrado`);
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

  async remove(id: number) {
    const post = await this.prisma.post.delete({
      where: { id },
    });
    return { message: `Post con ID ${id} eliminado correctamente` };
  }
}
