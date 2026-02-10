import axios from 'axios';
import { User, GoalData, HabitData } from '@/types/database';
import { mockAuth } from './mock-auth';

// Use the environment variable for the base link
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://focused-expression-production-e6b3.up.railway.app';

// Create an axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  auth: {
    // Uses local mock auth for validation
    register: (userData: User) => mockAuth.register(userData),

    // Uses local mock auth for validation
    login: (credentials: Pick<User, 'email' | 'password'>) =>
      mockAuth.login(credentials),
  },

  goals: {
    // Matches: link/api/goals/{userId} [cite: 1]
    create: (userId: string, data: GoalData) =>
      apiClient.post(`/api/goals/${userId}`, data),
  },

  habits: {
    // Matches: link/api/habits/{userId} [cite: 1]
    create: (userId: string, data: HabitData) =>
      apiClient.post(`/api/habits/${userId}`, data),
  },

  tasks: {
    // Matches: link/api/tasks/{userId} [cite: 2]
    create: (userId: string, taskData: any) =>
      apiClient.post(`/api/tasks/${userId}`, taskData),
  }
};