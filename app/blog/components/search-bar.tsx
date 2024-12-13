'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md focus:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      
      {/* Search background glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-20" />
    </motion.div>
  )
}
