// src/context/AuthContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@/types/database'

// Type for registration data that includes password
interface RegisterData {
    name: string
    email: string
    phone?: string
    password: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<any>
    register: (userData: RegisterData) => Promise<any>
    logout: () => Promise<void>
    loading: boolean
    error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                await fetchUserProfile(session.user.id)
            } else {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const checkUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                await fetchUserProfile(session.user.id)
            }
        } catch (err) {
            console.error('Session check error:', err)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .maybeSingle() // Use maybeSingle instead of single to avoid errors

        if (data) setUser(data)
    }

    const register = async (userData: RegisterData) => {
        setLoading(true)
        setError(null)

        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
            })

            if (authError) throw authError
            if (!authData.user) throw new Error('User creation failed')

            // Insert into users table (no RLS blocking now!)
            const { data: profileData, error: profileError } = await supabase
                .from('users')
                .insert([
                    {
                        id: authData.user.id,
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone || null,
                        password_hash: '',
                        is_active: true,
                    }
                ])
                .select()
                .single()

            if (profileError) throw profileError

            setUser(profileData)
            return { data: profileData }
        } catch (err: any) {
            setError(err.message || 'Registration failed')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) throw authError
            if (!authData.user) throw new Error('Login failed')

            await fetchUserProfile(authData.user.id)
            return { data: user }
        } catch (err: any) {
            setError(err.message || 'Login failed')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}