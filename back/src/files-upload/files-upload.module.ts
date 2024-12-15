import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FilesUploadController } from './files-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  controllers: [FilesUploadController],
  providers: [FilesUploadService, CloudinaryConfig],
  exports: [FilesUploadService],
})
export class FilesUploadModule {}
