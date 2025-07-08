'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Compass, 
  ShoppingCart,
  User,
  Store,
  Menu,
  X
} from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
            CorePath Impact
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            About
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            Products
          </Link>
          <Link href="/training" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            Training
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            Blog
          </Link>
          <Link href="/partnerships" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            Partners
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            Contact
          </Link>
        </div>

        {/* Desktop E-commerce Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          <Link href="/merchant" className="flex items-center text-gray-600 hover:text-blue-600 text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200">
            <Store className="w-4 h-4 mr-1" />
            <span className="hidden xl:inline">Merchant</span>
          </Link>
          
          <Link href="/cart" className="flex items-center text-gray-600 hover:text-blue-600 text-sm px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200 relative">
            <ShoppingCart className="w-4 h-4 mr-1" />
            <span className="hidden xl:inline">Cart</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              3
            </span>
          </Link>
          
          <Link href="/login" className="flex items-center bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200">
            <User className="w-4 h-4 mr-1" />
            <span className="hidden xl:inline">Account</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {/* Main Navigation */}
            <Link 
              href="/" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/products" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/training" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Training
            </Link>
            <Link 
              href="/blog" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/partnerships" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Partnerships
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile E-commerce Actions */}
            <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
              <Link 
                href="/merchant" 
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Store className="w-4 h-4 mr-3" />
                Merchant Portal
              </Link>
              
              <Link 
                href="/cart" 
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4 mr-3" />
                Shopping Cart
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              
              <Link 
                href="/login" 
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-3" />
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar