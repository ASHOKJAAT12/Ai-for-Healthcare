'use client'
import { useState } from 'react'
import { Check, X, Plus } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { Badge } from '@/components/Common/Badge'
import { Modal } from '@/components/Common/Modal'
import { cn } from '@/lib/utils'
import { useData } from '@/context/DataProvider'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function HabitTracker() {
  const { habits, addHabit, toggleHabitCompletion } = useData()
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: '',
    goal: 1,
    icon: '🎯'
  })

  // Calculate global stats for current week
  const today = new Date()
  const weekId = today.getFullYear() + '-' + (today.getMonth() + 1)


  const calculateStats = () => {
    // Logic to calculate how many habits are completed today, etc.
    // For now, simpler UI matches existing.
    const currentWeek = habits.reduce((acc, habit) => {
      const weekData = habit.weekData?.[weekId] || [false, false, false, false, false, false, false]
      return acc + weekData.reduce((sum: number, completed: boolean) => sum + (completed ? 1 : 0), 0)
    }, 0)
    const totalHabits = habits.length
    const totalMaxChecks = totalHabits * 7 // Total checkable boxes in a week
    const completionRate = totalMaxChecks > 0 ? Math.round((currentWeek / totalMaxChecks) * 100) : 0
    return { currentWeek, totalHabits, completionRate }

  }

  const handleAddHabit = () => {
    if (!newHabit.name) return

    addHabit({
      name: newHabit.name,
      goal: newHabit.goal,
      icon: newHabit.icon,
      completed: 0
    })
    setIsAddHabitOpen(false)
    setNewHabit({ name: '', goal: 1, icon: '🎯' })
  }

  return (
    <>
      <div className="bg-card rounded-2xl border p-8 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Habit Tracker</h2>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">This Week</span>
              {/* Placeholder for real calc */}
              <Badge variant="secondary">{calculateStats().completionRate}%</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAddHabitOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Habit
          </Button>
        </div>

        <div className="overflow-x-auto">
          {habits.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No habits tracked yet. Start building your routine!
            </div>
          ) : (
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
                  const currentWeek = habit.weekData?.[weekId] || [false, false, false, false, false, false, false]
                  const completedCount = currentWeek.filter(Boolean).length
                  const completionRate = Math.round((completedCount / 7) * 100)

                  return (
                    <tr key={habit.id} className="hover:bg-accent/50">
                      <td className="py-4 pr-4 font-medium flex items-center space-x-3">
                        <span className="text-2xl">{habit.icon}</span>
                        <span>{habit.name}</span>
                      </td>
                      {currentWeek.map((completed, dayIndex) => (
                        <td key={dayIndex} className="py-4 px-2 text-center">
                          <button
                            onClick={() => toggleHabitCompletion(habit.id, dayIndex)}
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
                      <td className="py-4 pl-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Badge
                            variant={completedCount >= habit.goal ? 'success' : 'warning'}
                            size="sm"
                          >
                            {completedCount}
                          </Badge>
                          <span className="text-sm font-medium">/ 7</span>
                          <Badge variant="secondary" size="sm" className="ml-2">
                            {isNaN(completionRate) ? 0 : completionRate}%
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
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
