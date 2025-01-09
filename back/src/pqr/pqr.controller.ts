import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PqrService } from './pqr.service';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('pqr')
export class PqrController {
  constructor(private readonly pqrService: PqrService) {}

  @Post()
  create(@Body() createPqrDto: CreatePqrDto) {
    return this.pqrService.create(createPqrDto);
  }

  @Get()
  findAll() {
    return this.pqrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pqrService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin') 
  update(@Param('id') id: string, @Body() updatePqrDto: UpdatePqrDto) {
    return this.pqrService.update(+id, updatePqrDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin') 
  remove(@Param('id') id: string) {
    return this.pqrService.remove(id);
  }
}
