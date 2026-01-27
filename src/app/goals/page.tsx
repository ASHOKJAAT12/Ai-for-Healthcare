import GoalPlanner from '@/components/Features/GoalPlanner'

export default function GoalsPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Goal Planner</h1>
                <p className="text-muted-foreground">Set and track your long-term goals and milestones.</p>
            </div>
            <GoalPlanner />
        </div>
    )
}
