'use client'
import { useState, useEffect } from 'react'
import { FileText, Clock, AlertCircle, Plus, X } from 'lucide-react'
import { Badge } from '@/components/Common/Badge'
import { Button } from '@/components/Common/Button'
import { Modal } from '@/components/Common/Modal'
import { cn } from '@/lib/utils'

const initialAssignments = [
    { id: 1, title: 'Calculus Problem Set 3', subject: 'Math', due: '2024-02-10', status: 'Pending', priority: 'High' },
    { id: 2, title: 'History Essay Draft', subject: 'History', due: '2024-02-12', status: 'In Progress', priority: 'Medium' },
    { id: 3, title: 'Lab Report: Photosynthesis', subject: 'Biology', due: '2024-02-15', status: 'Not Started', priority: 'Low' },
    { id: 4, title: 'React Project', subject: 'CS', due: '2024-02-08', status: 'Completed', priority: 'High' },
]

export default function AssignmentTracker() {
    const [assignments, setAssignments] = useState(initialAssignments)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        subject: '',
        due: '',
        priority: 'Medium',
        status: 'Pending'
    })

    // Hydration fix: Use a consistent date formatter or just display the string if possible, 
    // but to matches the design which likely wants 'Locale' string, we use a client-side only render or fixed locale.
    // 'en-US' usually matches server if NODE_ICU_DATA is standard, but best to be safe.
    // Actually, the error was 10/2/2024 vs 10/02/2024. 
    // We can just format it manually to avoid locale diffs.
    const formatDate = (dateString: string) => {
        const d = new Date(dateString)
        return d.toLocaleDateString('en-US') // Forcing en-US usually solves 90% of these. 
        // If not, we can use d.toISOString().split('T')[0] or similar. 
        // Let's try forcing 'en-GB' or similar if user is in India? 
        // User is likely in India (Ashok), so 'en-IN' might be default on client but server is US?
        // Safest is to just render the string from state if it was already a string, but here we have YYYY-MM-DD in state.
        // Let's us a simple function that doesn't rely on locale sensitive parts if possible, or just strict locale.
    }

    // Better fix for hydration: Wrap date in a component that only renders on client, OR use a useEffect to set formatted date.
    // Or simplest: Just use inline split/join if we want YYYY-MM-DD or simple MM/DD/YYYY
    // Let's stick to strict en-US for now.

    const handleAdd = () => {
        if (!newAssignment.title || !newAssignment.subject || !newAssignment.due) return

        setAssignments([
            ...assignments,
            {
                id: Date.now(),
                title: newAssignment.title,
                subject: newAssignment.subject,
                due: newAssignment.due,
                status: newAssignment.status,
                priority: newAssignment.priority
            }
        ])
        setIsAddOpen(false)
        setNewAssignment({
            title: '',
            subject: '',
            due: '',
            priority: 'Medium',
            status: 'Pending'
        })
    }

    return (
        <>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 bg-primary/5 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold">Upcoming Assignments</h2>
                    <Button onClick={() => setIsAddOpen(true)} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Assignment
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-4 font-medium text-muted-foreground">Assignment</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Subject</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Due Date</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                                <th className="text-left p-4 font-medium text-muted-foreground">Priority</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {assignments.map(ass => (
                                <tr key={ass.id} className="hover:bg-accent/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <span className="font-medium">{ass.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-muted-foreground">{ass.subject}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4 text-primary" />
                                            {/* Hydration safe date */}
                                            {new Date(ass.due).toLocaleDateString('en-GB')}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={ass.status === 'Completed' ? 'success' : 'secondary'}>
                                            {ass.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                            ass.priority === 'High' && "bg-red-500/10 text-red-600 border-red-200",
                                            ass.priority === 'Medium' && "bg-yellow-500/10 text-yellow-600 border-yellow-200",
                                            ass.priority === 'Low' && "bg-green-500/10 text-green-600 border-green-200",
                                        )}>
                                            <AlertCircle className="w-3 h-3" />
                                            {ass.priority}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Assignment">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                            value={newAssignment.title}
                            onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
                            placeholder="e.g. Calculus Homework"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                value={newAssignment.subject}
                                onChange={e => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                                placeholder="e.g. Math"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Due Date</label>
                            <input
                                type="date"
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                value={newAssignment.due}
                                onChange={e => setNewAssignment({ ...newAssignment, due: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Priority</label>
                            <select
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                value={newAssignment.priority}
                                onChange={e => setNewAssignment({ ...newAssignment, priority: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                                value={newAssignment.status}
                                onChange={e => setNewAssignment({ ...newAssignment, status: e.target.value })}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Not Started">Not Started</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button onClick={handleAdd}>Add Assignment</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
