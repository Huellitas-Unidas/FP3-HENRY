import { Controller, Get, Put, Delete, Param, Body, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';  
import { PostsService } from '../posts/posts.service'; 
import { UpdateUserDto } from '../user/dto/update-user.dto'; 
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles('admin')  
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly postsService: PostsService,
  ) {}  

  @Get('users')
  @Roles('admin') 
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
  @Get('donations')
  @Roles('admin')
  async getAllDonations() {
    return this.adminService.getAllDonations();
  }

  @Put('user/:id')
  @Roles('admin') 
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.adminService.updateUser(id, updateUserDto); 
  }

  @Delete('user/:id')
  @Roles('admin') 
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.deleteUser(id);  
  }

  @Delete('post/:id')
  @Roles('admin')
  async deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
