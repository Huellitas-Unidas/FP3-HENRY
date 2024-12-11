"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesUploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("../config/cloudinary");
let FilesUploadService = class FilesUploadService {
    constructor() {
        this.folder = 'HuellitasUnidas';
    }
    async uploadPostImage(file) {
        try {
            return new Promise((resolve, reject) => {
                const upload = cloudinary_1.cloudinary.uploader.upload_stream({
                    folder: this.folder,
                    resource_type: 'image',
                }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                upload.end(file.buffer);
            });
        }
        catch (error) {
            throw new Error(`Failed to upload image: ${error}`);
        }
    }
};
exports.FilesUploadService = FilesUploadService;
exports.FilesUploadService = FilesUploadService = __decorate([
    (0, common_1.Injectable)()
], FilesUploadService);
//# sourceMappingURL=files-upload.service.js.map