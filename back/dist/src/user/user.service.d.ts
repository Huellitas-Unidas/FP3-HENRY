import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
export declare class UserService {
    private prisma;
    private authService;
    private emailService;
    constructor(prisma: PrismaService, authService: AuthService, emailService: EmailService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            email: string;
            password: string;
            name: string;
            phone: string;
            role: import(".prisma/client").$Enums.Role;
            id: string;
            profilePicture: string | null;
            createdAt: Date;
        };
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        profilePicture: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        posts: {
            id: string;
            createdAt: Date;
            title: string;
            description: string;
            petType: string;
            contactInfo: string;
            dateLost: Date;
            photoUrl: string;
            status: string;
            updatedAt: Date;
        }[];
        donations: {
            email: string;
            id: string;
            createdAt: Date;
            userId: string;
            amount: number;
            paymentIntent: string;
        }[];
        pets: {
            name: string;
            id: string;
            description: string;
            status: string;
            userId: string;
            type: string;
            genero: string;
            imgUrl: string;
        }[];
        pqr: {
            email: string;
            id: string;
            createdAt: Date;
            description: string;
            userId: string;
            updatedAt: Date;
            type: string;
            fullname: string;
        }[];
        email: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        profilePicture: string | null;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        profilePicture: string | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    userPets(id: string): Promise<{
        name: string;
        id: string;
        description: string;
        status: string;
        userId: string;
        type: string;
        genero: string;
        imgUrl: string;
    }[]>;
    userPosts(id: string): Promise<{
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
    }[]>;
}
