import StudentPlanner from '@/components/Features/StudentPlanner'

export default function PlannerPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Student Planner</h1>
            <p className="text-muted-foreground">Manage your study schedule and classes.</p>
            <StudentPlanner />
        </div>
    )
}
