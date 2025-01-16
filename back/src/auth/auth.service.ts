import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: any) {
    console.log('Generando token para el usuario:', user);

    if (!user || !(user.id || user.sub)) {
      console.error('El usuario no tiene un ID válido:', user);
      throw new Error('Usuario inválido para generar token');
    }

    const payload = {
      email: user.email,
      sub: user.id || user.sub,
      role: user.role,
    };

    console.log('Payload del token:', payload);
    return this.jwtService.sign(payload);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
