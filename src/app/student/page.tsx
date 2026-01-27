import StudentPlanner from '@/components/Features/StudentPlanner'

export default function PlannerPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Student Planner</h1>
                <p className="text-muted-foreground">Manage your study schedule and classes.</p>
            </div>
            <StudentPlanner />
        </div>
    )
}
