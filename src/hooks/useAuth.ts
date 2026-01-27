import { useState, useEffect } from 'react'
import { User } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token with backend
      setUser({ id: '1', name: 'Test User', email: 'test@example.com', phone: '1234567890', createdAt: new Date() })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Call login API
    localStorage.setItem('token', 'fake-jwt-token')
    setUser({ id: '1', name: 'Test User', email, phone: '1234567890', createdAt: new Date() })
  }

  const signup = async (name: string, email: string, phone: string, password: string) => {
    // Call signup API
    localStorage.setItem('token', 'fake-jwt-token')
    setUser({ id: '1', name, email, phone, createdAt: new Date() })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, loading, login, signup, logout }
}
