'use client'

import React, { useState } from 'react'
import { Toast, useToast } from '@/components/pacmanui/toast'
import { Button } from "@/components/pacmanui/button"
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ToastUsage() {
  const { toasts, showToast } = useToast()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const variants = ['default', 'success', 'error', 'warning', 'info'] as const
  const positions = ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'] as const

  const examples = [
    {
      title: "Basic Toast",
      description: "A simple toast notification in a client component",
      component: (
        <Button onClick={() => showToast({ message: "This is a basic toast" })}>
          Show Toast
        </Button>
      ),
      code: `'use client'

import { useToast, Toast } from '@/components/pacmanui/toast'
import { Button } from "@/components/pacmanui/button"

export default function MyComponent() {
  const { toasts, showToast } = useToast()

  return (
    <>
      <Button onClick={() => showToast({ message: "This is a basic toast" })}>
        Show Toast
      </Button>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  )
}`
    },
    {
      title: "Toast Variants",
      description: "Different variants of toast notifications",
      component: (
        <div className="space-x-2">
          {variants.map((variant) => (
            <Button
              key={variant}
              onClick={() => showToast({ 
                message: `This is a ${variant} toast`, 
                variant 
              })}
            >
              Show {variant}
            </Button>
          ))}
        </div>
      ),
      code: `'use client'

import { useToast, Toast } from '@/components/pacmanui/toast'
import { Button } from "@/components/pacmanui/button"

export default function ToastVariants() {
  const { toasts, showToast } = useToast()
  const variants = ['default', 'success', 'error', 'warning', 'info']

  return (
    <>
      <div className="space-x-2">
        {variants.map((variant) => (
          <Button
            key={variant}
            onClick={() => showToast({ 
              message: \`This is a \${variant} toast\`, 
              variant 
            })}
          >
            Show {variant}
          </Button>
        ))}
      </div>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  )
}`
    },
    {
      title: "Toast Positions",
      description: "Control where toasts appear on the screen",
      component: (
        <div className="space-x-2">
          {positions.map((position) => (
            <Button
              key={position}
              onClick={() => showToast({ 
                message: `Toast at ${position}`, 
                position 
              })}
            >
              {position}
            </Button>
          ))}
        </div>
      ),
      code: `'use client'

import { useToast, Toast } from '@/components/pacmanui/toast'
import { Button } from "@/components/pacmanui/button"

export default function ToastPositions() {
  const { toasts, showToast } = useToast()
  const positions = ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']

  return (
    <>
      <div className="space-x-2">
        {positions.map((position) => (
          <Button
            key={position}
            onClick={() => showToast({ 
              message: \`Toast at \${position}\`, 
              position 
            })}
          >
            {position}
          </Button>
        ))}
      </div>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  )
}`
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Toast Component</h1>
          <p className="text-slate-600 dark:text-slate-400">
            A flexible toast notification system with multiple variants and positions.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
          <div className="relative">
            <SyntaxHighlighter language="bash" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`pnpm → pnpm dlx pacmanui add toast
npm  → npx pacmanui add toast`}
            </SyntaxHighlighter>
            <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
              <button
                onClick={() => copyToClipboard('pnpm dlx pacmanui add toast', 1)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy pnpm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy pnpm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 1 ? "text-green-500" : ""}`} />
              </button>
              <button
                onClick={() => copyToClipboard('npx pacmanui add toast', 2)}
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

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">API Reference</h2>
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
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">message</th>
                    <td className="px-6 py-4">string</td>
                    <td className="px-6 py-4">required</td>
                    <td className="px-6 py-4">The message to display in the toast</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">variant</th>
                    <td className="px-6 py-4">&apos;default&apos; | &apos;success&apos; | &apos;error&apos; | &apos;warning&apos; | &apos;info&apos;</td>
                    <td className="px-6 py-4">&apos;default&apos;</td>
                    <td className="px-6 py-4">Changes the visual style and icon of the toast</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">position</th>
                    <td className="px-6 py-4">&apos;top-right&apos; | &apos;top-center&apos; | &apos;top-left&apos; | &apos;bottom-right&apos; | &apos;bottom-center&apos; | &apos;bottom-left&apos;</td>
                    <td className="px-6 py-4">&apos;bottom-right&apos;</td>
                    <td className="px-6 py-4">Where the toast appears on the screen</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">duration</th>
                    <td className="px-6 py-4">number</td>
                    <td className="px-6 py-4">3000</td>
                    <td className="px-6 py-4">How long the toast stays visible (in milliseconds)</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">className</th>
                    <td className="px-6 py-4">string</td>
                    <td className="px-6 py-4">undefined</td>
                    <td className="px-6 py-4">Additional CSS classes to apply to the toast</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Usage</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            The Toast component must be used in a client component. Make sure to add the <code>&apos;use client&apos;</code> directive at the top of your file.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Examples</h2>
          <div className="space-y-8">
            {examples.map((example, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{example.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{example.description}</p>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  {example.component}
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
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}