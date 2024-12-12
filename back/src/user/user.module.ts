import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; 
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [AuthModule,EmailModule], 
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
