import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createProfilePhoto(userId: string, file: Express.Multer.File): Promise<{
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
}
