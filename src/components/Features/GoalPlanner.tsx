'use client'
import { useState } from 'react'
import { Plus, Target, TrendingUp, Calendar } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { cn } from '@/lib/utils'

interface Goal {
    id: string
    title: string
    category: 'Health' | 'Education' | 'Financial' | 'Personal'
    progress: number
    deadline: string
}

export default function GoalPlanner() {
    const [goals, setGoals] = useState<Goal[]>([
        { id: '1', title: 'Lose 5kg', category: 'Health', progress: 40, deadline: '2024-03-01' },
        { id: '2', title: 'Learn Next.js', category: 'Education', progress: 75, deadline: '2024-02-15' },
        { id: '3', title: 'Save $1000', category: 'Financial', progress: 20, deadline: '2024-04-01' },
    ])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add New Goal Card */}
            <div className="bg-card border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors cursor-pointer group h-full min-h-[200px]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Add New Goal</h3>
                <p className="text-sm text-muted-foreground mt-1">Set a new milestone</p>
            </div>

            {goals.map(goal => (
                <div key={goal.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            goal.category === 'Health' && "bg-green-500/10 text-green-600",
                            goal.category === 'Education' && "bg-blue-500/10 text-blue-600",
                            goal.category === 'Financial' && "bg-yellow-500/10 text-yellow-600",
                            goal.category === 'Personal' && "bg-purple-500/10 text-purple-600",
                        )}>
                            {goal.category}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                            <Target className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{goal.title}</h3>

                    <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <Calendar className="w-4 h-4 mr-2" />
                        Due {new Date(goal.deadline).toLocaleDateString()}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">{goal.progress}% Completed</span>
                            <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${goal.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
