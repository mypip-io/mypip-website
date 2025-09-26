import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/sanity/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    if (!email || !source) {
      return NextResponse.json(
        { error: 'Email and source are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get client IP and user agent
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0] || realIP || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Save to Sanity
    const result = await sanityClient.create({
      _type: 'email',
      email,
      source,
      subscribedAt: new Date().toISOString(),
      ipAddress,
      userAgent,
    })

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Email capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}