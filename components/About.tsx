'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Award, Target } from 'lucide-react'

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  }

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-white"
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
            About <span className="text-primary-600">PORT24 Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.article {...fadeInUp}>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Your Trusted IT Partner
            </h3>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              PORT24 Technologies, your premier destination for comprehensive IT
              consulting and software development services located in the Forest
              City - London, ON. As a dynamic and innovative team of experts,
              we are dedicated to providing cutting-edge solutions to meet your
              digital needs.
            </p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              With a relentless commitment to excellence, we have established
              ourselves as a leading force in the industry, offering a wide range
              of services including software development, web development, mobile
              app development, digital marketing, graphic design, and more.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Based in London, ON, Canada, we proudly serve clients globally,
              bringing our expertise and passion for technology to businesses
              of all sizes.
            </p>
          </motion.article>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <article className="bg-primary-50 rounded-lg p-6 text-center">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" aria-hidden="true" />
              <div className="text-4xl font-bold text-gray-900 mb-2">24+</div>
              <div className="text-gray-600 font-medium">
                Years Combined Experience
              </div>
            </article>
            <article className="bg-primary-50 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" aria-hidden="true" />
              <div className="text-4xl font-bold text-gray-900 mb-2">70+</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </article>
            <article className="bg-primary-50 rounded-lg p-6 text-center col-span-2">
              <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" aria-hidden="true" />
              <div className="text-xl font-bold text-gray-900 mb-2">
                London, ON, Canada
              </div>
              <div className="text-gray-600 font-medium">
                Serving Globally
              </div>
            </article>
          </motion.div>
        </div>

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="flex items-center justify-center mb-6">
            <Target className="w-16 h-16" />
          </div>
          <h3 className="text-3xl font-bold text-center mb-6">
            Our Mission
          </h3>
          <p className="text-xl text-center max-w-4xl mx-auto leading-relaxed">
            To empower businesses with innovative technology solutions that drive
            growth, efficiency, and success. We combine our extensive industry
            experience with cutting-edge technologies to deliver results that
            exceed expectations.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About

