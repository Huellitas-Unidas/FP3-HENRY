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
      photoUrl,
      userId,
    } = createPostDto;

    if (!isUUID(userId)) {
      throw new HttpException('userId debe ser un UUID válido', 400);
    }

    if(!isUUID(userId)) throw new HttpException("El UUID no es valido", 404)

    const userFound = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFound) {
      throw new HttpException('No existe el usuario', 404);
    }

        where: {
          id: userId
        },
      });
if(!userFound) throw new HttpException('El usuario no existe', 404)
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
