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
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PublicationsService = class PublicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPublicationDto) {
        const { title, description, petType, dateLost, location, contactInfo, photoUrl, } = createPublicationDto;
        const publication = await this.prisma.publication.create({
            data: {
                title,
                description,
                petType,
                dateLost,
                location,
                contactInfo,
                photoUrl,
            },
        });
        return publication;
    }
    findAll() {
        return `This action returns all publications`;
    }
    findOne(id) {
        return `This action returns a #${id} publication`;
    }
    update(id, updatePublicationDto) {
        return `This action updates a #${id} publication`;
    }
    remove(id) {
        return `This action removes a #${id} publication`;
    }
};
exports.PublicationsService = PublicationsService;
exports.PublicationsService = PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicationsService);
//# sourceMappingURL=publications.service.js.map