// derived from the Login/Signup payloads [cite: 1]
export interface User {
  _id?: string; // Assuming the DB generates an ID needed for other calls
  name?: string;
  email: string;
  phone?: string;
  password?: string;
}

// derived from the Goals payload [cite: 1]
export interface GoalData {
  title: string;
  description: string;
  target: number;
  timeframe: string;
}

// derived from the Habits payload 
export interface HabitData {
  name: string;
  icon: string;
  goal: string;
  category: string;
  weekData: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
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
