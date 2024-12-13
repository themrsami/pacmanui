'use client'

import React, { useState } from 'react'
import { Button } from '@/components/pacmanui/button'
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const examples = [
  {
    title: 'Button Variants',
    description: 'Different button variants available',
    component: function ButtonVariantsExample() {
      return (
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      )
    },
    code: `import { Button } from '@/components/pacmanui/button'

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`
  },
  {
    title: 'Button Sizes',
    description: 'Buttons in different sizes',
    component: function ButtonSizesExample() {
      return (
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      )
    },
    code: `import { Button } from '@/components/pacmanui/button'

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`
  },
  {
    title: 'Button States',
    description: 'Different button states including loading, success, error, and warning',
    component: function ButtonStatesExample() {
      return (
        <div className="flex flex-wrap gap-4">
          <Button state="default">Default</Button>
          <Button state="loading">Loading</Button>
          <Button state="success">Success</Button>
          <Button state="error">Error</Button>
          <Button state="warning">Warning</Button>
          <Button state="disabled">Disabled</Button>
        </div>
      )
    },
    code: `import { Button } from '@/components/pacmanui/button'

// Different states
<Button state="default">Default</Button>
<Button state="loading">Loading</Button>
<Button state="success">Success</Button>
<Button state="error">Error</Button>
<Button state="warning">Warning</Button>
<Button state="disabled">Disabled</Button>`
  }
]

export default function ButtonPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Button Component</h1>
          <p className="text-slate-600 dark:text-slate-400">
            A versatile button component with various styles, sizes, and states.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
          <div className="relative">
            <SyntaxHighlighter language="bash" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`pnpm → pnpm dlx pacmanui add button
npm  → npx pacmanui add button`}
            </SyntaxHighlighter>
            <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
              <button
                onClick={() => copyToClipboard('pnpm dlx pacmanui add button', 1)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy pnpm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy pnpm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 1 ? "text-green-500" : ""}`} />
              </button>
              <button
                onClick={() => copyToClipboard('npx pacmanui add button', 2)}
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

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Usage</h2>
          <div className="relative">
            <SyntaxHighlighter language="tsx" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`import { Button } from '@/components/pacmanui/button'

export default function MyComponent() {
  return (
    <Button>Click me</Button>
  )
}`}
            </SyntaxHighlighter>
            <button
              onClick={() => copyToClipboard(`import { Button } from '@/components/pacmanui/button'

export default function MyComponent() {
  return (
    <Button>Click me</Button>
  )
}`, 0)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-800"
            >
              <Copy className={`h-4 w-4 text-white ${copiedIndex === 0 ? "text-green-500" : ""}`} />
            </button>
            {copiedIndex === 0 && (
              <span className="absolute top-4 right-12 text-sm text-green-500 ml-2">
                Copied!
              </span>
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
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">variant</th>
                  <td className="px-6 py-4">&apos;primary&apos; | &apos;secondary&apos; | &apos;outline&apos; | &apos;ghost&apos; | &apos;link&apos;</td>
                  <td className="px-6 py-4">&apos;primary&apos;</td>
                  <td className="px-6 py-4">The visual style of the button</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">size</th>
                  <td className="px-6 py-4">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                  <td className="px-6 py-4">&apos;md&apos;</td>
                  <td className="px-6 py-4">The size of the button</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">state</th>
                  <td className="px-6 py-4">&apos;default&apos; | &apos;loading&apos; | &apos;success&apos; | &apos;error&apos; | &apos;warning&apos; | &apos;disabled&apos;</td>
                  <td className="px-6 py-4">&apos;default&apos;</td>
                  <td className="px-6 py-4">The current state of the button</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">fullWidth</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Whether the button should take up the full width of its container</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">icon</th>
                  <td className="px-6 py-4">React.ReactNode</td>
                  <td className="px-6 py-4">undefined</td>
                  <td className="px-6 py-4">Optional icon to display before the button text</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">className</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">&apos;&apos;</td>
                  <td className="px-6 py-4">Additional CSS classes to apply to the button</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">onClick</th>
                  <td className="px-6 py-4">(event: React.MouseEvent) =&gt; void</td>
                  <td className="px-6 py-4">undefined</td>
                  <td className="px-6 py-4">Function called when the button is clicked</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">disabled</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Whether the button is disabled</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">type</th>
                  <td className="px-6 py-4">&apos;button&apos; | &apos;submit&apos; | &apos;reset&apos;</td>
                  <td className="px-6 py-4">&apos;button&apos;</td>
                  <td className="px-6 py-4">The type of button</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Examples</h2>
          {examples.map((example, index) => (
            <div key={index} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{example.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{example.description}</p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <example.component />
              </div>
              <div className="relative">
                <SyntaxHighlighter language="tsx" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
                  {example.code}
                </SyntaxHighlighter>
                <button
                  onClick={() => copyToClipboard(example.code, index + 3)}
                  className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-800"
                >
                  <Copy className={`h-4 w-4 text-white ${copiedIndex === index + 3 ? "text-green-500" : ""}`} />
                </button>
                {copiedIndex === index + 3 && (
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
  )
}
