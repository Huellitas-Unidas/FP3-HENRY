import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MapModule } from './map/map.module';
import { AdministrationModule } from './administration/administration.module';
import { DonationModule } from './donation/donation.module';
import { PostsModule } from './posts/posts.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { PetsModule } from './pets/pets.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { PqrModule } from './pqr/pqr.module';


@Module({
  imports: [
      UserModule,
      PostsModule,
      PetsModule,
      ChatbotModule,
      ConfigModule.forRoot({
        isGlobal:true,
      }),
      StripeModule.forRoot(process.env.STRIPE_API_KEY),
    NotificationsModule,
    MapModule,
    AdministrationModule,
    DonationModule,
    StripeModule,
    PostsModule,
    ChatbotModule,
    PetsModule,
    PqrModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
