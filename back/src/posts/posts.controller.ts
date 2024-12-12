import {
  Controller,
  Get,
  Post,
  Body,
<<<<<<< HEAD
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
=======
  Param,
  Delete,
  Put,
>>>>>>> 28bf8e46b172a66ad9f88ed4cc7b25f5e64ddbd2
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

<<<<<<< HEAD
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+id, updatePostDto);
=======
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
>>>>>>> 28bf8e46b172a66ad9f88ed4cc7b25f5e64ddbd2
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
