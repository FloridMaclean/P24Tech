import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - PORT24 Technologies Inc.',
  description: 'Privacy Policy for PORT24 Technologies Inc. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                At <strong>PORT24 Technologies Inc.</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                website <a href="https://www.port24.tech" className="text-primary-600 hover:text-primary-700">www.port24.tech</a> 
                and use our services.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary-600" />
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.1 Information You Provide to Us</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li>Fill out our contact form (name, email address, phone number, and message)</li>
                <li>Communicate with us via email or phone</li>
                <li>Request information about our services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages you visit and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Date and time of your visit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary-600" />
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you information about our services (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage and trends</li>
                <li>Comply with legal obligations</li>
                <li>Protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-600" />
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as email delivery services (SendGrid) and website hosting providers.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
                or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your experience. You can set your browser 
                to refuse cookies or alert you when cookies are being sent. However, some parts of our website may not function 
                properly if you disable cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-700 mb-4 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information 
                from children under 13. If you believe we have collected information from a child under 13, please contact us 
                immediately, and we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content 
                of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically 
                for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary-600" />
                10. Contact Us
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-primary-50 rounded-lg p-6 mt-4">
                <p className="text-gray-800 font-semibold mb-2">PORT24 Technologies Inc.</p>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <a href="mailto:sales@port24.tech" className="hover:text-primary-600">
                      sales@port24.tech
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <a href="tel:+15197011517" className="hover:text-primary-600">
                      +1 (519) 701-1517
                    </a>
                  </p>
                  <p className="mt-2">
                    London, ON, Canada
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

