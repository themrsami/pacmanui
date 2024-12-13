'use client'

import { motion } from 'framer-motion'
import { Github, Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
      <footer className="max-w-7xl w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
            Built with{' '}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                color: ['#ef4444', '#ec4899', '#ef4444'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-flex items-center"
            >
              <Heart className="w-4 h-4 mx-1" />
            </motion.span>
            {' '}by the PacmanUI team
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <motion.a
              href="https://github.com/pacmanui/pacmanui"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-500 hover:text-primary transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  )
}
