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
exports.AdministrationController = void 0;
const common_1 = require("@nestjs/common");
const administration_service_1 = require("./administration.service");
let AdministrationController = class AdministrationController {
    constructor(administrationService) {
        this.administrationService = administrationService;
    }
};
exports.AdministrationController = AdministrationController;
exports.AdministrationController = AdministrationController = __decorate([
    (0, common_1.Controller)('administration'),
    __metadata("design:paramtypes", [administration_service_1.AdministrationService])
], AdministrationController);
//# sourceMappingURL=administration.controller.js.map