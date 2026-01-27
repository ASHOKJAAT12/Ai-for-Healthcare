'use client'
import { useAuth } from '@/hooks/useAuth'
import { Bell, Download, LogOut, User } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Common/Avatar'


export default function DashboardHeader() {
  const { user, logout } = useAuth()

  return (
    <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full" />
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="sm">
          <Download className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg cursor-pointer group" onClick={logout}>
          <Avatar className="w-9 h-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {user?.name?.[0] ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:block group-hover:underline">
            {user?.name ?? 'User'}
          </span>
          <LogOut className="w-4 h-4 hidden md:block" />
        </div>
      </div>
    </div>
  )
}
