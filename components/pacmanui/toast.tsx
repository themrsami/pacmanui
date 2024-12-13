'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  "fixed flex items-center gap-3 p-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white/90 text-gray-900 border-gray-200 dark:bg-gray-900/90 dark:text-white dark:border-gray-800",
        success: "bg-green-50/90 text-green-900 border-green-200 dark:bg-green-950/90 dark:text-green-100 dark:border-green-900",
        error: "bg-red-50/90 text-red-900 border-red-200 dark:bg-red-950/90 dark:text-red-100 dark:border-red-900",
        warning: "bg-yellow-50/90 text-yellow-900 border-yellow-200 dark:bg-yellow-950/90 dark:text-yellow-100 dark:border-yellow-900",
        info: "bg-blue-50/90 text-blue-900 border-blue-200 dark:bg-blue-950/90 dark:text-blue-100 dark:border-blue-900",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
        "bottom-left": "bottom-4 left-4",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom-right",
    },
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  duration?: number
  onClose: () => void
  className?: string
}

const icons = {
  default: null,
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
  variant = "default",
  position,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for exit animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        toastVariants({ variant, position }),
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "min-w-[320px] max-w-md",
        className
      )}
      data-testid="toast-container"
    >
      {variant && icons[variant]}
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for exit animation to complete
        }}
        className="text-current opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([])

  const showToast = (props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prevToasts) => [...prevToasts, { ...props, id, onClose: () => removeToast(id) }])
  }

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return { toasts, showToast, removeToast }
}