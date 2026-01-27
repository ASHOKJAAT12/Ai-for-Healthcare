import TodoList from '@/components/Features/TodoList'

export default function TasksPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">To Do List</h1>
            <p className="text-muted-foreground">Stay organized with your daily tasks.</p>
            <TodoList />
        </div>
    )
}
