import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Mock auth
    if (email && password) {
      return NextResponse.json({ 
        success: true, 
        token: 'mock-jwt-token',
        user: { id: '1', name: 'Test User', email }
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' }, 
      { status: 500 }
    )
  }
}
