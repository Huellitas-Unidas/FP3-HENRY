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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const map_service_1 = require("./map.service");
let MapController = class MapController {
    constructor(mapService) {
        this.mapService = mapService;
    }
    async getLocation(postId) {
        return await this.mapService.getLocation(postId);
    }
    async getAllLocations() {
        return await this.mapService.getAllLocations();
    }
};
exports.MapController = MapController;
__decorate([
    (0, common_1.Get)('location/:postId'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getLocation", null);
__decorate([
    (0, common_1.Get)('locations'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MapController.prototype, "getAllLocations", null);
exports.MapController = MapController = __decorate([
    (0, common_1.Controller)('map'),
    __metadata("design:paramtypes", [map_service_1.MapService])
], MapController);
//# sourceMappingURL=map.controller.js.map