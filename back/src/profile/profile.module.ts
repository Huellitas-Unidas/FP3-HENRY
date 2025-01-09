import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [FilesUploadModule],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
