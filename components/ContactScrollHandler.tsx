'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Component that handles URL updates when scrolling to the contact section on the homepage
 * Updates the URL to /contact when the contact section is in view
 */
export default function ContactScrollHandler() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    if (!isHomePage) return

    let timeoutId: NodeJS.Timeout | null = null
    let isUpdating = false

    const handleScroll = () => {
      // Prevent multiple simultaneous updates
      if (isUpdating) return

      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // Debounce the scroll handler
      timeoutId = setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (!contactSection) return

        const rect = contactSection.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        
        // Check if contact section is in view (at least 50% visible)
        const isInView = rect.top < windowHeight * 0.5 && rect.bottom > 0
        const currentPath = window.location.pathname

        if (isInView && currentPath === '/') {
          isUpdating = true
          // Update URL to /contact without scrolling or page reload
          window.history.replaceState(null, '', '/contact')
          isUpdating = false
        } else if (!isInView && currentPath === '/contact') {
          isUpdating = true
          // If scrolled away from contact section and URL is /contact, revert to /
          window.history.replaceState(null, '', '/')
          isUpdating = false
        }
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check on mount in case page loads with contact section in view
    // Use a small delay to ensure DOM is ready
    const checkOnMount = setTimeout(() => {
      handleScroll()
    }, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (checkOnMount) {
        clearTimeout(checkOnMount)
      }
    }
  }, [isHomePage])

  return null
}

