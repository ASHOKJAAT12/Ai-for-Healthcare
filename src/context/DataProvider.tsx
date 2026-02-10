// src/context/DataProvider.tsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { Assignment, Habit, Goal, HabitCompletion } from '@/types/database'

interface DataContextType {
    assignments: Assignment[]
    habits: Habit[]
    goals: Goal[]
    addAssignment: (assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
    addHabit: (habit: Omit<Habit, 'id' | 'created_at' | 'user_id'>) => Promise<void>
    toggleHabitCompletion: (habitId: string, date: string) => Promise<void>
    addGoal: (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
    loading: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [habits, setHabits] = useState<Habit[]>([])
    const [goals, setGoals] = useState<Goal[]>([])
    const [loading, setLoading] = useState(false)

    // Fetch all data when user logs in
    useEffect(() => {
        if (user?.id) {
            fetchAllData()
        } else {
            // Clear data when user logs out
            setAssignments([])
            setHabits([])
            setGoals([])
        }
    }, [user?.id])

    const fetchAllData = async () => {
        if (!user?.id) return

        setLoading(true)
        try {
            // Fetch assignments
            const { data: assignmentsData } = await supabase
                .from('assignments')
                .select('*')
                .eq('user_id', user.id)
                .order('due_date', { ascending: true })

            // Fetch habits
            const { data: habitsData } = await supabase
                .from('habits')
                .select('*')
                .eq('user_id', user.id)
                .eq('is_active', true)

            // Fetch goals
            const { data: goalsData } = await supabase
                .from('goals')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (assignmentsData) setAssignments(assignmentsData)
            if (habitsData) setHabits(habitsData)
            if (goalsData) setGoals(goalsData)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const addAssignment = async (assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => {
        if (!user?.id) return

        try {
            const { data, error } = await supabase
                .from('assignments')
                .insert([{ ...assignment, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            if (data) setAssignments(prev => [...prev, data])
        } catch (error) {
            console.error('Error adding assignment:', error)
        }
    }

    const addHabit = async (habit: Omit<Habit, 'id' | 'created_at' | 'user_id'>) => {
        if (!user?.id) return

        try {
            const { data, error } = await supabase
                .from('habits')
                .insert([{ ...habit, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            if (data) setHabits(prev => [...prev, data])
        } catch (error) {
            console.error('Error adding habit:', error)
        }
    }

    const toggleHabitCompletion = async (habitId: string, date: string) => {
        if (!user?.id) return

        try {
            // Check if completion exists
            const { data: existing } = await supabase
                .from('habit_completions')
                .select('*')
                .eq('habit_id', habitId)
                .eq('completion_date', date)
                .single()

            if (existing) {
                // Toggle completion
                const { error } = await supabase
                    .from('habit_completions')
                    .update({ is_completed: !existing.is_completed })
                    .eq('id', existing.id)

                if (error) throw error
            } else {
                // Create new completion
                const { error } = await supabase
                    .from('habit_completions')
                    .insert([{
                        habit_id: habitId,
                        user_id: user.id,
                        completion_date: date,
                        is_completed: true
                    }])

                if (error) throw error
            }
        } catch (error) {
            console.error('Error toggling habit:', error)
        }
    }

    const addGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
        if (!user?.id) return

        try {
            const { data, error } = await supabase
                .from('goals')
                .insert([{ ...goal, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            if (data) setGoals(prev => [...prev, data])
        } catch (error) {
            console.error('Error adding goal:', error)
        }
    }

    return (
        <DataContext.Provider value={{
            assignments,
            habits,
            goals,
            addAssignment,
            addHabit,
            toggleHabitCompletion,
            addGoal,
            loading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext)
    if (!context) throw new Error('useData must be used within DataProvider')
    return context
}