'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Terminal, Package, Zap, AlertCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function InstallationPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const installationSteps = [
    {
      title: '1. Install Base Package',
      description: 'Start by installing the base PacmanUI package',
      code: `pnpm → pnpm add pacmanui
npm  → npm install pacmanui`,
      icon: <Package className="w-6 h-6" />,
      tip: 'This will install the core package needed for all components.',
      pnpmCommand: 'pnpm add pacmanui',
      npmCommand: 'npm install pacmanui'
    },
    {
      title: '2. List Available Components',
      description: 'View all available components',
      code: `pnpm → pnpm dlx pacmanui list
npm  → npx pacmanui list`,
      icon: <Terminal className="w-6 h-6" />,
      tip: 'See a list of all components you can add to your project.',
      pnpmCommand: 'pnpm dlx pacmanui list',
      npmCommand: 'npx pacmanui list'
    },
    {
      title: '3. Install Components',
      description: 'Install only the components you need',
      code: `pnpm → pnpm dlx pacmanui add <component>
npm  → npx pacmanui add <component>`,
      icon: <Zap className="w-6 h-6" />,
      tip: 'Choose only the components you need to keep your bundle size small. Each component will be installed with its required dependencies.',
      pnpmCommand: 'pnpm dlx pacmanui add <component>',
      npmCommand: 'npx pacmanui add <component>'
    }
  ]

  const usageCode = `import { Accordion } from '@/components/pacmanui/accordion'
import { DatePicker } from '@/components/pacmanui/date-picker'
import { Toast } from '@/components/pacmanui/toast'

export default function HomePage() {
  const accordionItems = [
    {
      title: "What is PacmanUI?",
      content: "PacmanUI is a beautiful and modular React component library with component-by-component installation."
    },
    {
      title: "Why choose PacmanUI?",
      content: "PacmanUI offers beautiful animations, dark mode support, and highly customizable components."
    }
  ]

  return (
    <div>
      <Accordion items={accordionItems} variant="card" allowMultiple={false} />
      
      <DatePicker
        onChange={(date) => console.log(date)}
        placeholder="Select a date"
      />

      <Toast
        title="Success!"
        description="Component installed successfully"
        variant="success"
      />
    </div>
  )
}`

  return (
    <div className="min-h-screen py-12 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Installation Guide
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Get started with PacmanUI in just a few steps
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Installation Steps */}
          <div className="space-y-8">
            {installationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 border-2 transition-all duration-300 border-slate-200 dark:border-slate-700`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl transition-colors duration-300 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400`}>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <SyntaxHighlighter
                      language="bash"
                      style={tomorrow}
                      className="!bg-slate-900 !text-slate-100 rounded-xl"
                    >
                      {step.code}
                    </SyntaxHighlighter>
                    <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
                      <button
                        onClick={() => copyToClipboard(step.pnpmCommand, index * 2 + 1)}
                        className="p-2 rounded-md hover:bg-slate-800 group relative"
                        title="Copy pnpm command"
                      >
                        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Copy pnpm command
                        </span>
                        <Copy className={`h-4 w-4 text-white ${copiedIndex === index * 2 + 1 ? "text-green-500" : ""}`} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(step.npmCommand, index * 2 + 2)}
                        className="p-2 rounded-md hover:bg-slate-800 group relative"
                        title="Copy npm command"
                      >
                        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Copy npm command
                        </span>
                        <Copy className={`h-4 w-4 text-white ${copiedIndex === index * 2 + 2 ? "text-green-500" : ""}`} />
                      </button>
                    </div>
                    {(copiedIndex === index * 2 + 1 || copiedIndex === index * 2 + 2) && (
                      <div className="absolute top-1/2 right-16 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded">
                        Copied!
                      </div>
                    )}
                  </div>
                  {isHovered === index && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 transform translate-x-full bg-slate-800 text-white p-4 rounded-lg shadow-lg max-w-xs z-10">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm">{step.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Usage Example */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Usage Example</h2>
            <div className="relative">
              <SyntaxHighlighter
                language="typescript"
                style={tomorrow}
                className="!bg-slate-900 !text-slate-100 rounded-xl"
              >
                {usageCode}
              </SyntaxHighlighter>
              <button
                onClick={() => copyToClipboard(usageCode, -1)}
                className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-800 transition-colors"
              >
                <Copy className={`h-4 w-4 text-white ${copiedIndex === -1 ? "text-green-500" : ""}`} />
              </button>
              {copiedIndex === -1 && (
                <span className="absolute top-4 right-12 text-sm text-green-500 ml-2">
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* Get Started Button */}
          <div className="text-center mt-12">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
