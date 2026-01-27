'use client'
import { useState } from 'react'
import { Check, X, Plus } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { Badge } from '@/components/Common/Badge'
import { cn } from '@/lib/utils'

const habits = [
  { id: 1, name: 'Wake up at 6AM ⏰', goal: 10, completed: 8, icon: '⏰' },
  { id: 2, name: 'Gym workout 💪', goal: 10, completed: 7, icon: '💪' },
  { id: 3, name: 'Read 10 pages 📖', goal: 10, completed: 9, icon: '📖' },
  { id: 4, name: 'Study 1 hour 📚', goal: 10, completed: 6, icon: '📚' },
  { id: 5, name: 'No alcohol 🍷', goal: 10, completed: 10, icon: '🍷' },
  { id: 6, name: 'Track expenses 💰', goal: 10, completed: 5, icon: '💰' },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function HabitTracker() {
  const [weekData, setWeekData] = useState<Record<number, boolean[]>>({
    1: [true, true, false, true, true, false, true],
    2: [true, false, true, true, false, true, true],
    3: [false, true, true, false, true, true, false],
    4: [true, true, true, true, true, false, true],
    5: [true, true, true, true, true, true, true],
    6: [false, false, true, false, true, false, true],
  })

  const toggleHabit = (habitId: number, dayIndex: number) => {
    setWeekData(prev => ({
      ...prev,
      [habitId]: prev[habitId].map((completed, i) => i === dayIndex ? !completed : completed)
    }))
  }

  return (
    <div className="bg-card rounded-2xl border p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Habit Tracker</h2>
          {/* ✅ USE BADGE HERE */}
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Week 1</span>
            <Badge variant="success">78% completion</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-4 pr-4 w-64 font-medium text-foreground">Daily Habits</th>
              {days.map(day => (
                <th key={day} className="text-center pb-4 px-2 font-medium text-muted-foreground">
                  {day}
                </th>
              ))}
              <th className="text-right pb-4 pl-4 font-medium text-foreground">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {habits.map(habit => {
              const completionRate = Math.round((habit.completed / habit.goal) * 100)
              return (
                <tr key={habit.id} className="hover:bg-accent/50">
                  <td className="py-4 pr-4 font-medium flex items-center space-x-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <span>{habit.name}</span>
                  </td>
                  {weekData[habit.id]?.map((completed, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-2 text-center">
                      <button
                        onClick={() => toggleHabit(habit.id, dayIndex)}
                        className={cn(
                          'w-8 h-8 rounded-lg border-2 flex items-center justify-center mx-auto transition-all',
                          completed
                            ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                            : 'border-border hover:border-ring hover:bg-accent'
                        )}
                      >
                        {completed ? <Check className="w-4 h-4" /> : <X className="w-3 h-3" />}
                      </button>
                    </td>
                  ))}
                  {/* ✅ USE BADGE HERE - REPLACES PLAIN TEXT */}
                  <td className="py-4 pl-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Badge
                        variant={habit.completed === habit.goal ? 'success' : 'warning'}
                        size="sm"
                      >
                        {habit.completed}
                      </Badge>
                      <span className="text-sm font-medium">/{habit.goal}</span>
                      <Badge variant="secondary" size="sm" className="ml-2">
                        {completionRate}%
                      </Badge>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
