import { CreateLocationDto } from 'src/map/dto/create-location.dto';
export declare class CreatePostDto {
    title: string;
    description: string;
    petType: string;
    status?: string;
    contactInfo: string;
    dateLost: Date;
    location?: CreateLocationDto;
    userId: string;
}
