import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard {
    private jwtService;
    private reflector;
    constructor(jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
