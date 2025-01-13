import { CreatePostDto } from './create-post.dto';
import { CreateLocationDto } from 'src/map/dto/create-location.dto';
declare const UpdatePostDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    location?: CreateLocationDto;
}
export {};
