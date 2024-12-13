'use client'

import React, { useState } from 'react'
import { Accordion } from '@/components/pacmanui/accordion'
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const faqItems = [
  {
    title: "What is PacmanUI?",
    content: "PacmanUI is a modern, accessible React component library built with TypeScript and Tailwind CSS. It provides a collection of beautiful, customizable components that help you build better user interfaces faster."
  },
  {
    title: "How do I install PacmanUI?",
    content: "You can install PacmanUI using npm or yarn:\n\nnpm install pacmanui\n\nor\n\nyarn add pacmanui"
  },
  {
    title: "Is PacmanUI accessible?",
    content: "Yes! PacmanUI is built with accessibility in mind. All components follow WAI-ARIA guidelines and are keyboard navigable. We regularly test our components with screen readers to ensure they work well for all users."
  }
]

export default function AccordionPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const examples = [
    {
      title: "Basic Accordion",
      description: "A simple accordion with default styling",
      component: function BasicExample() {
        return (
          <Accordion items={faqItems} />
        )
      },
      code: `'use client'

import { Accordion } from '@/components/pacmanui/accordion'

const items = [
  {
    title: "What is PacmanUI?",
    content: "PacmanUI is a modern, accessible React component library..."
  },
  // ... more items
]

export default function BasicExample() {
  return (
    <Accordion items={items} />
  )
}`
    },
    {
      title: "Variants",
      description: "Accordions with different visual styles",
      component: function VariantsExample() {
        const variants = ['bordered', 'rounded', 'minimal', 'card'] as const
        return (
          <div className="space-y-8">
            {variants.map((variant) => (
              <div key={variant} className="space-y-2">
                <h3 className="text-sm font-medium capitalize">{variant}</h3>
                <Accordion items={faqItems} variant={variant} />
              </div>
            ))}
          </div>
        )
      },
      code: `'use client'

import { Accordion } from '@/components/pacmanui/accordion'

export default function VariantsExample() {
  const variants = ['bordered', 'rounded', 'minimal', 'card'] as const
  
  return (
    <div className="space-y-8">
      {variants.map((variant) => (
        <div key={variant} className="space-y-2">
          <h3 className="text-sm font-medium capitalize">{variant}</h3>
          <Accordion items={items} variant={variant} />
        </div>
      ))}
    </div>
  )
}`
    },
    {
      title: "Multiple Selection",
      description: "An accordion that allows multiple items to be open simultaneously",
      component: function MultipleExample() {
        return (
          <Accordion items={faqItems} allowMultiple />
        )
      },
      code: `'use client'

import { Accordion } from '@/components/pacmanui/accordion'

export default function MultipleExample() {
  return (
    <Accordion items={items} allowMultiple />
  )
}`
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Accordion Component</h1>
          <p className="text-slate-600 dark:text-slate-400">
            A flexible and accessible accordion component with multiple variants and animations.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
          <div className="relative">
            <SyntaxHighlighter language="bash" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`pnpm → pnpm dlx pacmanui add accordion
npm  → npx pacmanui add accordion`}
            </SyntaxHighlighter>
            <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
              <button
                onClick={() => copyToClipboard('pnpm dlx pacmanui add accordion', 1)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy pnpm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy pnpm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 1 ? "text-green-500" : ""}`} />
              </button>
              <button
                onClick={() => copyToClipboard('npx pacmanui add accordion', 2)}
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
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">items</th>
                  <td className="px-6 py-4">AccordionItem[]</td>
                  <td className="px-6 py-4">required</td>
                  <td className="px-6 py-4">Array of items to display in the accordion. Each item should have title and content properties.</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">variant</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">&apos;default&apos;</td>
                  <td className="px-6 py-4">Visual style variant: &apos;default&apos;, &apos;bordered&apos;, &apos;rounded&apos;, &apos;minimal&apos;, &apos;card&apos;</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">allowMultiple</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Allow multiple accordion items to be open at once</td>
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