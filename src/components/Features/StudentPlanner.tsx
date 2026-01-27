'use client'
import { useState } from 'react'
import { Book, Clock, MapPin, Plus } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { Modal } from '@/components/Common/Modal'
import { cn } from '@/lib/utils'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

export default function StudentPlanner() {
    const [selectedDay, setSelectedDay] = useState('Mon')
    const [schedule, setSchedule] = useState([
        { id: 1, subject: 'Mathematics', time: '09:00', duration: 2, room: 'Room 101', day: 'Mon', color: 'bg-blue-500' },
        { id: 2, subject: 'Physics', time: '11:00', duration: 1, room: 'Lab 3', day: 'Mon', color: 'bg-indigo-500' },
        { id: 3, subject: 'Biology', time: '14:00', duration: 2, room: 'Room 204', day: 'Tue', color: 'bg-green-500' },
        { id: 4, subject: 'History', time: '10:00', duration: 1, room: 'Room 305', day: 'Wed', color: 'bg-amber-500' },
        { id: 5, subject: 'Computer Sci', time: '13:00', duration: 2, room: 'Lab 1', day: 'Thu', color: 'bg-purple-500' },
    ])
    const [isAddClassOpen, setIsAddClassOpen] = useState(false)
    const [newClass, setNewClass] = useState({
        subject: '',
        time: '',
        duration: 1,
        room: '',
        day: 'Mon'
    })

    const handleAddClass = () => {
        if (!newClass.subject || !newClass.time) return
        const cls = {
            id: Date.now(),
            subject: newClass.subject,
            time: newClass.time,
            duration: newClass.duration,
            room: newClass.room || 'TBD',
            day: newClass.day,
            color: 'bg-primary' // Default color
        }
        setSchedule([...schedule, cls])
        setIsAddClassOpen(false)
        setNewClass({ subject: '', time: '', duration: 1, room: '', day: 'Mon' })
    }

    const todayClasses = schedule.filter(c => c.day === selectedDay)

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Schedule View */}
            <div className="flex-1 bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold">Class Schedule</h2>
                        <Button variant="ghost" size="sm" className="mt-1 -ml-2 text-muted-foreground" onClick={() => setIsAddClassOpen(true)}>
                            <Plus className="w-4 h-4 mr-1" /> Add Class
                        </Button>
                    </div>
                    <div className="flex bg-secondary p-1 rounded-lg">
                        {days.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={cn(
                                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                                    selectedDay === day
                                        ? "bg-background shadow text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {todayClasses.length > 0 ? (
                        todayClasses.map(cls => (
                            <div key={cls.id} className="flex gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="w-16 flex flex-col items-center justify-center border-r border-border pr-4">
                                    <span className="font-bold text-lg">{cls.time}</span>
                                    <span className="text-xs text-muted-foreground">{cls.duration}h</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-lg">{cls.subject}</h3>
                                        <div className={cn("w-3 h-3 rounded-full", cls.color)} />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {cls.room}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Book className="w-4 h-4" />
                                            Lecture
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No classes scheduled for {selectedDay}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mini Calendar / Upcoming */}
            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-gradient-to-br from-primary to-purple-800 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-lg mb-4">Upcoming Exams</h3>
                    <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold">Mathematics Mid-term</span>
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">2d left</span>
                            </div>
                            <p className="text-sm text-white/70 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Feb 15, 09:00 AM
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold">Physics Quiz</span>
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">5d left</span>
                            </div>
                            <p className="text-sm text-white/70 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Feb 18, 11:00 AM
                            </p>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isAddClassOpen}
                    onClose={() => setIsAddClassOpen(false)}
                    title="Add New Class"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                value={newClass.subject}
                                onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                                placeholder="e.g., Chemistry"
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Day</label>
                            <select
                                value={newClass.day}
                                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            >
                                {days.map(day => <option key={day} value={day}>{day}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Time</label>
                                <input
                                    type="time"
                                    value={newClass.time}
                                    onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                                    className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Duration (h)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="4"
                                    value={newClass.duration}
                                    onChange={(e) => setNewClass({ ...newClass, duration: parseInt(e.target.value) })}
                                    className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Room</label>
                            <input
                                type="text"
                                value={newClass.room}
                                onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                                placeholder="e.g., Room 101"
                                className="w-full bg-background border border-input rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button variant="ghost" onClick={() => setIsAddClassOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddClass}>Add Class</Button>
                        </div>
                    </div>
                </Modal>
            </div >
        </div>
    )
}
