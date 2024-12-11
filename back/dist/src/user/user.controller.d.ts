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
            username: string;
            password: string;
            name: string;
            id: number;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        email: string;
        username: string;
        name: string;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
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
