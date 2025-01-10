import { PqrService } from './pqr.service';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
export declare class PqrController {
    private readonly pqrService;
    constructor(pqrService: PqrService);
    create(createPqrDto: CreatePqrDto): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        description: string;
        userId: string;
        updatedAt: Date;
        type: string;
        fullname: string;
    }>;
    findAll(): Promise<({
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
    } & {
        email: string;
        id: string;
        createdAt: Date;
        description: string;
        userId: string;
        updatedAt: Date;
        type: string;
        fullname: string;
    })[]>;
    findOne(id: string): Promise<{
        email: string;
        id: string;
        createdAt: Date;
        description: string;
        userId: string;
        updatedAt: Date;
        type: string;
        fullname: string;
    }>;
    update(id: string, updatePqrDto: UpdatePqrDto): Promise<void>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
