import { isString, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  raza: string;

  @IsString()
  description: string;

  @IsString()
  status: string;
  @IsString()
  imgUrl: string;
  @IsUUID('4', { message: 'El userId debe ser un UUID válido de versión 4' })
  userId: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export enum status {
  FOUND = 'encontrado',
  LOST = 'perdido',
  NONE = 'ninguno',
}
