'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/services/api'

// Types
export type Priority = 'High' | 'Medium' | 'Low'
export type Status = 'Pending' | 'In Progress' | 'Completed' | 'Not Started'
type Category = 'Health' | 'Education' | 'Financial' | 'Personal'

export interface Assignment {
    id: string | number // allow API IDs
    title: string
    subject: string
    due: string
    priority: Priority
    status: Status
}

export interface Habit {
    id: number | string
    name: string
    goal: number // Daily target in component
    completed: number
    icon: string
    weekData?: Record<string, boolean[]>
    // Helper to store API specific fields if needed
    category?: string
}

export interface Goal {
    id: string
    title: string
    category: Category
    progress: number
    deadline: string
    description?: string
    target?: number
}

interface DataContextType {
    assignments: Assignment[]
    habits: Habit[]
    goals: Goal[]
    addAssignment: (assignment: Omit<Assignment, 'id'>) => void
    updateAssignment: (id: number | string, updates: Partial<Assignment>) => void
    addHabit: (habit: Omit<Habit, 'id'>) => void
    toggleHabitCompletion: (habitId: number | string, dayIndex: number) => void
    addGoal: (goal: Omit<Goal, 'id'>) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [habits, setHabits] = useState<Habit[]>([])
    const [goals, setGoals] = useState<Goal[]>([])

    // Load from local storage on mount (fallback)
    useEffect(() => {
        const savedAssignments = localStorage.getItem('assignments')
        const savedHabits = localStorage.getItem('habits')
        const savedGoals = localStorage.getItem('goals')

        if (savedAssignments) setAssignments(JSON.parse(savedAssignments))
        if (savedHabits) setHabits(JSON.parse(savedHabits))
        if (savedGoals) setGoals(JSON.parse(savedGoals))
    }, [])

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(assignments))
    }, [assignments])

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits))
    }, [habits])

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals))
    }, [goals])

    const addAssignment = async (assignment: Omit<Assignment, 'id'>) => {
        const newAssignment: Assignment = { ...assignment, id: Date.now() }
        setAssignments(prev => [...prev, newAssignment])

        if (user && user._id) {
            try {
                // Map to API Task
                const apiTask = {
                    id: crypto.randomUUID(),
                    title: assignment.title,
                    dueDate: assignment.due,
                    priority: assignment.priority.toUpperCase(),
                    createdAt: new Date().toISOString()
                }
                await api.tasks.create(user._id, apiTask)
            } catch (error) {
                console.error("Failed to sync task", error)
            }
        }
    }

    const updateAssignment = (id: number | string, updates: Partial<Assignment>) => {
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    }

    const addHabit = async (habit: Omit<Habit, 'id'>) => {
        const today = new Date()
        const weekId = today.getFullYear() + '-' + (today.getMonth() + 1)
        const initialWeekData = [false, false, false, false, false, false, false]

        const newHabit: Habit = {
            ...habit,
            id: Date.now(),
            weekData: {
                [weekId]: initialWeekData
            }
        }
        setHabits(prev => [...prev, newHabit])

        if (user && user._id) {
            try {
                // Map to API Habit
                // API expects: name, icon, goal (string), category, weekData (object)
                const apiWeekData = {
                    monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
                }
                const apiHabit = {
                    name: habit.name,
                    icon: habit.icon,
                    goal: `Daily goal: ${habit.goal} times`, // Generating description from number
                    category: habit.category || 'Fitness', // Default to Fitness if missing
                    weekData: apiWeekData
                }
                await api.habits.create(user._id, apiHabit)
            } catch (error) {
                console.error("Failed to sync habit", error)
            }
        }
    }

    const toggleHabitCompletion = (habitId: number | string, dayIndex: number) => {
        setHabits(prev => prev.map(h => {
            if (h.id !== habitId) return h

            const today = new Date()
            const weekId = today.getFullYear() + '-' + (today.getMonth() + 1)
            const currentWeekData = h.weekData?.[weekId] || [false, false, false, false, false, false, false]

            const newWeekData = [...currentWeekData]
            newWeekData[dayIndex] = !newWeekData[dayIndex]

            const newCompleted = newWeekData[dayIndex] ? h.completed + 1 : h.completed - 1

            return {
                ...h,
                completed: newCompleted < 0 ? 0 : newCompleted,
                weekData: {
                    ...h.weekData,
                    [weekId]: newWeekData
                }
            }
        }))
    }

    const addGoal = async (goal: Omit<Goal, 'id'>) => {
        const newGoal: Goal = { ...goal, id: Date.now().toString(), progress: 0 }
        setGoals(prev => [...prev, newGoal])

        if (user && user._id) {
            try {
                // Map to API Goal
                // API expects: title, description, target, timeframe
                const apiGoal = {
                    title: goal.title,
                    description: goal.description || `Goal for ${goal.category}`,
                    target: goal.target || 100,
                    timeframe: goal.deadline // Use deadline as timeframe
                }
                await api.goals.create(user._id, apiGoal)
            } catch (error) {
                console.error("Failed to sync goal", error)
            }
        }
    }

    return (
        <DataContext.Provider value={{
            assignments,
            habits,
            goals,
            addAssignment,
            updateAssignment,
            addHabit,
            toggleHabitCompletion,
            addGoal
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider')
    }
    return context
}
