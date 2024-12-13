'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Github, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SearchModal } from './search-modal'
import ToggleTheme from '@/app/toggletheme/toggletheme'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Components', href: '/components' },
  { name: 'Installation', href: '/installation' },
  { name: 'Blog', href: '/blog' },
]

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4">
        <nav
          className={`relative flex h-14 items-center justify-between rounded-lg w-full max-w-7xl border
            ${isScrolled 
              ? 'bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 shadow-lg shadow-black/[0.03] backdrop-blur-md' 
              : 'bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 backdrop-blur-sm'
            } 
            transition-all duration-300`}
        >
          <div className="flex items-center gap-4 md:gap-6 px-4">
            <Link 
              href="/" 
              className="text-xl font-semibold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
            >
              PacmanUI
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm transition-colors
                    ${pathname === item.href 
                      ? 'text-gray-900 dark:text-gray-100' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                    }`}
                >
                  {pathname === item.href && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 px-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg min-w-[100px] sm:min-w-[140px]
                text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 
                bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Search</span>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border 
                border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 
                font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400 ml-auto">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            <a
              href="https://github.com/themrsami"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <ToggleTheme />
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 rounded-lg border border-slate-200 dark:border-slate-800 
              bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-lg p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors
                    ${pathname === item.href 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  )
}
