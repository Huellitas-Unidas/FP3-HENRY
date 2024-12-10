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
            username: string;
            password: string;
            name: string;
            id: number;
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        email: string;
        username: string;
        name: string;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        username: string;
        password: string;
        name: string;
        id: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        username: string;
        password: string;
        name: string;
        id: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
