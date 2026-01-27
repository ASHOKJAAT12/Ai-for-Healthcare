import Link from 'next/link'
import { Button } from '@/components/Common/Button'
import { Goal, Target, CheckCircle, Calendar, BookOpen, ClipboardList, FileText } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AI Healthcare Platform
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-foreground/80 mb-12">
              Build intelligent health and wellness solutions that improve diagnostics, 
              patient support, hospital operations, or preventive care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8">Get Started Free</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="text-lg px-8">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Goal} 
              title="Goal Planner" 
              desc="Turn yearly goals into clear, actionable plans"
            />
            <FeatureCard 
              icon={CheckCircle} 
              title="Habit Tracker" 
              desc="Build consistent routines with daily & monthly insights"
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Student Planner" 
              desc="Crush your studies with ease"
            />
            <FeatureCard 
              icon={Calendar} 
              title="To Do List" 
              desc="Plan your week with intention and stay on track"
            />
            <FeatureCard 
              icon={ClipboardList} 
              title="Assignment Tracker" 
              desc="Ease through your assignments without stress"
            />
            <FeatureCard 
              icon={FileText} 
              title="AI Healthcare" 
              desc="Intelligent health & wellness solutions"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="group p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border hover:border-primary/20">
      <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}
