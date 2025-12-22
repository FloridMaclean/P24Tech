import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
      console.error('SendGrid error details:', JSON.stringify(error, null, 2))
      if (error && typeof error === 'object' && 'response' in error) {
        const sendGridError = error as { response?: { body?: unknown } }
        console.error('SendGrid response body:', sendGridError.response?.body)
      }
      return NextResponse.json(
        { 
          error: 'Failed to send message. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Thank you! Your message has been sent successfully.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

