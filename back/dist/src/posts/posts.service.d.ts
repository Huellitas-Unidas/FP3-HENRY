import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FilesUploadService } from '../files-upload/files-upload.service';
import { EmailService } from 'src/email/email.service';
export declare class PostsService {
    private readonly prisma;
    private readonly filesUploadService;
    private emailService;
    constructor(prisma: PrismaService, filesUploadService: FilesUploadService, emailService: EmailService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File | undefined): Promise<{
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
    }>;
    findAll(): Promise<({
        location: {
            id: string;
            latitude: number;
            longitude: number;
            address: string | null;
            postId: string | null;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        location: {
            id: string;
            latitude: number;
            longitude: number;
            address: string | null;
            postId: string | null;
        };
    } & {
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
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        message: string;
        updatedPost: {
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
