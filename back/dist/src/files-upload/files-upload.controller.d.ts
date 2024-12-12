import { FilesUploadService } from './files-upload.service';
export declare class FilesUploadController {
    private readonly filesUploadService;
    constructor(filesUploadService: FilesUploadService);
    uploadImage(file: Express.Multer.File): Promise<{
        message: string;
        url: string;
    }>;
}
