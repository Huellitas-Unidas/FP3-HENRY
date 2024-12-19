import { Transform } from 'class-transformer';
import { IsString, IsDate, IsObject, ValidateNested, IsUUID, IsOptional } from 'class-validator';
import { CreateLocationDto } from 'src/map/dto/create-location.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  petType: string;

  @IsString()
  contactInfo: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'dateLost debe ser una fecha valida' })
  dateLost: Date;

  @ValidateNested()
  @Type(() => CreateLocationDto) 
  location: CreateLocationDto;
  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;
  
  @IsString()
  status: string;

//   @IsString()
//   status: string


  @IsUUID('4', { message: 'El userId debe ser un UUID válido de versión 4' })
  userId: string;
}

export enum status {
  FOUND = 'encontrado',
  LOST = 'perdido',
  NONE = 'ninguno',
}
