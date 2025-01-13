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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const files_upload_service_1 = require("../files-upload/files-upload.service");
let ProfileService = class ProfileService {
    constructor(prisma, filesUploadService) {
        this.prisma = prisma;
        this.filesUploadService = filesUploadService;
    }
    async uploadOrUpdatePicture(userId, file) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const uploadResult = await this.filesUploadService.uploadPostImage(file);
        if (user.profilePicture) {
            const publicId = this.extractPublicIdFromUrl(user.profilePicture);
            await this.filesUploadService.deleteImage(publicId);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { profilePicture: uploadResult.secure_url },
        });
        return updatedUser;
    }
    async deleteProfilePicture(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (!user.profilePicture) {
            throw new common_1.BadRequestException('El usuario no tiene una foto de perfil para eliminar');
        }
        const publicId = this.extractPublicIdFromUrl(user.profilePicture);
        await this.filesUploadService.deleteImage(publicId);
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { profilePicture: null },
        });
        return updatedUser;
    }
    extractPublicIdFromUrl(url) {
        const parts = url.split('/');
        const folderAndPublicId = parts.slice(parts.length - 2).join('/');
        return folderAndPublicId.split('.')[0];
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        files_upload_service_1.FilesUploadService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map