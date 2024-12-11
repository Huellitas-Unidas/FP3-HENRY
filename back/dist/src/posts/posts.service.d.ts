import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
        userId: number;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
        userId: number;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
        userId: number;
        updatedAt: Date;
    }>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<{
        message: string;
        updatedPost: {
            id: number;
            createdAt: Date;
            title: string;
            description: string;
            petType: string;
            dateLost: Date;
            location: string;
            contactInfo: string;
            photoUrl: string;
            userId: number;
            updatedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
