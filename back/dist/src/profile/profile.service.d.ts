import { PrismaService } from 'prisma/prisma.service';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
export declare class ProfileService {
    private readonly prisma;
    private readonly filesUploadService;
    constructor(prisma: PrismaService, filesUploadService: FilesUploadService);
    uploadOrUpdatePicture(userId: string, file: Express.Multer.File): Promise<{
        email: string;
        password: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        profilePicture: string | null;
        createdAt: Date;
    }>;
    deleteProfilePicture(userId: string): Promise<{
        email: string;
        password: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        profilePicture: string | null;
        createdAt: Date;
    }>;
    private extractPublicIdFromUrl;
}
