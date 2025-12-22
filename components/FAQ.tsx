'use client'

import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import StructuredData from './StructuredData'
import { getFAQSchema } from '@/lib/seo'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What services does PORT24 Technologies offer?',
      answer: 'PORT24 Technologies offers comprehensive IT consulting and software development services including custom software development, web development, mobile app development (iOS and Android), digital marketing, graphic design, database solutions, cloud services, and strategic IT consulting. We serve clients across Canada and the United States.',
    },
    {
      question: 'Where is PORT24 Technologies located?',
      answer: 'PORT24 Technologies is based in London, Ontario, Canada. We serve clients globally, with a strong presence in Canada and the United States. Our team works remotely and on-site to deliver exceptional IT solutions.',
    },
    {
      question: 'How many years of experience does PORT24 Technologies have?',
      answer: 'PORT24 Technologies has over 24 years of combined industry experience. Our team brings extensive expertise in software development, web technologies, mobile applications, and IT consulting to every project.',
    },
    {
      question: 'What industries does PORT24 Technologies serve?',
      answer: 'We serve a diverse range of industries including healthcare, finance, retail, manufacturing, education, technology startups, and more. Our solutions are tailored to meet the specific needs of each industry and business.',
    },
    {
      question: 'How do I get started with PORT24 Technologies?',
      answer: 'Getting started is easy! Simply contact us through our website contact form, email us at sales@port24.tech, or call us at +1 (519) 701-1517. We offer a free consultation to discuss your project requirements and how we can help achieve your business goals.',
    },
    {
      question: 'Does PORT24 Technologies provide ongoing support and maintenance?',
      answer: 'Yes, we provide comprehensive ongoing support and maintenance services for all our software solutions. This includes bug fixes, updates, security patches, performance optimization, and technical support to ensure your systems run smoothly.',
    },
    {
      question: 'What is the typical project timeline?',
      answer: 'Project timelines vary depending on the scope and complexity of your project. Simple websites may take 2-4 weeks, while complex enterprise software solutions may take 3-6 months or longer. We provide detailed project timelines during our initial consultation.',
    },
    {
      question: 'Does PORT24 Technologies work with startups?',
      answer: 'Absolutely! We work with businesses of all sizes, from startups to large enterprises. We understand the unique challenges startups face and offer flexible solutions, competitive pricing, and scalable technology solutions that grow with your business.',
    },
    {
      question: 'What technologies does PORT24 Technologies use?',
      answer: 'We use modern, industry-standard technologies and frameworks. Our tech stack includes React, Next.js, Node.js, Python, Java, .NET, React Native, Flutter, AWS, Azure, Google Cloud, and various databases. We choose the best technology stack based on your specific project requirements.',
    },
    {
      question: 'Can PORT24 Technologies help with digital marketing and SEO?',
      answer: 'Yes! We offer comprehensive digital marketing services including SEO (Search Engine Optimization), SEM (Search Engine Marketing), social media marketing, content marketing, and online advertising. We help businesses improve their online visibility and drive qualified leads.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqSchema = getFAQSchema(faqs)

  return (
    <>
      <StructuredData data={faqSchema} />
      <section
        id="faq"
        className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-16 h-16 text-primary-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-primary-600">Questions</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services and how we can help your business
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-inset"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default FAQ

