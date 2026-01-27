'use client'
import { useState } from 'react'
import { Check, Plus, Trash2, Calendar } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { cn } from '@/lib/utils'

interface Task {
    id: string
    text: string
    completed: boolean
    tag: string
}

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', text: 'Review biology notes', completed: false, tag: 'Study' },
        { id: '2', text: 'Buy groceries', completed: true, tag: 'Personal' },
        { id: '3', text: 'Call dentist', completed: false, tag: 'Health' },
    ])
    const [input, setInput] = useState('')

    const addTask = () => {
        if (!input.trim()) return
        setTasks([...tasks, { id: Date.now().toString(), text: input, completed: false, tag: 'General' }])
        setInput('')
    }

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                <h2 className="text-xl font-bold mb-4">Today's Tasks</h2>
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        placeholder="Add a new task..."
                        className="flex-1 bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    <Button onClick={addTask} size="icon" className="rounded-xl">
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="divide-y divide-border">
                {tasks.map(task => (
                    <div key={task.id} className={cn(
                        "group flex items-center justify-between p-4 hover:bg-accent/50 transition-colors",
                        task.completed && "bg-muted/30"
                    )}>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    task.completed
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-muted-foreground/30 hover:border-primary"
                                )}
                            >
                                {task.completed && <Check className="w-3.5 h-3.5" />}
                            </button>
                            <div>
                                <p className={cn(
                                    "font-medium transition-all",
                                    task.completed ? "text-muted-foreground line-through" : "text-foreground"
                                )}>
                                    {task.text}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs bg-secondary px-2 py-0.5 rounded text-muted-foreground">{task.tag}</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No tasks yet. Enjoy your day!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
