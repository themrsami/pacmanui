'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800/50 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="block p-6">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-3 group-hover:to-primary transition-all duration-300">
            {post.title}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center text-primary font-medium">
            Read More
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
