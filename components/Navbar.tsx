'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: isHomePage ? '#home' : '/' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Services', href: isHomePage ? '#services' : '/#services' },
    { name: 'Testimonials', href: isHomePage ? '#testimonials' : '/#testimonials' },
    { name: 'Contact', href: '/contact' },
  ]

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e?.preventDefault()
      const elementId = href.replace('#', '')
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else if (href.startsWith('/#')) {
      // Navigate to homepage and then scroll
      window.location.href = href
    }
    // For regular routes like /contact, let Next.js Link handle it
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            {isHomePage ? (
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick('#home')
                }}
                className="text-2xl md:text-3xl font-bold flex items-center gap-1 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
                  PORT
                </span>
                <motion.span
                  className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 bg-clip-text text-transparent relative"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  24
                </motion.span>
                <span className="text-gray-600 font-semibold ml-1 group-hover:text-primary-600 transition-colors">
                  Tech
                </span>
              </motion.a>
            ) : (
              <Link href="/">
                <motion.div
                  className="text-2xl md:text-3xl font-bold flex items-center gap-1 group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
                    PORT
                  </span>
                  <motion.span
                    className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 bg-clip-text text-transparent relative"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    24
                  </motion.span>
                  <span className="text-gray-600 font-semibold ml-1 group-hover:text-primary-600 transition-colors">
                    Tech
                  </span>
                </motion.div>
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navItems.map((item) => {
              if (item.href.startsWith('#')) {
                return (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </button>
                )
              } else {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              }
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                if (item.href.startsWith('#')) {
                  return (
                    <button
                      key={item.name}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
                    >
                      {item.name}
                    </button>
                  )
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

