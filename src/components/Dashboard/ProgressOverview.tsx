import { TrendingUp, Target, CheckCircle, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Common/Card'

const stats = [
  { value: '87%', label: 'Habit Completion', icon: CheckCircle, trend: '+12%' },
  { value: '4/7', label: 'Goals Achieved', icon: Target, trend: '+2' },
  { value: '23 days', label: 'Streak', icon: TrendingUp, trend: '🔥' },
  { value: '95%', label: 'Weekly Progress', icon: Award, trend: '+8%' },
]

export default function ProgressOverview() {
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
