import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsDate, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from 'src/map/dto/create-location.dto';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  petType: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  contactInfo: string;

  @IsNotEmpty()
  @IsDate()
  dateLost: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location?: CreateLocationDto;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
