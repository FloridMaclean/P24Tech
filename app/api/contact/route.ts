import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7)
  const timestamp = new Date().toISOString()
  
  console.log(`\n📧 ===== CONTACT FORM API REQUEST [${requestId}] =====`)
  console.log('⏰ Timestamp:', timestamp)
  console.log('🌐 Request URL:', request.url)
  console.log('📋 Request Method:', request.method)
  console.log('🔗 Request Headers:', Object.fromEntries(request.headers.entries()))

  try {
    // Parse request body with error handling
    let body
    try {
      body = await request.json()
      console.log('✅ Parsed Request Body:', {
        name: body.name,
        email: body.email,
        phone: body.phone || 'Not provided',
        messageLength: body.message?.length || 0
      })
    } catch (parseError) {
      console.error('❌ ===== REQUEST BODY PARSING ERROR =====')
      console.error('Failed to parse request body:', parseError)
      console.error('Error Type:', parseError instanceof Error ? parseError.constructor.name : typeof parseError)
      console.error('Error Details:', parseError instanceof Error ? parseError.stack : String(parseError))
      
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: {
            issue: 'Could not parse JSON from request body',
            errorType: parseError instanceof Error ? parseError.constructor.name : typeof parseError,
            errorMessage: parseError instanceof Error ? parseError.message : String(parseError)
          },
          requestId
        },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = body

    // Validate required fields
    console.log('🔍 Validating required fields...')
    const fieldValidation = {
      name: !!name && name.trim().length > 0,
      email: !!email && email.trim().length > 0,
      message: !!message && message.trim().length > 0
    }
    console.log('✅ Field Validation Results:', fieldValidation)

    if (!fieldValidation.name || !fieldValidation.email || !fieldValidation.message) {
      console.error('❌ Validation Failed: Missing required fields')
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: fieldValidation,
          requestId
        },
        { status: 400 }
      )
    }

    // Validate email format
    console.log('🔍 Validating email format...')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(email)
    console.log('✅ Email Validation:', { email, isValid: isEmailValid })

    if (!isEmailValid) {
      console.error('❌ Validation Failed: Invalid email format')
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          details: { email, isValid: false },
          requestId
        },
        { status: 400 }
      )
    }

    // Check if SendGrid API key is configured
    console.log('🔍 Checking SendGrid API key configuration...')
    const sendGridApiKey = process.env.SENDGRID_API_KEY?.trim()
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    const envCheck = {
      hasKey: !!process.env.SENDGRID_API_KEY,
      keyExists: !!sendGridApiKey,
      keyLength: sendGridApiKey?.length || 0,
      keyPrefix: sendGridApiKey?.substring(0, 5) || 'N/A',
      nodeEnv: process.env.NODE_ENV,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'sales@port24.tech (default)',
      contactEmail: process.env.CONTACT_EMAIL || 'sales@port24.tech (default)'
    }
    console.log('📊 Environment Check:', envCheck)
    
    if (!sendGridApiKey || sendGridApiKey.length === 0) {
      console.error('❌ ===== SENDGRID API KEY NOT CONFIGURED =====')
      console.error('Environment Check:', envCheck)
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please contact support.',
          details: {
            ...envCheck,
            issue: 'SENDGRID_API_KEY environment variable is missing or empty',
            hint: 'Please verify the environment variable is set correctly in your hosting platform'
          },
          requestId
        },
        { status: 500 }
      )
    }

    // Validate SendGrid API key format (should start with SG.)
    console.log('🔍 Validating SendGrid API key format...')
    const keyFormatCheck = {
      startsWithSG: sendGridApiKey.startsWith('SG.'),
      prefix: sendGridApiKey.substring(0, 3),
      keyLength: sendGridApiKey.length
    }
    console.log('✅ API Key Format Check:', keyFormatCheck)

    if (!keyFormatCheck.startsWithSG) {
      console.error('❌ ===== INVALID SENDGRID API KEY FORMAT =====')
      console.error('Key Format Check:', keyFormatCheck)
      return NextResponse.json(
        { 
          error: 'Email service configuration error. Please contact support.',
          details: {
            ...keyFormatCheck,
            issue: 'SendGrid API key should start with "SG."',
            hint: 'Please verify your API key format in SendGrid dashboard'
          },
          requestId
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
    console.log('🔧 Initializing SendGrid...')
    try {
      sgMail.setApiKey(sendGridApiKey)
      console.log('✅ SendGrid initialized successfully')
    } catch (sgInitError) {
      console.error('❌ ===== SENDGRID INITIALIZATION ERROR =====')
      console.error('Initialization Error:', sgInitError)
      console.error('Error Type:', sgInitError instanceof Error ? sgInitError.constructor.name : typeof sgInitError)
      console.error('Error Details:', sgInitError instanceof Error ? sgInitError.stack : String(sgInitError))
      return NextResponse.json(
        { 
          error: 'Email service initialization failed. Please contact support.',
          details: {
            errorType: sgInitError instanceof Error ? sgInitError.constructor.name : typeof sgInitError,
            errorMessage: sgInitError instanceof Error ? sgInitError.message : 'Unknown initialization error',
            stack: sgInitError instanceof Error ? sgInitError.stack : undefined,
            hint: 'This might indicate an issue with the SendGrid module or API key format'
          },
          requestId
        },
        { status: 500 }
      )
    }

    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'sales@port24.tech'
    const toEmail = process.env.CONTACT_EMAIL || 'sales@port24.tech'
    
    console.log('📧 Email Configuration:', {
      from: fromEmail,
      to: toEmail,
      replyTo: email
    })

    // Send email using SendGrid
    console.log('📨 Preparing email message...')
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

    console.log('🚀 Sending email via SendGrid...')
    try {
      const sendStartTime = Date.now()
      await sgMail.send(msg)
      const sendDuration = Date.now() - sendStartTime
      console.log(`✅ Email sent successfully in ${sendDuration}ms`)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      const errorStack = error instanceof Error ? error.stack : undefined
      
      console.error('❌ ===== SENDGRID EMAIL SEND ERROR =====')
      console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error)
      console.error('Error Message:', errorMessage)
      console.error('Error Stack:', errorStack)
      console.error('Full Error Object:', error)
      
      // Check for specific SendGrid errors
      if (error && typeof error === 'object' && 'response' in error) {
        const sendGridError = error as { 
          response?: { 
            statusCode?: number
            body?: unknown
            headers?: unknown
          } 
        }
        
        const statusCode = sendGridError.response?.statusCode
        const responseBody = sendGridError.response?.body
        
        console.error('SendGrid Response Details:', {
          statusCode,
          body: responseBody,
          headers: sendGridError.response?.headers
        })
        
        if (statusCode === 401) {
          console.error('🔐 Authentication Failed (401)')
          return NextResponse.json(
            { 
              error: 'Email service authentication failed. Please contact support.',
              details: {
                statusCode: 401,
                issue: 'SendGrid API key authentication failed',
                hint: 'Please verify your API key is correct and active in SendGrid dashboard',
                responseBody
              },
              requestId
            },
            { status: 500 }
          )
        }
        
        if (statusCode === 403) {
          console.error('🚫 Authorization Failed (403)')
          return NextResponse.json(
            { 
              error: 'Email service authorization failed. Please contact support.',
              details: {
                statusCode: 403,
                issue: 'SendGrid API key lacks required permissions',
                hint: 'Please verify API key has "Mail Send" permissions in SendGrid',
                responseBody
              },
              requestId
            },
            { status: 500 }
          )
        }
        
        if (statusCode === 400) {
          console.error('❌ Bad Request (400)')
          return NextResponse.json(
            { 
              error: 'Invalid email request. Please contact support.',
              details: {
                statusCode: 400,
                issue: 'SendGrid rejected the email request',
                hint: 'Check from/to email addresses are valid',
                responseBody,
                emailConfig: { from: fromEmail, to: toEmail, replyTo: email }
              },
              requestId
            },
            { status: 500 }
          )
        }
        
        // Return generic error with details for other status codes
        console.error(`⚠️ Unexpected SendGrid Status Code: ${statusCode}`)
        return NextResponse.json(
          { 
            error: 'Failed to send message. Please try again later.',
            details: {
              statusCode,
              message: errorMessage,
              responseBody,
              hint: 'Unexpected error from SendGrid API'
            },
            requestId
          },
          { status: 500 }
        )
      }
      
      // Handle non-SendGrid errors (network, etc.)
      console.error('⚠️ Non-SendGrid Error (Network/Module Issue)')
      return NextResponse.json(
        { 
          error: 'Failed to send message. Please try again later.',
          details: {
            errorType: error instanceof Error ? error.constructor.name : typeof error,
            errorMessage,
            errorStack,
            hint: 'This might be a network issue or SendGrid module problem'
          },
          requestId
        },
        { status: 500 }
      )
    }

    console.log('✅ ===== CONTACT FORM PROCESSED SUCCESSFULLY =====')
    console.log(`Request ID: ${requestId}`)
    console.log('Timestamp:', new Date().toISOString())
    
    return NextResponse.json(
      { 
        message: 'Thank you! Your message has been sent successfully.',
        requestId
      },
      { status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    console.error(`\n❌ ===== UNEXPECTED ERROR PROCESSING CONTACT FORM [${requestId}] =====`)
    console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error Message:', errorMessage)
    console.error('Error Stack:', errorStack)
    console.error('Full Error Object:', error)
    console.error('Timestamp:', new Date().toISOString())
    console.error('Node Environment:', process.env.NODE_ENV)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      console.error('🔍 SyntaxError Detected: JSON parsing issue')
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: {
            issue: 'Could not parse the request body as JSON',
            errorType: 'SyntaxError',
            errorMessage
          },
          requestId
        },
        { status: 400 }
      )
    }
    
    // Handle type errors (e.g., missing module)
    if (error instanceof TypeError) {
      console.error('🔍 TypeError Detected: Possible module/dependency issue')
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          details: {
            errorType: 'TypeError',
            errorMessage,
            errorStack,
            hint: 'This may indicate a missing dependency or module import issue',
            check: 'Verify @sendgrid/mail is installed: npm list @sendgrid/mail'
          },
          requestId
        },
        { status: 500 }
      )
    }
    
    // Handle reference errors
    if (error instanceof ReferenceError) {
      console.error('🔍 ReferenceError Detected: Possible undefined variable')
      return NextResponse.json(
        { 
          error: 'Server configuration error. Please contact support.',
          details: {
            errorType: 'ReferenceError',
            errorMessage,
            errorStack,
            hint: 'A variable or function is being used before it is defined'
          },
          requestId
        },
        { status: 500 }
      )
    }
    
    console.error('⚠️ Generic Unexpected Error')
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: {
          errorType: error instanceof Error ? error.constructor.name : typeof error,
          errorMessage,
          errorStack,
          hint: 'An unexpected server error occurred. Check server logs for more details.'
        },
        requestId
      },
      { status: 500 }
    )
  }
}


