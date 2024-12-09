import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: any): string;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}