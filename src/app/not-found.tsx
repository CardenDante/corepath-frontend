"use client"
import React from 'react'
import Link from 'next/link'
import { Compass, ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <>
      <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 px-6 pt-6 sm:pt-10 lg:px-8">
          <Link href="/" className="flex items-center">
            <span className="sr-only">CorePath Impact</span>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CorePath Impact</span>
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex flex-col justify-center px-6 py-24 sm:px-12 lg:px-16 xl:px-20">
          <div className="max-w-xl">
            <p className="text-base font-semibold text-blue-600">404</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">
              Sorry, we couldn't find the page you're looking for.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link 
                href="/" 
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Go home
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1 inline" />
                Go back
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-16">
            <div className="border-t border-gray-200 pt-8">
              <nav className="flex items-center gap-x-4 text-sm text-gray-600">
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact support
                </Link>
                <svg viewBox="0 0 2 2" aria-hidden="true" className="size-0.5 fill-gray-300">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Background Image - Desktop Only */}
        <div className="hidden lg:block relative">
          <img
            alt="Happy family representing CorePath Impact's mission"
            src="/images/not-found.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/10" />
        </div>
      </div>
    </>
  )
}