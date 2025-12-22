'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Database,
  Cloud,
  Shield,
} from 'lucide-react'
import StructuredData from './StructuredData'
import { getServiceSchema } from '@/lib/seo'

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description:
        'Custom software solutions tailored to your business needs. From enterprise applications to specialized tools, we build robust and scalable software.',
    },
    {
      icon: Globe,
      title: 'Web Development',
      description:
        'Modern, responsive websites and web applications that deliver exceptional user experiences and drive business results.',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description:
        'Native and cross-platform mobile applications for iOS and Android that engage users and enhance your digital presence.',
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description:
        'Comprehensive digital marketing strategies including SEO, SEM, social media marketing, and content marketing to grow your online presence.',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description:
        'Creative and professional graphic design services including branding, logo design, marketing materials, and UI/UX design.',
    },
    {
      icon: Database,
      title: 'Database Solutions',
      description:
        'Database design, optimization, and management services to ensure your data is organized, secure, and accessible.',
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      description:
        'Cloud migration, infrastructure setup, and management services to help you leverage the power of cloud computing.',
    },
    {
      icon: Shield,
      title: 'IT Consulting',
      description:
        'Strategic IT consulting to help you make informed technology decisions, optimize processes, and achieve your business goals.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Generate structured data for all services
  const servicesStructuredData = services.map((service) =>
    getServiceSchema(service.title, service.description)
  )

  return (
    <>
      <StructuredData data={servicesStructuredData} />
      <section
        id="services"
        className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50"
        itemScope
        itemType="https://schema.org/Service"
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
              Our <span className="text-primary-600">Services</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.article
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                    <Icon className="w-8 h-8 text-primary-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" itemProp="description">
                    {service.description}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services

