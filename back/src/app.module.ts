import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PublicationsModule } from './publications/publications.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MapModule } from './map/map.module';
import { AdministrationModule } from './administration/administration.module';
import { DonationModule } from './donation/donation.module';
import { FilesUploadModule } from './files-upload/files-upload.module';

@Module({
  imports: [UserModule, PublicationsModule, NotificationsModule, MapModule, AdministrationModule, DonationModule, FilesUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
