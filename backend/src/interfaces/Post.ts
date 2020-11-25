import { User } from "./User";

export interface Post {
    id: string;
    title: string;
    votes: number;
    author: User;
    lastVoted: Votes[];
}

interface Votes {
    username: string;
    isUpvote: boolean;
}
