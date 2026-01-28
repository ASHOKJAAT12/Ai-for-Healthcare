'use client'
import { TrendingUp, Target, CheckCircle, Award, ClipboardList } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Common/Card'
import { useData } from '@/context/DataProvider'

export default function ProgressOverview() {
  const { habits, assignments } = useData()

  // Calculate Habit Completion
  const totalHabitGoal = habits.reduce((acc, h) => acc + h.goal, 0)
  const totalHabitCompleted = habits.reduce((acc, h) => acc + h.completed, 0)
  const habitCompletionRate = totalHabitGoal > 0 ? Math.round((totalHabitCompleted / totalHabitGoal) * 100) : 0

  // Calculate Pending Assignments
  const pendingAssignments = assignments.filter(a => a.status === 'Pending').length
  const totalAssignments = assignments.length

  const stats = [
    {
      value: `${habitCompletionRate}%`,
      label: 'Habit Completion',
      icon: CheckCircle,
      trend: totalHabitGoal > 0 ? `${totalHabitCompleted}/${totalHabitGoal} done` : 'No habits set'
    },
    {
      value: `${pendingAssignments}`,
      label: 'Pending Assignments',
      icon: ClipboardList,
      trend: `Total: ${totalAssignments}`
    },
    {
      value: '0',
      label: 'Goals Achieved',
      icon: Target,
      trend: 'Start setting goals!'
    },
    {
      value: '0 days',
      label: 'Streak',
      icon: TrendingUp,
      trend: 'Day 1'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map(({ value, label, icon: Icon, trend }, index) => (
        <Card key={index} className="hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
