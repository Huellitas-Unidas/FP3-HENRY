import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Usa variables de entorno
      callbackURL:
        'https://huellasunidas.onrender.com/auth/google/callback', // Redirección
      scope: ['email', 'profile'], // Permisos solicitados
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('ESTO ES PROFILE', profile);

    const { id, name, emails, photos } = profile;
    const user = await this.prisma.user.upsert({
        where: {
          googleId: profile.id, // Busca un usuario con este 'googleId'
        },
        create: {
          googleId: profile.id, // Si no existe, lo crea con estos datos
          email: emails[0].value,
          name: name.givenName,
          profilePicture: photos[0].value,
          phone: "", // Si no tienes un teléfono, lo inicializa vacío
        },
        update: {
          email: emails[0].value, // Si existe, actualiza estos campos
          name: name.givenName,
          profilePicture: photos[0].value,
        },
      });

    done(null, user); // Usuario autenticado
  }
}
//   email: emails[0].value,
//   firstName: name.givenName,
//   lastName: name.familyName,
//   picture: photos[0].value,
//   accessToken,
