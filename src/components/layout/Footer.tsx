import React from 'react'
import Link from 'next/link'
import { 
  Compass,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">CorePath Impact</h3>
          </div>
          <p className="mb-4 text-sm">
            Empowering parents through intentional, deliberate, and structured values-driven parenting.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com/corepathimpact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/corepathimpact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/corepathimpact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/partnerships" className="hover:text-white transition-colors duration-200">
                Partnerships
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link href="/training" className="hover:text-white transition-colors duration-200">
                Training
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors duration-200">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white transition-colors duration-200">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <a 
                href="mailto:info@corepathimpact.com"
                className="hover:text-white transition-colors duration-200"
              >
                info@corepathimpact.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <a 
                href="tel:+254720979570"
                className="hover:text-white transition-colors duration-200"
              >
                +254 (720) 979 570
              </a>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 pt-8 border-t border-gray-700">
        <p className="text-sm">&copy; 2025 CorePath Impact. All rights reserved.</p>
      </div>
    </footer>
  )
}