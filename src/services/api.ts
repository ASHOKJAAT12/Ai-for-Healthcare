'use client'

const BASE_URL = 'https://focused-expression-production-e6b3.up.railway.app';

export const api = {
    auth: {
        register: async (userData: any) => {
            const response = await fetch(`${BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (!response.ok) throw new Error('Registration failed');
            return response.json();
        },
        login: async (credentials: any) => {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (!response.ok) throw new Error('Login failed');
            return response.json();
        },
    },
    goals: {
        create: async (userId: string, goalData: any) => {
            const response = await fetch(`${BASE_URL}/api/goals/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(goalData),
            });
            if (!response.ok) throw new Error('Failed to create goal');
            return response.json();
        },
    },
    habits: {
        create: async (userId: string, habitData: any) => {
            const response = await fetch(`${BASE_URL}/api/habits/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(habitData),
            });
            if (!response.ok) throw new Error('Failed to create habit');
            return response.json();
        },
    },
    tasks: {
        create: async (userId: string, taskData: any) => {
            const response = await fetch(`${BASE_URL}/api/tasks/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) throw new Error('Failed to create task');
            return response.json();
        },
    }
};
