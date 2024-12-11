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
            id: number;
            username: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        id: number;
        username: string;
    }[]>;
    findOne(id: string): Promise<{
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
