import AssignmentTracker from '@/components/Features/AssignmentTracker'

export default function AssignmentsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Assignment Tracker</h1>
            <p className="text-muted-foreground">Track your assignments and due dates.</p>
            <AssignmentTracker />
        </div>
    )
}
