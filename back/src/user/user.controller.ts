import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('user')
@UseInterceptors(FileInterceptor('file'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto.email, loginDto.password);
  }

  @Get()
  @Roles('admin') 
  @UseGuards(RolesGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'user') 
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

 
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin') 
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    console.log('Encabezado Authorization:', req.headers.authorization);
    return await this.userService.remove(id);
  }
  

  @Get(':id/pets')
  async userPets(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.userPets(id);
  }

  @Get(':id/posts')
  async userPosts(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.userPosts(id);
  }
}
