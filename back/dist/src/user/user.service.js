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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
let UserService = class UserService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async create(createUserDto) {
        const { email, password, name } = createUserDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.HttpException('El correo electrónico ya está en uso', 409);
        }
        const hashedPassword = await this.authService.hashPassword(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return { user };
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const isPasswordValid = await this.authService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const payload = { email: user.email, sub: user.id };
        const token = this.authService.generateToken(payload);
        return {
            message: `Te has logueado exitosamente.`,
            token: token,
        };
    }
    async findAll() {
        const users = await this.prisma.user.findMany();
        return users.map(({ password, ...user }) => user);
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                posts: true,
                notifications: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`Usuario con ID ${id} no encontrado`, 404);
        }
        const { password, ...responseUser } = user;
        const responsePost = user.posts.map(({ userId, ...post }) => post);
        return {
            ...responseUser,
            posts: responsePost,
        };
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
        return updatedUser;
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.HttpException(`Usuario con ID ${id} no encontrado`, 404);
        }
        await this.prisma.user.delete({
            where: { id },
        });
        return { message: `Usuario con ID ${id} eliminado exitosamente` };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map