'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Clock, Award, Heart } from 'lucide-react'

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    {
      icon: TrendingUp,
      value: '70+',
      label: 'Clients Served',
      description: 'Successfully delivered projects',
    },
    {
      icon: Clock,
      value: '24+',
      label: 'Years Experience',
      description: 'Combined industry expertise',
    },
    {
      icon: Award,
      value: '100%',
      label: 'Client Satisfaction',
      description: 'Dedicated to excellence',
    },
    {
      icon: Heart,
      value: '5+',
      label: 'Countries',
      description: 'Serving Globally',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-primary-200">PORT24?</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Proven track record of delivering exceptional results
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.2, type: 'spring' }}
                  className="text-5xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-primary-100 text-sm">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
            With over two decades of combined experience and a portfolio of 70+
            successful projects, PORT24 Technologies stands as a trusted partner
            for businesses seeking innovative IT solutions. Our commitment to
            excellence, client satisfaction, and cutting-edge technology makes
            us the ideal choice for your next project.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats

