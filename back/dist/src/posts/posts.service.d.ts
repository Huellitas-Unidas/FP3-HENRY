import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FilesUploadService } from '../files-upload/files-upload.service';
export declare class PostsService {
    private readonly prisma;
    private readonly filesUploadService;
    constructor(prisma: PrismaService, filesUploadService: FilesUploadService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        petType: string;
        contactInfo: string;
        dateLost: Date;
        location: string;
        photoUrl: string;
        userId: string;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        petType: string;
        contactInfo: string;
        dateLost: Date;
        location: string;
        photoUrl: string;
        userId: string;
        updatedAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
