import {
  Controller,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch(':userId/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async createProfilePhoto(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Received request:', userId, file);
    return this.profileService.uploadOrUpdatePicture(userId, file);
  }

  @Delete(':userId/profile-picture')
  async deleteProfilePicture(@Param('userId') userId: string) {
    return await this.profileService.deleteProfilePicture(userId);
  }
}
