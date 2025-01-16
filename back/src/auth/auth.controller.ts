import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {
    // Esta ruta redirige al flujo de OAuth en Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req): Promise<any> {
    // Aquí Google redirige después del login exitoso
    return req.user; // Devuelve el usuario autenticado
  }
}
