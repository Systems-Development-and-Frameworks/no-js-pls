import { Post } from "./Post";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    posts?: Post[]
}
