"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("./roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get(roles_decorator_1.ROLES_KEY, context.getHandler());
        console.log('Roles requeridos para esta ruta:', requiredRoles);
        if (!requiredRoles) {
            console.log('No se requieren roles específicos. Acceso permitido.');
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            console.error('Error: Encabezado Authorization no encontrado');
            throw new common_1.UnauthorizedException('No se proporcionó un token');
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
                console.error(`Error: El usuario no tiene el rol necesario. Rol requerido: ${requiredRoles}, Rol del usuario: ${userRole}`);
                throw new common_1.ForbiddenException('No tienes el rol requerido');
            }
            console.log('Acceso permitido: El usuario tiene los permisos necesarios.');
            return true;
        }
        catch (error) {
            console.error('Error al verificar el token:', error.message);
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map