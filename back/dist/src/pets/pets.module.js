"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsModule = void 0;
const common_1 = require("@nestjs/common");
const pets_service_1 = require("./pets.service");
const pets_controller_1 = require("./pets.controller");
const prisma_service_1 = require("../../prisma/prisma.service");
const files_upload_module_1 = require("../files-upload/files-upload.module");
const email_module_1 = require("../email/email.module");
const auth_module_1 = require("../auth/auth.module");
let PetsModule = class PetsModule {
};
exports.PetsModule = PetsModule;
exports.PetsModule = PetsModule = __decorate([
    (0, common_1.Module)({
        imports: [files_upload_module_1.FilesUploadModule, email_module_1.EmailModule, auth_module_1.AuthModule],
        controllers: [pets_controller_1.PetsController],
        providers: [pets_service_1.PetsService, prisma_service_1.PrismaService],
    })
], PetsModule);
//# sourceMappingURL=pets.module.js.map