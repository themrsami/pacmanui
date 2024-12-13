'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, X, Check } from 'lucide-react'

export type Option = {
  value: string
  label: string
}

export type SelectProps = {
  placeholder?: string
  className?: string
  options: Option[]
  multiple?: boolean
  searchable?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'solid' | 'underline'
  disabled?: boolean
  clearable?: boolean
  preview?: 'tabs' | 'text' | 'badge' | 'numbers'
  onChange?: (value: string | string[]) => void
}

export function Select({
  placeholder = 'Select...',
  className = '',
  options,
  multiple = false,
  searchable = false,
  size = 'md',
  variant = 'outline',
  disabled = false,
  clearable = false,
  preview = 'text',
  onChange
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleOption = (option: Option) => {
    let newSelectedOptions: Option[]
    if (multiple) {
      newSelectedOptions = selectedOptions.some(o => o.value === option.value)
        ? selectedOptions.filter(o => o.value !== option.value)
        : [...selectedOptions, option]
    } else {
      newSelectedOptions = [option]
      setIsOpen(false)
    }
    setSelectedOptions(newSelectedOptions)
    onChange?.(multiple ? newSelectedOptions.map(o => o.value) : newSelectedOptions[0]?.value)
  }

  const clearSelection = () => {
    setSelectedOptions([])
    onChange?.(multiple ? [] : '')
  }

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sizeClasses = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4'
  }

  const variantClasses = {
    outline: 'border border-gray-300 dark:border-gray-600',
    solid: 'bg-gray-100 dark:bg-gray-700 border-none',
    underline: 'border-b-2 border-gray-300 dark:border-gray-600 rounded-none'
  }

  const baseClasses = `
    relative w-full rounded-md ${sizeClasses[size]} ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    transition-colors duration-200 text-gray-900 dark:text-gray-100
    bg-white dark:bg-gray-800
  `

  const renderPreview = () => {
    if (selectedOptions.length === 0) return <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>

    switch (preview) {
      case 'tabs':
        return (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map(option => (
              <span key={option.value} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-md text-sm">
                {option.label}
              </span>
            ))}
          </div>
        )
      case 'badge':
        return (
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            {selectedOptions.length}
          </span>
        )
      case 'numbers':
        return multiple ? `${selectedOptions.length} selected` : selectedOptions[0]?.label
      case 'text':
      default:
        return multiple
          ? selectedOptions.map(o => o.label).join(', ')
          : selectedOptions[0]?.label
    }
  }

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <div
        className={baseClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        data-testid="select-container"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 truncate">{renderPreview()}</div>
          <div className="flex items-center">
            {clearable && selectedOptions.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  clearSelection()
                }}
                className="mr-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown size={20} className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`
                px-3 py-2 cursor-pointer flex items-center justify-between
                ${selectedOptions.some(o => o.value === option.value)
                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
                  : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
              onClick={() => toggleOption(option)}
            >
              <span>{option.label}</span>
              {selectedOptions.some(o => o.value === option.value) && (
                <Check size={16} className="text-blue-600 dark:text-blue-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}