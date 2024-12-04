import { Gift } from "./gift";

export interface AuthUser {
    username: string,
    email: string,
    tel: string,
    password: string,
    _id: string,
    gifts: Gift[],
    likedGifts: Gift[],
    boughtGifts: Gift[]

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
