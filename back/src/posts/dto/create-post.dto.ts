import { IsString, IsDate, IsOptional, IsInt, isUUID, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  petType: string;

  @IsDate()
  dateLost: Date;

  @IsString()
  location: string;

  @IsString()
  contactInfo: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

}
