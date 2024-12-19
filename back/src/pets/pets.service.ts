import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'prisma/prisma.service';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { isUUID } from 'class-validator';

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

  findOne(id: string) {
    if (!isUUID(id)) throw new HttpException('No se encontró la mascota', 404);
    const findPet = this.prisma.pets.findUnique({
      where: {
        id,
      },
    });
    if (!findPet) throw new NotFoundException('no se encontró a la mascota');
    return findPet;
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    if (!isUUID(id)) throw new HttpException('No se encontró la mascota', 404);
    this.prisma.pets.findUnique({
      where: {
        id,
      },
    });

    const updatePet = this.prisma.pets.update({
      where: {
        id,
      },
      data: {
        ...updatePetDto,
      },
    });
    return updatePet;
  }

  async remove(id: string) {
    if (!isUUID(id)) throw new HttpException('No se encontró la mascota', 404);
    const pet = await this.prisma.pets.findUnique({
      where: {
        id,
      },
    });
    if (!pet) throw new HttpException('No se encontró la mascota', 404);
    await this.prisma.pets.delete({
      where: {
        id,
      },
    });
    const petName = pet.name;

    return `Tu mascota con nombre ${petName} se eliminó correctamente`;
  }
}
