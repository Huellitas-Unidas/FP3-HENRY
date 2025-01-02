import { PartialType } from '@nestjs/mapped-types';
import { CreatePqrDto } from './create-pqr.dto';

export class UpdatePqrDto extends PartialType(CreatePqrDto) {}
