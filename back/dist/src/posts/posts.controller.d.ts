import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(body: any, file: Express.Multer.File): Promise<{
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
