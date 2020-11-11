import { User } from "./User";

export interface Post {
    id: string;
    title: string;
    votes: number;
    author: User;
}
