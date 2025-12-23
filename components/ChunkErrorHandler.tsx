'use client'

import { useEffect } from 'react'

/**
 * Handles chunk loading errors and provides user feedback
 * This component should be added to the root layout
 */
export default function ChunkErrorHandler() {
  useEffect(() => {
    // Handle chunk loading errors
    const handleChunkError = (event: ErrorEvent) => {
      const error = event.error
      
      // Check if it's a chunk loading error
      if (
        error?.message?.includes('ChunkLoadError') ||
        error?.message?.includes('Loading chunk') ||
        error?.name === 'ChunkLoadError'
      ) {
        console.error('🚨 Chunk Loading Error Detected:', {
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        })
        
        // Log additional diagnostic info
        console.error('📊 Diagnostic Information:', {
          userAgent: navigator.userAgent,
          url: window.location.href,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        })
        
        // Try to reload the page after a short delay
        // This often fixes chunk loading issues caused by stale cache
        const shouldReload = confirm(
          'The application needs to reload to load the latest version. Would you like to reload now?'
        )
        
        if (shouldReload) {
          // Clear cache and reload
          window.location.reload()
        }
      }
    }

    // Handle unhandled promise rejections (chunk errors often show up here)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      
      if (
        reason?.message?.includes('ChunkLoadError') ||
        reason?.message?.includes('Loading chunk') ||
        reason?.name === 'ChunkLoadError'
      ) {
        console.error('🚨 Chunk Loading Error (Promise Rejection):', {
          error: reason.message,
          stack: reason.stack,
          timestamp: new Date().toISOString(),
        })
      }
    }

    // Listen for errors
    window.addEventListener('error', handleChunkError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleChunkError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}

