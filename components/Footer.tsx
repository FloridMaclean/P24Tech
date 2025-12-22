'use client'

import { MapPin, Mail, Phone, Linkedin, Globe } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      'Software Development',
      'Web Development',
      'Mobile App Development',
      'Digital Marketing',
      'Graphic Design',
    ],
    company: ['About Us', 'Contact', 'Privacy Policy'],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              PORT24 Technologies Inc.
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your premier destination for comprehensive IT consulting and
              software development services.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">London, ON, Canada</p>
                  <p className="text-sm text-gray-500">
                    Serving Globally
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:sales@port24.tech"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  sales@port24.tech
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+15197011517"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  +1 (519) 701-1517
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="https://www.port24.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  www.port24.tech
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('services')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => {
                const id = link.toLowerCase().replace(' ', '-')
                const isPrivacyPolicy = link === 'Privacy Policy'
                
                return (
                  <li key={index}>
                    {isPrivacyPolicy ? (
                      <a
                        href="/privacy"
                        className="text-sm hover:text-primary-400 transition-colors"
                      >
                        {link}
                      </a>
                    ) : (
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          if (id === 'about-us') {
                            const element = document.getElementById('about')
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          } else if (id === 'contact') {
                            const element = document.getElementById('contact')
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          }
                        }}
                        className="text-sm hover:text-primary-400 transition-colors"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/port24-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              © {currentYear} PORT24 Technologies Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

