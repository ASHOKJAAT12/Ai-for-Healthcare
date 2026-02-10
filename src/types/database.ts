// src/types/database.ts
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  password_hash: string
  created_at: string
  updated_at: string
  last_login?: string
  is_active: boolean
  profile_picture?: string
}

export interface Assignment {
  id: string
  user_id: string
  title: string
  subject?: string
  due_date: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Not Started' | 'Pending' | 'In Progress' | 'Completed'
  description?: string
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface Habit {
  id: string
  user_id: string
  name: string
  icon: string
  goal: number
  category?: string
  created_at: string
  is_active: boolean
  weekData?: Record<string, boolean[]>
}

export interface HabitCompletion {
  id: string
  habit_id: string
  user_id: string
  completion_date: string
  is_completed: boolean
  notes?: string
  created_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description?: string
  category: 'Health' | 'Education' | 'Financial' | 'Personal'
  target?: number
  current_progress: number
  progress_percentage: number
  deadline?: string
  timeframe?: string
  status: 'Active' | 'Completed' | 'Paused' | 'Abandoned'
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface HealthData {
  id: string
  user_id: string
  data_type: 'weight' | 'blood_pressure' | 'heart_rate' | 'sleep' | 'steps' | 'other'
  value: string
  unit?: string
  recorded_at: string
  notes?: string
  ai_analysis?: string
  created_at: string
}