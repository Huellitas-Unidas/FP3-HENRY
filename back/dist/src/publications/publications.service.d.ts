import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
export declare class PublicationsService {
    create(createPublicationDto: CreatePublicationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePublicationDto: UpdatePublicationDto): string;
    remove(id: number): string;
}
