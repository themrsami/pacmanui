"use client"

import React, { useState, useEffect, useRef } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface DatePickerProps {
  selectedDate: Date | null
  onChange: (date: Date) => void
  className?: string
  disabled?: boolean
  variant?: 'default' | 'minimal' | 'gradient' | 'neumorphic' | 'dark' | 'playful' | 'material' | 'ios'
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'none'
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  rotate: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
}

export const DatePicker: React.FC<DatePickerProps> = ({ 
  selectedDate, 
  onChange, 
  className = '', 
  disabled = false,
  variant = 'default',
  animation = 'fade' 
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
  const [isOpen, setIsOpen] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = []
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const handleDateClick = (date: Date) => {
    onChange(date)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-white border-gray-200 dark:bg-gray-950 dark:border-gray-800'
      case 'gradient':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
      case 'neumorphic':
        return 'bg-gray-100 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] dark:bg-gray-800 dark:shadow-[5px_5px_10px_#1f1f1f,-5px_-5px_10px_#333333]'
      case 'dark':
        return 'bg-gray-800 text-white'
      case 'playful':
        return 'bg-yellow-300 text-yellow-800 rounded-3xl'
      case 'material':
        return 'bg-blue-500 text-white shadow-md'
      case 'ios':
        return 'bg-gray-100 rounded-2xl shadow-sm dark:bg-gray-800'
      default:
        return 'bg-white border border-gray-300 dark:bg-gray-950 dark:border-gray-800'
    }
  }

  return (
    <div 
      className={cn('relative', className)} 
      ref={datePickerRef}
      data-testid="date-picker-container"
    >
      <motion.button
        className={cn(
          'w-full px-4 py-2 text-left rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          getVariantClasses(),
          { 'opacity-50 cursor-not-allowed': disabled }
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        disabled={disabled}
        data-testid="date-picker-button"
      >
        {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
        <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="date-picker-popup"
            initial={animations[animation].initial}
            animate={animations[animation].animate}
            exit={animations[animation].exit}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-50 mt-2 p-4 rounded-lg shadow-lg',
              getVariantClasses()
            )}
          >
            <div className="flex items-center justify-between p-2 border-b">
              <motion.button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-opacity-10 hover:bg-gray-700 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-testid="prev-month-button"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <div data-testid="current-month">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <motion.button
                onClick={handleNextMonth}
                className="p-1 hover:bg-opacity-10 hover:bg-gray-700 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-testid="next-month-button"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="grid grid-cols-7 gap-1 p-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-sm font-medium opacity-75">
                  {day}
                </div>
              ))}
              {getDaysInMonth(currentMonth).map((date, index) => (
                <motion.button
                  key={index}
                  onClick={() => date && handleDateClick(date)}
                  className={cn(
                    'p-2 text-sm rounded-full',
                    {
                      'hover:bg-opacity-10 hover:bg-gray-700': date,
                      'invisible': !date,
                      'bg-blue-500 text-white': date && selectedDate && date.toDateString() === selectedDate.toDateString(),
                      'border border-current': date && date.toDateString() === new Date().toDateString()
                    }
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={date ? `date-${date.getDate()}` : undefined}
                >
                  {date ? date.getDate() : ''}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}