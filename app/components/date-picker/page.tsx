'use client'

import React, { useState } from 'react'
import { DatePicker } from '@/components/pacmanui/date-picker'
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function DatePickerPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const examples = [
    {
      title: "Basic Date Picker",
      description: "A simple date picker with default styling",
      component: function BasicExample() {
        const [date, setDate] = useState<Date | null>(null)
        return (
          <div className="w-72">
            <DatePicker
              selectedDate={date}
              onChange={setDate}
            />
          </div>
        )
      },
      code: `'use client'

import { DatePicker } from '@/components/pacmanui/date-picker'
import { useState } from 'react'

export default function BasicExample() {
  const [date, setDate] = useState<Date | null>(null)
  
  return (
    <div className="w-72">
      <DatePicker
        selectedDate={date}
        onChange={setDate}
      />
    </div>
  )
}`
    },
    {
      title: "Variants",
      description: "Date picker with different visual styles",
      component: function VariantsExample() {
        const [dates, setDates] = useState<{ [key: string]: Date | null }>({
          minimal: null,
          gradient: null,
          neumorphic: null,
          dark: null,
          playful: null,
          material: null,
          ios: null
        })

        const variants = ['minimal', 'gradient', 'neumorphic', 'dark', 'playful', 'material', 'ios'] as const

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {variants.map((variant) => (
              <div key={variant} className="w-72">
                <h3 className="text-sm font-medium mb-2 capitalize">{variant}</h3>
                <DatePicker
                  selectedDate={dates[variant]}
                  onChange={(date) => setDates(prev => ({ ...prev, [variant]: date }))}
                  variant={variant}
                />
              </div>
            ))}
          </div>
        )
      },
      code: `'use client'

import { DatePicker } from '@/components/pacmanui/date-picker'
import { useState } from 'react'

export default function VariantsExample() {
  const [dates, setDates] = useState<{ [key: string]: Date | null }>({
    minimal: null,
    gradient: null,
    neumorphic: null,
    dark: null,
    playful: null,
    material: null,
    ios: null
  })

  const variants = ['minimal', 'gradient', 'neumorphic', 'dark', 'playful', 'material', 'ios'] as const

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {variants.map((variant) => (
        <div key={variant} className="w-72">
          <h3 className="text-sm font-medium mb-2 capitalize">{variant}</h3>
          <DatePicker
            selectedDate={dates[variant]}
            onChange={(date) => setDates(prev => ({ ...prev, [variant]: date }))}
            variant={variant}
          />
        </div>
      ))}
    </div>
  )
}`
    },
    {
      title: "Animations",
      description: "Date picker with different animation styles",
      component: function AnimationsExample() {
        const [dates, setDates] = useState<{ [key: string]: Date | null }>({
          fade: null,
          slide: null,
          scale: null,
          rotate: null
        })

        const animations = ['fade', 'slide', 'scale', 'rotate'] as const

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {animations.map((animation) => (
              <div key={animation} className="w-72">
                <h3 className="text-sm font-medium mb-2 capitalize">{animation}</h3>
                <DatePicker
                  selectedDate={dates[animation]}
                  onChange={(date) => setDates(prev => ({ ...prev, [animation]: date }))}
                  animation={animation}
                />
              </div>
            ))}
          </div>
        )
      },
      code: `'use client'

import { DatePicker } from '@/components/pacmanui/date-picker'
import { useState } from 'react'

export default function AnimationsExample() {
  const [dates, setDates] = useState<{ [key: string]: Date | null }>({
    fade: null,
    slide: null,
    scale: null,
    rotate: null
  })

  const animations = ['fade', 'slide', 'scale', 'rotate'] as const

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {animations.map((animation) => (
        <div key={animation} className="w-72">
          <h3 className="text-sm font-medium mb-2 capitalize">{animation}</h3>
          <DatePicker
            selectedDate={dates[animation]}
            onChange={(date) => setDates(prev => ({ ...prev, [animation]: date }))}
            animation={animation}
          />
        </div>
      ))}
    </div>
  )
}`
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Date Picker Component</h1>
          <p className="text-slate-600 dark:text-slate-400">
            A flexible date picker component with multiple variants and animations.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
          <div className="relative">
            <SyntaxHighlighter language="bash" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`pnpm → pnpm dlx pacmanui add datepicker
npm  → npx pacmanui add datepicker`}
            </SyntaxHighlighter>
            <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
              <button
                onClick={() => copyToClipboard('pnpm dlx pacmanui add datepicker', 1)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy pnpm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy pnpm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 1 ? "text-green-500" : ""}`} />
              </button>
              <button
                onClick={() => copyToClipboard('npx pacmanui add datepicker', 2)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy npm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy npm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 2 ? "text-green-500" : ""}`} />
              </button>
            </div>
            {(copiedIndex === 1 || copiedIndex === 2) && (
              <div className="absolute top-1/2 right-16 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded">
                Copied!
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">API Reference</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">PROP</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">TYPE</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">DEFAULT</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">selectedDate</th>
                  <td className="px-6 py-4">Date | null</td>
                  <td className="px-6 py-4">null</td>
                  <td className="px-6 py-4">The currently selected date</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">onChange</th>
                  <td className="px-6 py-4">(date: Date) =&gt; void</td>
                  <td className="px-6 py-4">required</td>
                  <td className="px-6 py-4">Callback function when a date is selected</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">variant</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">&apos;default&apos;</td>
                  <td className="px-6 py-4">Visual style variant: &apos;default&apos;, &apos;minimal&apos;, &apos;gradient&apos;, &apos;neumorphic&apos;, &apos;dark&apos;, &apos;playful&apos;, &apos;material&apos;, &apos;ios&apos;</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">animation</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">&apos;fade&apos;</td>
                  <td className="px-6 py-4">Animation style: &apos;fade&apos;, &apos;slide&apos;, &apos;scale&apos;, &apos;rotate&apos;, &apos;none&apos;</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">className</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">&apos; &apos;</td>
                  <td className="px-6 py-4">Additional CSS classes to apply</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Examples</h2>
          <div className="space-y-8">
            {examples.map((example, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{example.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{example.description}</p>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  {example.component()}
                </div>
                <div className="relative">
                  <SyntaxHighlighter language="tsx" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
                    {example.code}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => copyToClipboard(example.code, index)}
                    className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-800"
                  >
                    <Copy className={`h-4 w-4 text-white ${copiedIndex === index ? "text-green-500" : ""}`} />
                  </button>
                  {copiedIndex === index && (
                    <span className="absolute top-4 right-12 text-sm text-green-500 ml-2">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
