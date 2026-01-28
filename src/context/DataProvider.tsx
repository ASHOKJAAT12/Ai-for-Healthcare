'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Types
type Priority = 'High' | 'Medium' | 'Low'
type Status = 'Pending' | 'In Progress' | 'Completed' | 'Not Started'

interface Assignment {
    id: number
    title: string
    subject: string
    due: string
    priority: Priority
    status: Status
}

interface Habit {
    id: number
    name: string
    goal: number
    completed: number
    icon: string
    // For simplicity, we can track weekly completions as a boolean array or similar
    // But to match the existing UI, we might need a record of dates or a weekly array.
    // For the "Start from 0" requirement, we'll keep it simple: today's completion and total streak/history could be added later.
    // The existing UI has a 'weekData' prop. Let's persist that.
    weekData?: Record<string, boolean[]>
}

interface DataContextType {
    assignments: Assignment[]
    habits: Habit[]
    addAssignment: (assignment: Omit<Assignment, 'id'>) => void
    updateAssignment: (id: number, updates: Partial<Assignment>) => void
    addHabit: (habit: Omit<Habit, 'id'>) => void
    toggleHabitCompletion: (habitId: number, dayIndex: number) => void
    // Add other methods as needed for other features
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [habits, setHabits] = useState<Habit[]>([])
    // Add other states here (todos, goals, etc.)

    // Load from local storage on mount
    useEffect(() => {
        const savedAssignments = localStorage.getItem('assignments')
        const savedHabits = localStorage.getItem('habits')

        if (savedAssignments) setAssignments(JSON.parse(savedAssignments))
        if (savedHabits) setHabits(JSON.parse(savedHabits))
    }, [])

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(assignments))
    }, [assignments])

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits))
    }, [habits])

    const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
        const newAssignment = { ...assignment, id: Date.now() }
        setAssignments(prev => [...prev, newAssignment])
    }

    const updateAssignment = (id: number, updates: Partial<Assignment>) => {
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
    }

    const addHabit = (habit: Omit<Habit, 'id'>) => {
        const today = new Date()
        const weekId = today.getFullYear() + '-' + (today.getMonth() + 1)

        const newHabit = {
            ...habit,
            id: Date.now(),
            weekData: {
                [weekId]: [false, false, false, false, false, false, false]
            }
        }
        setHabits(prev => [...prev, newHabit])
    }

    const toggleHabitCompletion = (habitId: number, dayIndex: number) => {
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

    return (
        <DataContext.Provider value={{
            assignments,
            habits,
            addAssignment,
            updateAssignment,
            addHabit,
            toggleHabitCompletion
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
