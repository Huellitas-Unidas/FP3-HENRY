import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
export declare class UserService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            id: number;
            createdAt: Date;
            name: string;
            email: string;
            password: string;
<<<<<<< HEAD
=======
            name: string;
            id: string;
            createdAt: Date;
>>>>>>> 1c03a9d18216e947d63ae9eceaafce28459ae1b8
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
<<<<<<< HEAD
        id: number;
        createdAt: Date;
        name: string;
        email: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        email: string;
        password: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        email: string;
        password: string;
    }>;
    remove(id: number): Promise<{
=======
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
>>>>>>> 1c03a9d18216e947d63ae9eceaafce28459ae1b8
        message: string;
    }>;
}
