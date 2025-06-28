export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    userId: string;
    fullName: string;
    bio?: string;
    avatarUrl?: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}