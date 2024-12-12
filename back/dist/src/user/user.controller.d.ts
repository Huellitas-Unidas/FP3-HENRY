import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            email: string;
            password: string;
            name: string;
            id: string;
            createdAt: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        posts: {
            id: string;
            createdAt: Date;
            title: string;
            description: string;
            petType: string;
            dateLost: Date;
            location: string;
            contactInfo: string;
            photoUrl: string;
            updatedAt: Date;
        }[];
        notifications: {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            type: string;
            isRead: boolean;
        }[];
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
