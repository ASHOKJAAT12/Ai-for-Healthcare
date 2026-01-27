export interface User {
  id: string
  name: string
  email: string
  phone: string
  createdAt: Date
}

export interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  timeframe: 'week' | 'month' | 'year'
  userId: string
}

export interface Habit {
  id: string
  name: string
  icon: string
  goal: number
  completed: number
  category: 'health' | 'study' | 'personal'
  userId: string
}

export interface Task {
  id: string
  title: string
  completed: boolean
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  userId: string
}
export interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
}
export interface Appointment {
  id: string
  title: string
  date: Date
  time: string
  location: string
  notes?: string
  userId: string
}
