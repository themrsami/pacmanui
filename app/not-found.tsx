'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="relative mb-8"
        >
          <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute -inset-x-10 top-1/2 -z-10 h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl" />
        </motion.div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve mistyped the URL or the page has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-primary/90 to-primary 
              text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 
              transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 
              transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>

          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span>View Components</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute -top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -bottom-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  )
}
