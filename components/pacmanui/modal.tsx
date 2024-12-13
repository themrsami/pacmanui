'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'destructive' | 'success'
  showClose?: boolean
  closeOnOutsideClick?: boolean
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  showClose = true,
  closeOnOutsideClick = false,
  className = '',
}: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    destructive: 'bg-red-50 dark:bg-red-900/20',
    success: 'bg-green-50 dark:bg-green-900/20',
  }

  const headerClasses = {
    default: 'text-gray-900 dark:text-gray-100',
    destructive: 'text-red-900 dark:text-red-100',
    success: 'text-green-900 dark:text-green-100',
  }

  const descriptionClasses = {
    default: 'text-gray-500 dark:text-gray-400',
    destructive: 'text-red-700 dark:text-red-200',
    success: 'text-green-700 dark:text-green-200',
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOutsideClick === true) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
          data-testid="modal-backdrop"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg shadow-lg ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {showClose && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            )}
            <div className="p-6">
              {title && (
                <h2 className={`text-lg font-semibold leading-none tracking-tight mb-2 ${headerClasses[variant]}`}>
                  {title}
                </h2>
              )}
              {description && (
                <p className={`text-sm ${descriptionClasses[variant]} mb-4`}>{description}</p>
              )}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const useModal = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  return { isOpen, open, close, toggle }
}