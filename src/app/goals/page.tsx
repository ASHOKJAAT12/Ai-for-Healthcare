import GoalPlanner from '@/components/Features/GoalPlanner'

export default function GoalsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Goal Planner</h1>
            <p className="text-muted-foreground">Set and track your long-term goals and milestones.</p>
            <GoalPlanner />
        </div>
    )
}
