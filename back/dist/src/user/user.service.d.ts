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
            email: string;
            password: string;
            name: string;
            id: number;
            createdAt: Date;
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        id: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        createdAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
