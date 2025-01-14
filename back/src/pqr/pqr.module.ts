import { Module } from '@nestjs/common';
import { PqrService } from './pqr.service';
import { PqrController } from './pqr.controller';
import { PrismaService } from 'prisma/prisma.service';
import { EmailModule } from 'src/email/email.module';
import { RolesGuard } from 'src/common/roles.guard';
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  imports: [EmailModule, AuthModule],
  controllers: [PqrController],
  providers: [PqrService, PrismaService, RolesGuard],
})
export class PqrModule {}
