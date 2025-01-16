import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from '../user/user.service';
import { EmailModule } from 'src/email/email.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'google'}),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({  
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    EmailModule,
  ],
  providers: [AuthService, PrismaService, UserService, GoogleStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
