import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [AuthModule], 
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
