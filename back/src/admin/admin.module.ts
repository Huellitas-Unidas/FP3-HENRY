import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; 
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [AuthModule,PostsModule],  
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule {}
