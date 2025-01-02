import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { CreateLocationDto } from 'src/map/dto/create-location.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  location?: CreateLocationDto;
}
