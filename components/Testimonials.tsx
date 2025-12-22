'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc.',
      role: 'CEO',
      content:
        'PORT24 Technologies transformed our digital infrastructure. Their expertise and professionalism exceeded our expectations. Highly recommended!',
      rating: 5,
      initials: 'SJ',
    },
    {
      name: 'Marshall Moses',
      company: 'Kalyana Wellness Retreat',
      role: 'CEO',
      content:
        'Working with PORT24 has been a game-changer. They delivered our mobile app on time and within budget. The quality is outstanding.',
      rating: 5,
      initials: 'MM',
    },
    {
      name: 'Lee Chang',
      company: 'TFL Learning Solutions',
      role: 'Marketing Director',
      content:
        'Their digital marketing strategies have significantly increased our online presence. The team is responsive, creative, and results-driven.',
      rating: 5,
      initials: 'LC',
    },
    {
      name: 'Sneha Vaghela',
      company: 'Caleb Creations',
      role: 'Founder',
      content:
        'PORT24 provided exceptional IT consulting services. Their insights helped us optimize our processes and improve efficiency across the board.',
      rating: 5,
      initials: 'SV',
    },
    {
      name: 'Lisa Anderson',
      company: 'Startup Ventures',
      role: 'Founder',
      content:
        'As a startup, we needed a reliable tech partner. PORT24 delivered beyond our expectations. They understand both technology and business needs.',
      rating: 5,
      initials: 'LA',
    },
    {
      name: 'Robert Williams',
      company: 'Manufacturing Plus',
      role: 'IT Director',
      content:
        'The cloud migration project was executed flawlessly. PORT24\'s team is knowledgeable, professional, and truly cares about client success.',
      rating: 5,
      initials: 'RW',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - itemsPerView < 0 ? Math.max(0, testimonials.length - itemsPerView) : prev - itemsPerView))
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary-600 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Trusted by Industry Leaders
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-primary-600">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what businesses like yours have to say about working with PORT24 Technologies.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-8 mb-8"
            itemScope
            itemType="https://schema.org/Review"
          >
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 relative group"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-primary-600" aria-hidden="true" />
                </div>

                {/* Avatar */}
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex mb-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                      <meta itemProp="bestRating" content="5" />
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <blockquote 
                  className="text-gray-700 mb-6 leading-relaxed text-base relative z-10" 
                  itemProp="reviewBody"
                >
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className="border-t border-gray-100 pt-6" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="font-bold text-gray-900 text-lg" itemProp="name">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {testimonial.role} at <span itemProp="worksFor" className="font-medium">{testimonial.company}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Mobile/Tablet Carousel View */}
        <div className="lg:hidden relative">
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                itemScope
                itemType="https://schema.org/Review"
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.article
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                        {testimonial.initials}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex mb-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                          <meta itemProp="bestRating" content="5" />
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-yellow-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 mb-4 leading-relaxed text-sm" itemProp="reviewBody">
                      &quot;{testimonial.content}&quot;
                    </blockquote>
                    <div className="border-t border-gray-100 pt-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="font-bold text-gray-900" itemProp="name">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {testimonial.role} at <span itemProp="worksFor" className="font-medium">{testimonial.company}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          {testimonials.length > itemsPerView && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-200"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-200"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

