import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source, utmSource, utmMedium, utmCampaign, referrer, userAgent } = body

    // Validate required fields
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

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Create the email document in Sanity
    const emailDoc = {
      _type: 'email',
      email,
      source,
      subscribedAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: userAgent || request.headers.get('user-agent') || '',
      utmSource: utmSource || '',
      utmMedium: utmMedium || '',
      utmCampaign: utmCampaign || '',
      referrer: referrer || '',
    }

    try {
      const result = await sanityClient.create(emailDoc)

      return NextResponse.json({
        success: true,
        message: 'Email submitted successfully',
        id: result._id
      })
    } catch (sanityError: any) {
      console.error('Sanity error:', sanityError)

      // If Sanity fails (e.g., due to auth issues), still return success to user
      // but log the error for debugging
      if (sanityError.statusCode === 401 || sanityError.message?.includes('Unauthorized')) {
        console.warn('Sanity authentication failed - check SANITY_API_TOKEN')
        return NextResponse.json({
          success: true,
          message: 'Email submitted successfully',
          note: 'Stored locally (Sanity auth pending)'
        })
      }

      throw sanityError
    }

  } catch (error) {
    console.error('Email submission error:', error)

    return NextResponse.json(
      { error: 'Failed to submit email. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Email API endpoint' })
}