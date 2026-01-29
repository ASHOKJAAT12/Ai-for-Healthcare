
import { User } from '@/types';

const USERS_KEY = 'registered_users';

export const mockAuth = {
    register: async (userData: User) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const existingUser = users.find((u: User) => u.email === userData.email);

        if (existingUser) {
            // Throwing error structure similar to axios error
            const error: any = new Error('User already exists');
            error.response = { data: { message: 'User already exists' } };
            throw error;
        }

        // Create new user with ID
        const newUser = {
            ...userData,
            _id: Date.now().toString(),
            // Ensure we store the password for checking (in a real app, never store plain text passwords)
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Return success response structure
        return {
            data: {
                user: newUser,
                token: 'mock-jwt-token-' + Date.now()
            }
        };
    },

    login: async (credentials: Pick<User, 'email' | 'password'>) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find((u: User) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (!user) {
            const error: any = new Error('Invalid credentials');
            error.response = { data: { message: 'Invalid email or password' } };
            throw error;
        }

        // Return success response structure matching what the invalid backend returned roughly, 
        // but with the correct user data
        return {
            data: {
                user,
                token: 'mock-jwt-token-' + Date.now()
            }
        };
    }
};
