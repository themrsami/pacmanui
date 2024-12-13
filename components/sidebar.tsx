'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Search, ChevronDown } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isComponentsExpanded, setIsComponentsExpanded] = useState(true)

  const navigation = [
    { name: 'Installation', href: '/installation' },
    { 
      name: 'Components',
      href: '/components',
      children: [
        { name: 'Accordion', href: '/components/accordion' },
        { name: 'Date Picker', href: '/components/date-picker' },
        { name: 'Modal', href: '/components/modal' },
        { name: 'Select', href: '/components/select' },
        { name: 'Toast', href: '/components/toast' },
        { name: 'Button' , href: '/components/button' }
      ]
    }
  ]

  const filteredNavigation = navigation.map(item => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter(child =>
          child.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    }
    return item
  })

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : -256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed z-50 left-2 top-20 flex"
    >
      <div className="w-64 h-[84vh] py-6 px-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {filteredNavigation.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-bold ${
                      pathname === item.href
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setIsComponentsExpanded(!isComponentsExpanded)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
                    >
                      <motion.div
                        animate={{ rotate: isComponentsExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </motion.div>
                    </button>
                  )}
                </div>
                {item.children && (
                  <motion.div
                    initial={false}
                    animate={{
                      height: isComponentsExpanded ? "auto" : 0,
                      opacity: isComponentsExpanded ? 1 : 0
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut"
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2 rounded-md text-sm ${
                            pathname === child.href
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Toggle Button */}
      <motion.button
        className="h-8 w-8 absolute -right-4 top-8 flex items-center justify-center bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 0 : 180 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </motion.button>
    </motion.div>
  )
}
