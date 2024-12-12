import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PostsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto): Promise<{
<<<<<<< HEAD
        id: number;
=======
        id: string;
        createdAt: Date;
>>>>>>> 1c03a9d18216e947d63ae9eceaafce28459ae1b8
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
<<<<<<< HEAD
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
=======
        userId: string;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
>>>>>>> 1c03a9d18216e947d63ae9eceaafce28459ae1b8
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
<<<<<<< HEAD
        userId: number;
        createdAt: Date;
=======
        userId: string;
>>>>>>> 1c03a9d18216e947d63ae9eceaafce28459ae1b8
        updatedAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
