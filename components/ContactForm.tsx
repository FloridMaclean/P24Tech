'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const timestamp = new Date().toISOString()
    console.log('📧 ===== CONTACT FORM SUBMISSION STARTED =====')
    console.log('⏰ Timestamp:', timestamp)
    console.log('📝 Form Data:', {
      name: data.name,
      email: data.email,
      phone: data.phone || 'Not provided',
      messageLength: data.message.length,
      messagePreview: data.message.substring(0, 50) + (data.message.length > 50 ? '...' : '')
    })

    try {
      const requestUrl = '/api/contact'
      const requestBody = JSON.stringify(data)
      
      console.log('🌐 Preparing API Request:', {
        url: requestUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        bodySize: requestBody.length,
        bodyPreview: requestBody.substring(0, 200) + (requestBody.length > 200 ? '...' : '')
      })

      const startTime = performance.now()
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })
      const endTime = performance.now()
      const requestDuration = endTime - startTime

      let headersObj = {}
      try {
        headersObj = Object.fromEntries(response.headers.entries())
      } catch (headersError) {
        console.warn('Could not parse response headers:', headersError)
      }
      
      console.log('📥 Response Received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        duration: `${requestDuration.toFixed(2)}ms`,
        headers: headersObj,
        timestamp: new Date().toISOString()
      })

      let responseData
      const responseText = await response.text()
      console.log('📄 Raw Response Text:', responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''))
      
      try {
        responseData = JSON.parse(responseText)
        console.log('✅ Parsed Response Data:', responseData)
      } catch (parseError) {
        console.error('❌ ===== RESPONSE PARSING ERROR =====')
        console.error('Failed to parse response as JSON:', parseError)
        console.error('Raw response text:', responseText)
        console.error('Response status:', response.status)
        try {
          console.error('Response headers:', Object.fromEntries(response.headers.entries()))
        } catch (e) {
          console.error('Could not read response headers')
        }
        console.error('Error details:', {
          name: parseError instanceof Error ? parseError.name : 'Unknown',
          message: parseError instanceof Error ? parseError.message : String(parseError),
          stack: parseError instanceof Error ? parseError.stack : undefined
        })
        throw new Error('Invalid response from server. Please try again.')
      }

      if (!response.ok) {
        console.error('❌ ===== API ERROR RESPONSE =====')
        console.error('Status Code:', response.status)
        console.error('Status Text:', response.statusText)
        console.error('Error Message:', responseData?.error || 'Unknown error')
        console.error('Error Details:', responseData?.details ? JSON.stringify(responseData.details, null, 2) : 'No details available')
        console.error('Full Response:', JSON.stringify(responseData || {}, null, 2))
        console.error('Request Duration:', `${requestDuration.toFixed(2)}ms`)
        
        throw new Error(responseData?.error || 'Failed to send message')
      }
      
      if (!responseData) {
        console.error('❌ No response data received')
        throw new Error('No response from server. Please try again.')
      }

      console.log('✅ ===== FORM SUBMISSION SUCCESSFUL =====')
      console.log('Success Message:', responseData?.message || 'Message sent successfully')
      console.log('Request Duration:', `${requestDuration.toFixed(2)}ms`)
      console.log('Timestamp:', new Date().toISOString())

      setSubmitStatus('success')
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('❌ ===== CONTACT FORM ERROR =====')
      console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error)
      console.error('Error Message:', error instanceof Error ? error.message : String(error))
      console.error('Error Stack:', error instanceof Error ? error.stack : 'No stack trace available')
      console.error('Full Error Object:', error)
      console.error('Timestamp:', new Date().toISOString())
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🔍 Network Error Detected:', {
          hint: 'This might indicate a network connectivity issue or CORS problem',
          url: '/api/contact',
          error: error.message
        })
      }
      
      if (error instanceof Error && error.message.includes('JSON')) {
        console.error('🔍 JSON Parsing Error Detected:', {
          hint: 'The server response might not be valid JSON',
          error: error.message
        })
      }

      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
      console.log('🏁 ===== FORM SUBMISSION PROCESS COMPLETED =====')
    }
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-primary-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Let&apos;s discuss how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We&apos;re here to help! Reach out to us through any of the following channels, and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">London, ON, Canada</p>
                  <p className="text-gray-600">Serving Globally</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a
                    href="mailto:sales@port24.tech"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    sales@port24.tech
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-100 rounded-lg p-3">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <a
                    href="tel:+15197011517"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    +1 (519) 701-1517
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="+1 (519) 701-1517"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again later.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

