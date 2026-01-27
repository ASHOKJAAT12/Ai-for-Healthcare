import HabitTracker from '@/components/Features/HabitTracker'

export default function HabitsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Habit Tracker</h1>
            <p className="text-muted-foreground">Build better habits and track your daily progress.</p>
            <HabitTracker />
        </div>
    )
}
