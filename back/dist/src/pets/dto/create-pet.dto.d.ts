export declare class CreatePetDto {
    name: string;
    type: string;
    genero: string;
    description: string;
    status: string;
    imgUrl: string;
    userId: string;
}
export declare enum status {
    FOUND = "encontrado",
    LOST = "perdido",
    NONE = "ninguno"
}
