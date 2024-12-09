import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [JwtModule.register({ secret: 'your-secret-key', signOptions: { expiresIn: '1h' } })],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
