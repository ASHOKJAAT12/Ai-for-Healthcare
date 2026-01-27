import { Bot, LineChart, Activity } from 'lucide-react'
import { Button } from '@/components/Common/Button'

export default function HealthcarePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">AI Healthcare</h1>
            <p className="text-muted-foreground">Your personal AI health companion and analytics.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-2xl border shadow-sm">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Symptom Checker</h3>
                    <p className="text-muted-foreground mb-4">Chat with our advanced AI to check symptoms and get health advice.</p>
                    <Button>Start Analysis</Button>
                </div>

                <div className="bg-card p-6 rounded-2xl border shadow-sm">
                    <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                        <Activity className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Health Metrics</h3>
                    <p className="text-muted-foreground mb-4">Track your vitals, sleep patterns, and daily activity levels.</p>
                    <Button variant="outline">View Report</Button>
                </div>
            </div>
        </div>
    )
}
