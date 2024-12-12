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
let PostsService = class PostsService {
    constructor(prisma, filesUploadService) {
        this.prisma = prisma;
        this.filesUploadService = filesUploadService;
    }
    async create(createPostDto, file) {
        const { title, description, petType, dateLost, location, contactInfo, photoUrl, userId, } = createPostDto;
        if (!(0, class_validator_1.isUUID)(userId)) {
            throw new common_1.HttpException('userId debe ser un UUID válido', 400);
        }
        const userFound = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!userFound) {
            throw new common_1.HttpException('No existe el usuario', 404);
        }
        const post = await this.prisma.post.create({
            data: {
                title,
                description,
                petType,
                dateLost,
                location,
                contactInfo,
                photoUrl,
                userId,
            },
        });
        return post;
    }
    async findAll() {
        const posts = await this.prisma.post.findMany();
        return posts;
    }
    findOne(id) {
        return `This action returns a #${id} post`;
    }
    update(id, updatePostDto) {
        return `This action updates a #${id} post`;
    }
    remove(id) {
        return `This action removes a #${id} post`;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        files_upload_service_1.FilesUploadService])
], PostsService);
//# sourceMappingURL=posts.service.js.map