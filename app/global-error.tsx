'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Application Error:', error)
  }, [error])

  return (
    <html lang="en-CA">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Application Error
            </h1>
            
            <p className="text-gray-600 mb-6">
              A critical error occurred. Please refresh the page or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                <p className="text-sm font-mono text-red-600 break-words">
                  {error.message}
                </p>
              </div>
            )}

            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

