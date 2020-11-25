import { Post } from "./Post";

export interface User {
    name: string;
    posts?: Post[]
}
