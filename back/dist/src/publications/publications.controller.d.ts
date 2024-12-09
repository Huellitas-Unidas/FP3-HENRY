import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
    create(createPublicationDto: CreatePublicationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePublicationDto: UpdatePublicationDto): string;
    remove(id: string): string;
}
