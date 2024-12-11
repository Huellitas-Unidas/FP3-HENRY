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
exports.FilesUploadController = void 0;
const common_1 = require("@nestjs/common");
const files_upload_service_1 = require("./files-upload.service");
const platform_express_1 = require("@nestjs/platform-express");
let FilesUploadController = class FilesUploadController {
    constructor(filesUploadService) {
        this.filesUploadService = filesUploadService;
    }
    async uploadImage(file) {
        const result = await this.filesUploadService.uploadPostImage(file);
        return {
            message: 'File uploaded successfully',
            url: result.secure_url,
        };
    }
};
exports.FilesUploadController = FilesUploadController;
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 2000000 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesUploadController.prototype, "uploadImage", null);
exports.FilesUploadController = FilesUploadController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_upload_service_1.FilesUploadService])
], FilesUploadController);
//# sourceMappingURL=files-upload.controller.js.map