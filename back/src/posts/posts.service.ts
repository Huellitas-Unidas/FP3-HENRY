import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { isUUID } from 'class-validator';

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

    const userFound = await this.prisma.user.findUnique({
        where: {
          id: userId
        },
      });
      if  (!userFound || !isUUID(userId)) throw new HttpException('No existe el usuario', 404);

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
    return post
 
  }
  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
