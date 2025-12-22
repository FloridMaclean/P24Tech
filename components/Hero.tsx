'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Globe, Smartphone } from 'lucide-react'

const Hero = () => {
  const handleGetStarted = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <header className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            PORT24{' '}
            <span className="text-primary-600">Technologies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto"
          >
            Your Premier Destination for Comprehensive IT Consulting
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            As a dynamic and innovative team of experts, we are dedicated to
            providing cutting-edge solutions to meet your digital needs. With a
            relentless commitment to excellence, we have established ourselves as
            a leading force in the industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={handleGetStarted}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              Book Free consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('services')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-primary-600"
            >
              Our Services
            </button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            role="region"
            aria-label="Company Statistics"
          >
            <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Code className="w-12 h-12 text-primary-600 mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold text-gray-900">24+</div>
              <div className="text-gray-600">Years Experience</div>
            </article>
            <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold text-gray-900">70+</div>
              <div className="text-gray-600">Satisfied Clients</div>
            </article>
            <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Smartphone className="w-12 h-12 text-primary-600 mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold text-gray-900">5+</div>
              <div className="text-gray-600">Countries Served</div>
            </article>
          </motion.div>
        </header>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default Hero

