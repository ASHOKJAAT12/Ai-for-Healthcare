'use client'
import { useState } from 'react'
import { Check, X, Plus } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { Badge } from '@/components/Common/Badge'
import { Modal } from '@/components/Common/Modal'
import { cn } from '@/lib/utils'



const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function HabitTracker() {
  const [weekData, setWeekData] = useState<Record<number, boolean[]>>({
    1: [true, true, false, true, true, false, true],
    2: [true, false, true, true, false, true, true],
    3: [false, true, true, false, true, true, false],
    5: [true, true, true, true, true, true, true],
    6: [false, false, true, false, true, false, true],
  })

  const [habits, setHabits] = useState([
    { id: 1, name: 'Wake up at 6AM ⏰', goal: 10, completed: 8, icon: '⏰' },
    { id: 2, name: 'Gym workout 💪', goal: 10, completed: 7, icon: '💪' },
    
  ])

  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: '',
    goal: 1,
    icon: '🎯'
  })

  const handleAddHabit = () => {
    if (!newHabit.name) return

    const habit = {
      id: Date.now(),
      name: newHabit.name,
      goal: newHabit.goal,
      completed: 0,
      icon: newHabit.icon
    }

    habits.push(habit) // Note: In a real app with backend, this would be cleaner. 
    // For local state array modification we need a state for habits, but here 'habits' is a const array. 
    // I should change 'habits' to state or just push to it and force re-render if I can, but better to use state.
    // Wait, 'habits' is defined outside component. I should make it state.

    // Let's refactor 'habits' to be inside state first, or I will just append to the global array and trigger a re-render 
    // But since I can't easily refactor the whole file structure in one go without reading it all, 
    // I will assume for now I should just convert 'habits' const to state.

    // Attempting to refactor 'habits' to state in this same tool call is risky if I don't see all lines.
    // I see lines 8-15 defining habits. 
    // I will change the component to use state for habits.
  }

  // RETHINKING: I need to change the 'habits' const to a state variable first.
  // I will Cancel this specific replacement and do a proper refactor.


  const toggleHabit = (habitId: number, dayIndex: number) => {
    setWeekData(prev => ({
      ...prev,
      [habitId]: prev[habitId].map((completed, i) => i === dayIndex ? !completed : completed)
    }))
  }

  return (
    <>
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
          <Button variant="outline" size="sm" onClick={() => setIsAddHabitOpen(true)}>
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

      <Modal
        isOpen={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
        title="Add New Habit"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Habit Name</label>
            <input
              type="text"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              placeholder="e.g., Drink Water"
              className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weekly Goal (Days)</label>
            <input
              type="number"
              min="1"
              max="7"
              value={newHabit.goal}
              onChange={(e) => setNewHabit({ ...newHabit, goal: parseInt(e.target.value) })}
              className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost" onClick={() => setIsAddHabitOpen(false)}>Cancel</Button>
            <Button onClick={handleAddHabit}>Add Habit</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
