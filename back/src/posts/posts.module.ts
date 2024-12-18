import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [FilesUploadModule, EmailModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
