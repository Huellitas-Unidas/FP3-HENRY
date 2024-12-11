import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PublicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPublicationDto: CreatePublicationDto): Promise<{
        id: number;
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string | null;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePublicationDto: UpdatePublicationDto): string;
    remove(id: number): string;
}
