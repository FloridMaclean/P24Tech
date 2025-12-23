import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email)
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if SendGrid API key is configured
    const sendGridApiKey = process.env.SENDGRID_API_KEY?.trim()
    
    // Enhanced logging for debugging production issues
    console.log('Environment check:', {
      hasApiKey: !!sendGridApiKey,
      apiKeyLength: sendGridApiKey?.length || 0,
      apiKeyPrefix: sendGridApiKey?.substring(0, 3) || 'N/A',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
    
    if (!sendGridApiKey || sendGridApiKey.length === 0) {
      const diagnosticInfo = {
        envVarExists: 'SENDGRID_API_KEY' in process.env,
        envVarValue: process.env.SENDGRID_API_KEY ? '[REDACTED]' : 'undefined',
        allEnvKeys: Object.keys(process.env).filter(key => key.includes('SENDGRID') || key.includes('EMAIL'))
      }
      console.error('SENDGRID_API_KEY is not configured', diagnosticInfo)
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please contact support.',
          diagnostic: process.env.NODE_ENV === 'development' ? diagnosticInfo : undefined
        },
        { status: 500 }
      )
    }

    // Validate SendGrid API key format (should start with SG.)
    if (!sendGridApiKey.startsWith('SG.')) {
      const diagnosticInfo = {
        keyPrefix: sendGridApiKey.substring(0, 10) + '...',
        keyLength: sendGridApiKey.length,
        expectedPrefix: 'SG.'
      }
      console.error('SENDGRID_API_KEY appears to be invalid (should start with SG.)', diagnosticInfo)
      return NextResponse.json(
        { 
          error: 'Email service configuration error. Please contact support.',
          diagnostic: process.env.NODE_ENV === 'development' ? diagnosticInfo : undefined
        },
        { status: 500 }
      )
    }

    // Helper function to escape HTML
    const escapeHtml = (text: string) => {
      const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      }
      return text.replace(/[&<>"']/g, (m) => map[m])
    }

    // Initialize SendGrid with API key
    sgMail.setApiKey(sendGridApiKey)

    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'sales@port24.tech'
    const toEmail = process.env.CONTACT_EMAIL || 'sales@port24.tech'

    console.log('Attempting to send email:', {
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
    })

    // Send email using SendGrid
    const msg = {
      to: toEmail,
      from: fromEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #111827;">${escapeHtml(name)}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #374151;">Phone:</strong> <span style="color: #111827;">${phone ? escapeHtml(phone) : 'Not provided'}</span></p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
              <p style="color: #111827; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the contact form on www.port24.tech</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
This email was sent from the contact form on www.port24.tech
      `,
    }

    try {
      await sgMail.send(msg)
      console.log('Email sent successfully via SendGrid')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const errorStack = error instanceof Error ? error.stack : undefined
      
      console.error('SendGrid error details:', {
        message: errorMessage,
        stack: errorStack,
        error: error
      })
      
      if (error && typeof error === 'object' && 'response' in error) {
        const sendGridError = error as { 
          response?: { 
            body?: unknown
            statusCode?: number
            headers?: unknown
          } 
        }
        console.error('SendGrid response:', {
          statusCode: sendGridError.response?.statusCode,
          body: sendGridError.response?.body,
          headers: sendGridError.response?.headers
        })
      }
      
      // Check for specific SendGrid errors
      if (error && typeof error === 'object' && 'response' in error) {
        const sendGridError = error as { 
          response?: { 
            statusCode?: number
            body?: unknown
          } 
        }
        if (sendGridError.response?.statusCode === 401) {
          console.error('SendGrid authentication failed - check API key')
          return NextResponse.json(
            { 
              error: 'Email service authentication failed. Please contact support.',
              diagnostic: process.env.NODE_ENV === 'development' ? {
                statusCode: 401,
                issue: 'SendGrid API key authentication failed'
              } : undefined
            },
            { status: 500 }
          )
        }
        if (sendGridError.response?.statusCode === 403) {
          console.error('SendGrid authorization failed - check API key permissions')
          return NextResponse.json(
            { 
              error: 'Email service authorization failed. Please contact support.',
              diagnostic: process.env.NODE_ENV === 'development' ? {
                statusCode: 403,
                issue: 'SendGrid API key lacks required permissions'
              } : undefined
            },
            { status: 500 }
          )
        }
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to send message. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
          diagnostic: process.env.NODE_ENV === 'development' ? {
            errorType: error instanceof Error ? error.constructor.name : typeof error,
            message: errorMessage
          } : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Thank you! Your message has been sent successfully.' },
      { status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    console.error('Error processing contact form:', {
      message: errorMessage,
      stack: errorStack,
      error: error,
      timestamp: new Date().toISOString()
    })
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

