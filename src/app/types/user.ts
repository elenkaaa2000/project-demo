export interface AuthUser {
    username: string,
    email: string,
    tel: string,
    password: string,
    id: string
}

export interface User {
    gifts: string[];
    _id: string;
    tel: string;
    email: string;
    username: string;
    password: string;
    created_at: string;
    updatedAt: string;
    __v: number;
}
