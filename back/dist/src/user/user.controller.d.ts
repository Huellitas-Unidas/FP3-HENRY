import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            id: number;
            createdAt: Date;
            name: string;
            email: string;
            password: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        email: string;
    }[]>;
    findOne(id: string): Promise<{
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
        message: string;
    }>;
}
