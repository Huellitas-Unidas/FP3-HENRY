import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
<<<<<<< HEAD
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
=======
    create(createPostDto: CreatePostDto): Promise<any>;
    findAll(): Promise<any>;
>>>>>>> ff64cf755ea861e7f0a2259688399e436a14a41d
    findOne(id: string): string;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
