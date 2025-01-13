declare enum Role {
    user = "user",
    admin = "admin"
}
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    phone: string;
    role?: Role;
}
export {};
