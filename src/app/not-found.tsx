"use client"
import React 
from 'react'
import Link from 'next/link'
import { Compass, ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <>
      <div className="grid min-h-full grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr]">
        {/* Header */}
        <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
          <Link href="/" className="flex items-center">
            <span className="sr-only">CorePath Impact</span>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CorePath Impact</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base font-semibold text-blue-600">404</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl">
              Sorry, we couldn't find the page you're looking for.
            </p>
            
            <div className="mt-10 flex items-center gap-x-6">
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
        </main>

        {/* Footer */}
        <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
          <div className="border-t border-gray-100 bg-gray-50 py-10">
            <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm text-gray-600 lg:px-8">
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
        </footer>

        {/* Background Image */}
        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
          <img
            alt="Happy family representing CorePath Impact's mission"
            src="/images/not-found.jpg"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/10" />
        </div>
      </div>
    </>
  )
}