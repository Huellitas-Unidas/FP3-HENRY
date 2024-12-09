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
exports.PublicationsController = void 0;
const common_1 = require("@nestjs/common");
const publications_service_1 = require("./publications.service");
const create_publication_dto_1 = require("./dto/create-publication.dto");
const update_publication_dto_1 = require("./dto/update-publication.dto");
let PublicationsController = class PublicationsController {
    constructor(publicationsService) {
        this.publicationsService = publicationsService;
    }
    create(createPublicationDto) {
        return this.publicationsService.create(createPublicationDto);
    }
    findAll() {
        return this.publicationsService.findAll();
    }
    findOne(id) {
        return this.publicationsService.findOne(+id);
    }
    update(id, updatePublicationDto) {
        return this.publicationsService.update(+id, updatePublicationDto);
    }
    remove(id) {
        return this.publicationsService.remove(+id);
    }
};
exports.PublicationsController = PublicationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publication_dto_1.CreatePublicationDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_publication_dto_1.UpdatePublicationDto]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicationsController.prototype, "remove", null);
exports.PublicationsController = PublicationsController = __decorate([
    (0, common_1.Controller)('publications'),
    __metadata("design:paramtypes", [publications_service_1.PublicationsService])
], PublicationsController);
//# sourceMappingURL=publications.controller.js.map