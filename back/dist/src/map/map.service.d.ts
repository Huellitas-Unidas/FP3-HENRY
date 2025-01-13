import { PrismaService } from 'prisma/prisma.service';
export declare class MapService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getLocation(postId: string): Promise<{
        id: string;
        latitude: number;
        longitude: number;
        address: string | null;
        postId: string | null;
    }>;
    getAllLocations(): Promise<({
        post: {
            id: string;
            createdAt: Date;
            title: string;
            description: string;
            petType: string;
            contactInfo: string;
            dateLost: Date;
            photoUrl: string;
            status: string;
            userId: string;
            updatedAt: Date;
        };
    } & {
        id: string;
        latitude: number;
        longitude: number;
        address: string | null;
        postId: string | null;
    })[]>;
}
