import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    
    // Mock database save
    console.log('User signed up:', data)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully',
      token: 'mock-jwt-token'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid data' }, 
      { status: 400 }
    )
  }
}
