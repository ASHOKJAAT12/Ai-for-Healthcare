import TodoList from '@/components/Features/TodoList'

export default function TasksPage() {
    return (
        <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">To Do List</h1>
                <p className="text-muted-foreground">Stay organized with your daily tasks.</p>
            </div>
            <TodoList />
        </div>
    )
}
