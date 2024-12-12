import { UploadApiResponse } from 'cloudinary';
export declare class FilesUploadService {
    private readonly folder;
    uploadPostImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
