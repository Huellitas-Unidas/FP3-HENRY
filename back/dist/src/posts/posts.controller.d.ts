import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<{
        id: string;
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        description: string;
        petType: string;
        dateLost: Date;
        location: string;
        contactInfo: string;
        photoUrl: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): string;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
