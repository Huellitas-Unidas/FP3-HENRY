import { IsOptional, isString, IsString, IsUUID } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  genero: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsUUID('4', { message: 'El userId debe ser un UUID válido de versión 4' })
  userId: string;
}

export enum status {
  FOUND = 'encontrado',
  LOST = 'perdido',
  NONE = 'ninguno',
}
