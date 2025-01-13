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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const class_validator_1 = require("class-validator");
const files_upload_service_1 = require("../files-upload/files-upload.service");
const email_service_1 = require("../email/email.service");
let PostsService = class PostsService {
    constructor(prisma, filesUploadService, emailService) {
        this.prisma = prisma;
        this.filesUploadService = filesUploadService;
        this.emailService = emailService;
    }
    async create(createPostDto, file) {
        const { title, description, petType, dateLost, location, contactInfo, userId, status = 'Perdido', } = createPostDto;
        if (!(0, class_validator_1.isUUID)(userId)) {
            throw new common_1.HttpException('El userId no es un UUID válido', 400);
        }
        const userFound = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userFound) {
            throw new common_1.HttpException('El usuario no existe', 404);
        }
        if (!file) {
            throw new common_1.HttpException('Se debe proporcionar una foto para el post', 400);
        }
        const uploadResult = await this.filesUploadService.uploadPostImage(file);
        const photoUrl = uploadResult.secure_url;
        let locationId = null;
        if (location) {
            const { latitude, longitude, address } = location;
            const newLocation = await this.prisma.location.create({
                data: {
                    latitude,
                    longitude,
                    address,
                },
            });
            locationId = newLocation.id;
        }
        const post = await this.prisma.post.create({
            data: {
                title,
                description,
                petType,
                dateLost,
                contactInfo,
                photoUrl,
                status,
                userId,
                location: locationId ? { connect: { id: locationId } } : undefined,
            },
        });
        const emailData = {
            userName: userFound.name,
            title: post.title,
        };
        await this.emailService.sendMailWithTemplate(userFound.email, '¡Tu Post Fue Creado!', emailData, 'postCreation');
        return post;
    }
    async findAll() {
        return await this.prisma.post.findMany({
            include: { location: true },
        });
    }
    async findOne(id) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.HttpException('El UUID no es válido', 404);
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: { location: true },
        });
        4;
        if (!post) {
            throw new common_1.HttpException(`Post con ID ${id} no encontrado`, 404);
        }
        return post;
    }
    async update(id, updatePostDto) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.HttpException('El UUID no es válido', 404);
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: { location: true },
        });
        if (!post) {
            throw new common_1.HttpException(`Post con ID ${id} no encontrado`, 404);
        }
        const data = { ...updatePostDto };
        if (updatePostDto.location) {
            const { latitude, longitude, address } = updatePostDto.location;
            const newLocation = await this.prisma.location.upsert({
                where: { id: post.location?.id ?? '' },
                update: {
                    latitude,
                    longitude,
                    address,
                },
                create: {
                    latitude,
                    longitude,
                    address,
                },
            });
            data.location = { connect: { id: newLocation.id } };
        }
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: data,
        });
        return {
            message: `Post con ID ${id} actualizado correctamente`,
            updatedPost,
        };
    }
    async remove(id) {
        if (!(0, class_validator_1.isUUID)(id))
            throw new common_1.HttpException('El UUID no es válido', 404);
        const post = await this.prisma.post.delete({
            where: { id },
        });
        return { message: `Post con ID ${id} eliminado correctamente` };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        files_upload_service_1.FilesUploadService,
        email_service_1.EmailService])
], PostsService);
//# sourceMappingURL=posts.service.js.map