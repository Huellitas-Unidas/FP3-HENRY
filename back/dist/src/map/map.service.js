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
exports.MapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MapService = class MapService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLocation(postId) {
        const location = await this.prisma.location.findFirst({
            where: { postId: postId },
        });
        if (!location) {
            throw new common_1.NotFoundException('Ubicación no encontrada para este post');
        }
        return location;
    }
    async getAllLocations() {
        const locations = await this.prisma.location.findMany({
            include: { post: true },
        });
        if (locations.length === 0) {
            throw new common_1.NotFoundException('No se encontraron ubicaciones registradas');
        }
        return locations;
    }
};
exports.MapService = MapService;
exports.MapService = MapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MapService);
//# sourceMappingURL=map.service.js.map