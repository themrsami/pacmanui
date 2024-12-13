'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export type AccordionItem = {
  title: string
  content: string
}

export type AccordionProps = {
  items: AccordionItem[]
  variant?: 'default' | 'bordered' | 'rounded' | 'minimal' | 'card'
  allowMultiple?: boolean
}

const Accordion: React.FC<AccordionProps> = ({ items, variant = 'default', allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems(openItems.includes(index)
        ? openItems.filter(item => item !== index)
        : [...openItems, index]
      )
    } else {
      setOpenItems(openItems.includes(index) ? [] : [index])
    }
  }

  const getItemClasses = () => {
    const baseClasses = 'group transition-all duration-300 ease-in-out overflow-hidden'
    const variantClasses = {
      default: 'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50',
      bordered: 'border border-gray-200 dark:border-gray-700 mb-3 hover:border-gray-300 dark:hover:border-gray-600',
      rounded: 'rounded-xl border border-gray-200 dark:border-gray-700 mb-3 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm',
      minimal: 'mb-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg',
      card: 'bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-3 border border-gray-100 dark:border-gray-700'
    }
    return `${baseClasses} ${variantClasses[variant]}`
  }

  const getTitleClasses = () => {
    const baseClasses = 'flex items-center justify-between w-full p-4 text-left transition-colors duration-200'
    const variantClasses = {
      default: 'hover:text-gray-900 dark:hover:text-white',
      bordered: 'hover:text-gray-900 dark:hover:text-white',
      rounded: 'hover:text-gray-900 dark:hover:text-white',
      minimal: 'hover:text-gray-900 dark:hover:text-white rounded-lg',
      card: 'bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 rounded-t-xl'
    }
    return `${baseClasses} ${variantClasses[variant]}`
  }

  const getIconComponent = (isOpen: boolean) => {
    const iconClasses = "transition-transform duration-300 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
    
    switch (variant) {
      case 'minimal':
        return isOpen ? 
          <Minus size={18} className={iconClasses} /> : 
          <Plus size={18} className={iconClasses} />
      case 'card':
        return (
          <ChevronDown 
            size={18} 
            className={`${iconClasses} transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        )
      default:
        return isOpen ? 
          <ChevronDown size={18} className={iconClasses} /> : 
          <ChevronRight size={18} className={iconClasses} />
    }
  }

  const contentVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3
        },
        opacity: {
          duration: 0.2,
          delay: 0.1
        }
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3
        },
        opacity: {
          duration: 0.2
        }
      }
    }
  }

  return (
    <div className="w-full space-y-1">
      {items.map((item, index) => (
        <div key={index} className={getItemClasses()}>
          <button
            className={getTitleClasses()}
            onClick={() => toggleItem(index)}
            aria-expanded={openItems.includes(index)}
          >
            <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
              {item.title}
            </span>
            {getIconComponent(openItems.includes(index))}
          </button>
          <AnimatePresence initial={false}>
            {openItems.includes(index) && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
                className="overflow-hidden"
              >
                <div className="p-4 text-gray-600 dark:text-gray-300 prose-sm dark:prose-invert">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export {Accordion}