import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    create(createPetDto: CreatePetDto, file: Express.Multer.File): Promise<{
        name: string;
        id: string;
        description: string;
        status: string;
        userId: string;
        type: string;
        genero: string;
        imgUrl: string;
    }>;
    findAll(): string;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PetsClient<{
        name: string;
        id: string;
        description: string;
        status: string;
        userId: string;
        type: string;
        genero: string;
        imgUrl: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePetDto: UpdatePetDto): import(".prisma/client").Prisma.Prisma__PetsClient<{
        name: string;
        id: string;
        description: string;
        status: string;
        userId: string;
        type: string;
        genero: string;
        imgUrl: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): Promise<string>;
}
