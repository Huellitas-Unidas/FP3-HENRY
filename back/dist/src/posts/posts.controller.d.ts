import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
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
    findOne(id: string): string;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
