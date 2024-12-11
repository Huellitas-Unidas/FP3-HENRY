import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreatePublicationDto {
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
