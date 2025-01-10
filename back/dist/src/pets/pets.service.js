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
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const files_upload_service_1 = require("../files-upload/files-upload.service");
const class_validator_1 = require("class-validator");
const email_service_1 = require("../email/email.service");
let PetsService = class PetsService {
    constructor(prisma, filesUploadService, emailService) {
        this.prisma = prisma;
        this.filesUploadService = filesUploadService;
        this.emailService = emailService;
    }
    async create(createPetDto, file) {
        const { name, type, genero, status, description, userId } = createPetDto;
        const userFound = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userFound)
            throw new common_1.NotFoundException('El usuario no existe');
        let imgUrl = '';
        if (file) {
            const uploadResult = await this.filesUploadService.uploadPostImage(file);
            imgUrl = uploadResult.secure_url;
        }
        const findPet = await this.prisma.pets.findFirst({
            where: { name: name.toLowerCase() },
        });
        if (findPet)
            throw new common_1.HttpException('La mascota ya existe', 409);
        const createPet = await this.prisma.pets.create({
            data: { ...createPetDto, imgUrl, userId: userFound.id },
        });
        const emailData = {
            name,
            type,
            genero,
            description,
            status,
            imgUrl,
        };
        await this.emailService.sendMailWithTemplate(userFound.email, 'Registro de mascota exitoso', emailData, 'petCreation');
        return createPet;
    }
    findAll() {
        return `This action returns all pets`;
    }
    findOne(id) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.HttpException('No se encontró la mascota', 404);
        const findPet = this.prisma.pets.findUnique({
            where: {
                id,
            },
        });
        if (!findPet)
            throw new common_1.NotFoundException('no se encontró a la mascota');
        return findPet;
    }
    update(id, updatePetDto) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.HttpException('No se encontró la mascota', 404);
        this.prisma.pets.findUnique({
            where: {
                id,
            },
        });
        const updatePet = this.prisma.pets.update({
            where: {
                id,
            },
            data: {
                ...updatePetDto,
            },
        });
        return updatePet;
    }
    async remove(id) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.HttpException('No se encontró la mascota', 404);
        const pet = await this.prisma.pets.findUnique({
            where: {
                id,
            },
        });
        if (!pet)
            throw new common_1.HttpException('No se encontró la mascota', 404);
        await this.prisma.pets.delete({
            where: {
                id,
            },
        });
        const petName = pet.name;
        return `Tu mascota con nombre ${petName} se eliminó correctamente`;
    }
};
exports.PetsService = PetsService;
exports.PetsService = PetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        files_upload_service_1.FilesUploadService,
        email_service_1.EmailService])
], PetsService);
//# sourceMappingURL=pets.service.js.map