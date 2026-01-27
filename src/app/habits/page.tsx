import HabitTracker from '@/components/Features/HabitTracker'

export default function HabitsPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Habit Tracker</h1>
                <p className="text-muted-foreground">Build better habits and track your daily progress.</p>
            </div>
            <HabitTracker />
        </div>
    )
}
