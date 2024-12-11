import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
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
    findOne(id: string): string;
    update(id: string, updatePublicationDto: UpdatePublicationDto): string;
    remove(id: string): string;
}
