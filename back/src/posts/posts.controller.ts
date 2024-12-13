import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
<<<<<<< HEAD
  UploadedFile,
  UseInterceptors,
  HttpException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
=======
  ParseUUIDPipe,
>>>>>>> e0d829b50eb847f8ef171eb1b833a84b7b60455b
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadService } from 'src/files-upload/files-upload.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly filesUploadService: FilesUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
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
    const post = await this.postsService.create(createPostDto, file);

    return {
      message: 'Publicación creada y archivo subido exitosamente',
      post,
    };
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
