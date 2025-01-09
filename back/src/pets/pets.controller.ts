import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.petsService.create(createPetDto, file);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'user') 
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'user') 
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
