'use client'
import { useState } from 'react'
import { FileText, Clock, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/Common/Badge'
import { cn } from '@/lib/utils'

const assignments = [
    { id: 1, title: 'Calculus Problem Set 3', subject: 'Math', due: '2024-02-10', status: 'Pending', priority: 'High' },
    { id: 2, title: 'History Essay Draft', subject: 'History', due: '2024-02-12', status: 'In Progress', priority: 'Medium' },
    { id: 3, title: 'Lab Report: Photosynthesis', subject: 'Biology', due: '2024-02-15', status: 'Not Started', priority: 'Low' },
    { id: 4, title: 'React Project', subject: 'CS', due: '2024-02-08', status: 'Completed', priority: 'High' },
]

export default function AssignmentTracker() {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 bg-primary/5 border-b border-border">
                <h2 className="text-xl font-bold">Upcoming Assignments</h2>
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
                                        {new Date(ass.due).toLocaleDateString()}
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
    )
}
