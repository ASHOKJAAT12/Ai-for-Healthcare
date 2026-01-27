'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Goal, CheckCircle, BookOpen, Calendar, ClipboardList, FileText, Settings, BarChart3 } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/goals', label: 'Goal Planner', icon: Goal },
  { href: '/habits', label: 'Habit Tracker', icon: CheckCircle },
  { href: '/student', label: 'Student Planner', icon: BookOpen },
  { href: '/tasks', label: 'To Do List', icon: Calendar },
  { href: '/assignments', label: 'Assignment Tracker', icon: ClipboardList },
  { href: '/healthcare', label: 'AI Healthcare', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border h-screen p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-12">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">HealthAI</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}>
              <Button
                variant={active ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start h-12',
                  active ? 'bg-primary/10 border-primary/20' : 'hover:bg-accent'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Button>
            </Link>
          )
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <Button variant="outline" className="w-full">Settings</Button>
      </div>
    </div>
  )
}
