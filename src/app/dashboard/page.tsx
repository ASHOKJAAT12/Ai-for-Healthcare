'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Dashboard/Sidebar'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import ProgressOverview from '@/components/Dashboard/ProgressOverview'
import Charts from '@/components/Dashboard/Charts'
import HabitTracker from '@/components/Features/HabitTracker'
import ChatIcon from '@/components/Chatbot/ChatIcon'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8 overflow-auto">
          <ProgressOverview />
          <Charts />
          <HabitTracker />
        </main>
      </div>
      <ChatIcon />
    </div>
  )
}
