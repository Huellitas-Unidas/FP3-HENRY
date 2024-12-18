import { Transform } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsUUID } from 'class-validator';

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
  @IsDate({ message: 'dateLost must be a valid date' })
  dateLost: Date;

  @IsString()
  location: string;

  

  @IsString()
  @IsOptional()
  photoUrl?: string;
  
//   @IsString()
//   status: string

  @IsUUID('4', { message: 'El userId debe ser un UUID válido de versión 4' })
  userId: string;
}
