'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ComponentCardProps {
  name: string
  description: string
  path: string
  icon: React.ReactNode
}

export function ComponentCard({ name, description, path, icon }: ComponentCardProps) {
  return (
    <Link
      href={path}
      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            {name}
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-primary/50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all rounded-xl" />
    </Link>
  )
}
