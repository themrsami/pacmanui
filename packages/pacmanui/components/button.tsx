import React, { ButtonHTMLAttributes } from 'react'
import { Loader2, Check, X, AlertTriangle } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonState = 'default' | 'loading' | 'success' | 'error' | 'warning' | 'disabled'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  fullWidth?: boolean
  icon?: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100',
  secondary: 'bg-white text-slate-900 hover:bg-gray-100 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800',
  outline: 'border border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900',
  ghost: 'text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800',
  link: 'text-slate-900 underline-offset-4 hover:underline dark:text-white',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-10 px-4 py-2',
  lg: 'h-11 px-8 text-lg',
}

const stateStyles: Record<ButtonState, string> = {
  default: '',
  loading: 'opacity-70 cursor-wait',
  success: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100',
  error: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100',
  warning: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100',
  disabled: 'opacity-50 cursor-not-allowed',
}

const StateIcon: Record<ButtonState, React.ReactNode> = {
  default: null,
  loading: <Loader2 className="mr-2 h-4 w-4 animate-spin" data-testid="loader" />,
  success: <Check className="mr-2 h-4 w-4" data-testid="check" />,
  error: <X className="mr-2 h-4 w-4" data-testid="x" />,
  warning: <AlertTriangle className="mr-2 h-4 w-4" data-testid="alert-triangle" />,
  disabled: null,
}

export function Button({
  variant = 'primary',
  size = 'md',
  state = 'default',
  fullWidth = false,
  icon,
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${stateStyles[state]} ${fullWidth ? 'w-full' : ''} ${className}`

  return (
    <button className={styles} disabled={state === 'disabled'} onClick={onClick} {...props}>
      {StateIcon[state]}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
}