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
            username: string;
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
        username: string;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        username: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        id: number;
        username: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
