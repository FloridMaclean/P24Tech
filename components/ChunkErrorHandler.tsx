'use client'

import { useEffect, useState } from 'react'

/**
 * Handles chunk loading errors and provides user feedback
 * This component should be added to the root layout
 */
export default function ChunkErrorHandler() {
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 3

  useEffect(() => {
    // Track chunk errors to prevent infinite loops
    const chunkErrors = new Set<string>()
    let retryTimeout: NodeJS.Timeout | null = null

    // Handle chunk loading errors
    const handleChunkError = (event: ErrorEvent) => {
      const error = event.error
      
      // Check if it's a chunk loading error
      if (
        error?.message?.includes('ChunkLoadError') ||
        error?.message?.includes('Loading chunk') ||
        error?.name === 'ChunkLoadError' ||
        error?.message?.includes('Failed to fetch dynamically imported module')
      ) {
        const errorKey = error.message || 'unknown'
        
        // Prevent duplicate handling
        if (chunkErrors.has(errorKey)) {
          return
        }
        chunkErrors.add(errorKey)

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
          retryCount,
        })

        // Auto-retry with exponential backoff
        if (retryCount < MAX_RETRIES) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000)
          console.log(`🔄 Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`)
          
          retryTimeout = setTimeout(() => {
            setRetryCount(prev => prev + 1)
            // Force a hard reload to clear cache
            if ('caches' in window) {
              caches.keys().then(names => {
                names.forEach(name => caches.delete(name))
              })
            }
            window.location.reload()
          }, delay)
        } else {
          // After max retries, show user-friendly message
          console.error('❌ Max retries reached. Manual reload required.')
          const shouldReload = confirm(
            'The application encountered an error loading resources. This may be due to a recent update. Would you like to reload the page?'
          )
          
          if (shouldReload) {
            // Clear all caches and reload
            if ('caches' in window) {
              caches.keys().then(names => {
                names.forEach(name => caches.delete(name))
              })
            }
            // Force reload bypassing cache
            window.location.href = window.location.href
          }
        }
      }
    }

    // Handle unhandled promise rejections (chunk errors often show up here)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      
      if (
        reason?.message?.includes('ChunkLoadError') ||
        reason?.message?.includes('Loading chunk') ||
        reason?.name === 'ChunkLoadError' ||
        reason?.message?.includes('Failed to fetch dynamically imported module') ||
        reason?.message?.includes('ERR_ABORTED') ||
        reason?.message?.includes('ERR_FILE_NOT_FOUND')
      ) {
        const errorKey = reason.message || 'unknown'
        
        if (chunkErrors.has(errorKey)) {
          return
        }
        chunkErrors.add(errorKey)

        console.error('🚨 Chunk Loading Error (Promise Rejection):', {
          error: reason.message,
          stack: reason.stack,
          timestamp: new Date().toISOString(),
        })

        // Auto-retry for promise rejections too
        if (retryCount < MAX_RETRIES) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000)
          retryTimeout = setTimeout(() => {
            setRetryCount(prev => prev + 1)
            if ('caches' in window) {
              caches.keys().then(names => {
                names.forEach(name => caches.delete(name))
              })
            }
            window.location.reload()
          }, delay)
        }
      }
    }

    // Listen for errors
    window.addEventListener('error', handleChunkError, true) // Use capture phase
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
      window.removeEventListener('error', handleChunkError, true)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [retryCount])

  return null
}

