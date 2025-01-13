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
exports.PqrController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pqr_service_1 = require("./pqr.service");
const create_pqr_dto_1 = require("./dto/create-pqr.dto");
const update_pqr_dto_1 = require("./dto/update-pqr.dto");
const roles_decorator_1 = require("../common/roles.decorator");
const roles_guard_1 = require("../common/roles.guard");
let PqrController = class PqrController {
    constructor(pqrService) {
        this.pqrService = pqrService;
    }
    create(createPqrDto) {
        return this.pqrService.create(createPqrDto);
    }
    findAll() {
        return this.pqrService.findAll();
    }
    findOne(id) {
        return this.pqrService.findOne(id);
    }
    update(id, updatePqrDto) {
        return this.pqrService.update(+id, updatePqrDto);
    }
    remove(id) {
        return this.pqrService.remove(id);
    }
};
exports.PqrController = PqrController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pqr_dto_1.CreatePqrDto]),
    __metadata("design:returntype", void 0)
], PqrController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PqrController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PqrController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pqr_dto_1.UpdatePqrDto]),
    __metadata("design:returntype", void 0)
], PqrController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PqrController.prototype, "remove", null);
exports.PqrController = PqrController = __decorate([
    (0, common_1.Controller)('pqr'),
    __metadata("design:paramtypes", [pqr_service_1.PqrService])
], PqrController);
//# sourceMappingURL=pqr.controller.js.map