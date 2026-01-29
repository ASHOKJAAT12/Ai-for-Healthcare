'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<any>;
    register: (userData: User) => Promise<any>;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.auth.login({ email, password });
            // Assuming response.data contains the user object or has a user property
            const userData = response.data.user || response.data;

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return response.data;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || 'Login failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: User) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.auth.register(userData);
            const newUser = response.data.user || response.data;

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return response.data;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || 'Registration failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Optional: redirect to login
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};