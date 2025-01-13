"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesUploadModule = void 0;
const common_1 = require("@nestjs/common");
const files_upload_service_1 = require("./files-upload.service");
const files_upload_controller_1 = require("./files-upload.controller");
const cloudinary_1 = require("../config/cloudinary");
let FilesUploadModule = class FilesUploadModule {
};
exports.FilesUploadModule = FilesUploadModule;
exports.FilesUploadModule = FilesUploadModule = __decorate([
    (0, common_1.Module)({
        controllers: [files_upload_controller_1.FilesUploadController],
        providers: [files_upload_service_1.FilesUploadService, cloudinary_1.CloudinaryConfig],
        exports: [files_upload_service_1.FilesUploadService],
    })
], FilesUploadModule);
//# sourceMappingURL=files-upload.module.js.map