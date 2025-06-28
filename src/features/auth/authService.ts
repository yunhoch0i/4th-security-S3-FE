import { User } from '../user/userTypes';
import { validateLogin, validateSignup } from './authValidator';
import { loginApi, signupApi } from '../../lib/api/auth';

export const authService = {
    login: async (email: string, password: string): Promise<User> => {
        const validationErrors = validateLogin(email, password);
        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(', '));
        }
        const user = await loginApi(email, password);
        return user;
    },

    signup: async (email: string, password: string, username: string): Promise<User> => {
        const validationErrors = validateSignup(email, password, username);
        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(', '));
        }
        const user = await signupApi(email, password, username);
        return user;
    }
};