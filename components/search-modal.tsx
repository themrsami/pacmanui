'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Command } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const components = [
  { name: 'Accordion', description: 'A vertically stacked set of interactive headings', href: '/components/accordion' },
  { name: 'Button', description: 'Trigger actions or events with a single click', href: '/components/button' },
  { name: 'Card', description: 'Container for related content and actions', href: '/components/card' },
  { name: 'Modal', description: 'Modal window overlaid on the primary window', href: '/components/modal' },
  { name: 'Tabs', description: 'Organize content into separate views', href: '/components/tabs' },
]

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filter components based on search
  const filteredComponents = components.filter((component) =>
    `${component.name} ${component.description}`.toLowerCase().includes(search.toLowerCase())
  )

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((i) => (i + 1) % filteredComponents.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((i) => (i - 1 + filteredComponents.length) % filteredComponents.length)
          break
        case 'Enter':
          e.preventDefault()
          if (filteredComponents[selectedIndex]) {
            window.location.href = filteredComponents[selectedIndex].href
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredComponents, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl mx-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
              {/* Search input */}
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-500">
                  <Command className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search components..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-4 top-2.5 h-7 rounded-md px-2 text-xs font-medium text-slate-400 grid place-items-center">
                  ESC
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-slate-700" />

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto overscroll-contain px-2 pb-2">
                <div className="mt-2 space-y-1 px-2">
                  {filteredComponents.map((component, index) => (
                    <Link
                      key={component.name}
                      href={component.href}
                      onClick={onClose}
                      className={`
                        block rounded-lg px-3 py-2 text-slate-900 dark:text-white transition-colors
                        ${selectedIndex === index ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{component.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {component.description}
                          </div>
                        </div>
                        <div className="ml-4 flex-none text-xs font-semibold text-primary">
                          ⌘K
                        </div>
                      </div>
                    </Link>
                  ))}

                  {filteredComponents.length === 0 && (
                    <div className="px-3 py-8 text-center">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        No components found. Try a different search term.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Pro tip:</span> Use ⌘K to open this modal anywhere
                  </div>
                  <div className="flex items-center gap-2">
                    <span>↑↓</span> to navigate
                    <span>↵</span> to select
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
