import { User } from './userTypes';

const users: User[] = [];

export const userService = {
    createUser: (user: User) => {
        users.push(user);
        return user;
    },
    getUser: (id: string) => {
        return users.find(user => user.id === id);
    },
    updateUser: (id: string, updatedUser: Partial<User>) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            return users[index];
        }
        return null;
    },
    deleteUser: (id: string) => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    },
    getAllUsers: () => {
        return users;
    }
};