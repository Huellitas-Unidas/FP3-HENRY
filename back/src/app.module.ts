import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MapModule } from './map/map.module';
import { AdministrationModule } from './administration/administration.module';
import { DonationModule } from './donation/donation.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule,  NotificationsModule, MapModule, AdministrationModule, DonationModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
