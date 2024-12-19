import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  address?: string;

}