import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    console.log('Roles requeridos para esta ruta:', requiredRoles);

    if (!requiredRoles) {
      console.log('No se requieren roles específicos. Acceso permitido.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    

    if (!authHeader) {
      console.error('Error: Encabezado Authorization no encontrado');
      throw new UnauthorizedException('No se proporcionó un token');
    }

    const token = authHeader.split(' ')[1];

    console.log('Token recibido:', token);

    try {
      const user = this.jwtService.verify(token);
      console.log('Usuario decodificado:', user);

      request.user = user;

      const userRole = user.role?.toLowerCase();
      console.log('Rol del usuario:', userRole);

      if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        console.error(
          `Error: El usuario no tiene el rol necesario. Rol requerido: ${requiredRoles}, Rol del usuario: ${userRole}`,
        );
        throw new ForbiddenException('No tienes el rol requerido');
      }

      console.log(
        'Acceso permitido: El usuario tiene los permisos necesarios.',
      );
      return true;
    } catch (error) {
      console.error('Error al verificar el token:', (error as Error).message);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
