import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'prisma/prisma.service';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { EmailService } from 'src/email/email.service';
export declare class PetsService {
    private readonly prisma;
    private readonly filesUploadService;
    private emailService;
    constructor(prisma: PrismaService, filesUploadService: FilesUploadService, emailService: EmailService);
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
