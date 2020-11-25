import { User } from "./User";

export interface Post {
    id: string;
    title: string;
    votes: number;
    author: string;
    lastVoted: Votes[];
}

interface Votes {
    voterId: string;
    isUpvote: boolean;
}
