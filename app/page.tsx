'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Package, Zap, Palette, Moon, Sparkles, Code } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Component-by-Component',
      description: 'Install only what you need. Our unique CLI makes it easy to add components as your project grows.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with zero unnecessary code. Each component is independently tree-shakeable.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Highly Customizable',
      description: 'Tailwind-based styling with powerful theming system. Customize everything from colors to animations.'
    },
    {
      icon: <Moon className="w-6 h-6" />,
      title: 'Dark Mode Ready',
      description: 'Built-in dark mode support. Every component is carefully designed for both light and dark themes.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Beautiful Animations',
      description: 'Smooth, performant animations powered by Framer Motion. Delight your users with fluid interactions.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'TypeScript First',
      description: 'Full TypeScript support with comprehensive type definitions for the best development experience.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            PacmanUI
          </h1>
          <div className="absolute -inset-x-4 top-0 -z-10 h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
        >
          A beautiful and modular React component library with component-by-component installation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            href="/installation"
            className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-primary/90 to-primary 
              text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 
              transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 
              transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>

          <Link 
            href="/components"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            View Components
          </Link>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
              hover:border-primary/30 dark:hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-24 text-center text-gray-600 dark:text-gray-400"
      >
        <p>Built with ❤️ by the PacmanUI team</p>
      </motion.div>
    </main>
  )
}