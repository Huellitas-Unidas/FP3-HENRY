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
exports.PqrService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
let PqrService = class PqrService {
    constructor(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    async create(createPqrDto) {
        const { fullname, email, type, description, userId } = createPqrDto;
        const userFound = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userFound)
            throw new common_1.HttpException('Usuario no encontrado', 404);
        const pqr = await this.prisma.pqr.create({
            data: { fullname, email, type, description, userId },
        });
        const emailData = {
            fullname,
            email,
            type,
            description,
        };
        await this.emailService.sendMailWithTemplate(userFound.email, 'Confirmación de PQR recibido', emailData, 'pqrCreation');
        return pqr;
    }
    async findAll() {
        return this.prisma.pqr.findMany({
            include: { user: true },
        });
    }
    async findOne(id) {
        const pqr = await this.prisma.pqr.findUnique({ where: { id } });
        if (!pqr)
            throw new common_1.HttpException(`PQR con ID ${id} no encontrado `, 404);
        return pqr;
    }
    async update(id, updatePqrDto) { }
    async remove(id) {
        const pqr = await this.prisma.pqr.findUnique({ where: { id } });
        if (!pqr)
            throw new common_1.HttpException(`PQR con ID ${id} no encontrado `, 404);
        await this.prisma.pqr.delete({ where: { id } });
        return { message: `PQR con ID ${id} eliminado correctamente` };
    }
};
exports.PqrService = PqrService;
exports.PqrService = PqrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], PqrService);
//# sourceMappingURL=pqr.service.js.map