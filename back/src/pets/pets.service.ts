import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'prisma/prisma.service';
import { FilesUploadService } from 'src/files-upload/files-upload.service';

@Injectable()
export class PetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesUploadService: FilesUploadService,
  ) {}
  async create(createPetDto: CreatePetDto, file: Express.Multer.File) {
    const { userId } = createPetDto;

    const userFound = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userFound) throw new NotFoundException('El usuario no existe');

    let imgUrl = '';
    if (file) {
      const uploadResult = await this.filesUploadService.uploadPostImage(file);
      imgUrl = uploadResult.secure_url;
    }

    const createPet = await this.prisma.pets.create({
      data: { ...createPetDto, imgUrl, userId: userFound.id },
    });
    return createPet;
  }

  findAll() {
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
