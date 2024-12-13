'use client'

import React, { useState } from 'react'
import { Select } from '@/components/pacmanui/select'
import { Copy } from 'lucide-react'
import { Toast, useToast } from '@/components/pacmanui/toast'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function SelectUsage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { toasts, showToast } = useToast()

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
  ]

  const examples = [
    {
      title: "Default (Single Select)",
      description: "A basic single-select dropdown",
      component: (
        <Select
          options={options}
          placeholder="Choose a framework"
          onChange={(value) => showToast({ message: `Selected: ${value}` })}
        />
      ),
      code: `import { Select } from '@/components/pacmanui/select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

<Select
  options={options}
  placeholder="Choose a framework"
  onChange={(value) => console.log('Selected:', value)}
/>`
    },
    {
      title: "Multi Select",
      description: "Select multiple options at once",
      component: (
        <Select
          options={options}
          multiple
          placeholder="Choose frameworks"
          onChange={(value) => showToast({ message: `Selected: ${(value as string[]).join(', ')}` })}
        />
      ),
      code: `import { Select } from '@/components/pacmanui/select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

<Select
  options={options}
  multiple
  placeholder="Choose frameworks"
  onChange={(value) => console.log('Selected:', value)}
/>`
    },
    {
      title: "Searchable",
      description: "Search through options with a search input",
      component: (
        <Select
          options={options}
          searchable
          multiple
          preview='tabs'
          placeholder="Search and select"
          onChange={(value) => showToast({ message: `Selected: ${(value as string[]).join(', ')}` })}
        />
      ),
      code: `import { Select } from '@/components/pacmanui/select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

<Select
  options={options}
  searchable
  multiple
  preview='tabs'
  placeholder="Search and select"
  onChange={(value) => console.log('Selected:', value)}
/>`
    },
    {
      title: "Preview Options",
      description: "Different ways to display selected options",
      component: (
        <div className="space-y-2">
          <Select options={options} multiple preview="tabs" placeholder="Tabs preview" 
            onChange={(value) => showToast({ message: `Tabs: ${(value as string[]).join(', ')}` })} />
          <Select options={options} multiple preview="text" placeholder="Text preview (default)" 
            onChange={(value) => showToast({ message: `Text: ${(value as string[]).join(', ')}` })} />
          <Select options={options} multiple preview="badge" placeholder="Badge preview" 
            onChange={(value) => showToast({ message: `Badge: ${(value as string[]).join(', ')}` })} />
          <Select options={options} multiple preview="numbers" placeholder="Numbers preview" 
            onChange={(value) => showToast({ message: `Numbers: ${(value as string[]).join(', ')}` })} />
        </div>
      ),
      code: `import { Select } from '@/components/pacmanui/select'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
]

<Select options={options} multiple preview="tabs" placeholder="Tabs preview" />
<Select options={options} multiple preview="text" placeholder="Text preview (default)" />
<Select options={options} multiple preview="badge" placeholder="Badge preview" />
<Select options={options} multiple preview="numbers" placeholder="Numbers preview" />`
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Select Component</h1>
          <p className="text-slate-600 dark:text-slate-400">
            A flexible select component with support for single and multiple selection, search, and various preview modes.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
          <div className="relative">
            <SyntaxHighlighter language="bash" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`pnpm → pnpm dlx pacmanui add select
npm  → npx pacmanui add select`}
            </SyntaxHighlighter>
            <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
              <button
                onClick={() => copyToClipboard('pnpm dlx pacmanui add select', 1)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy pnpm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy pnpm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 1 ? "text-green-500" : ""}`} />
              </button>
              <button
                onClick={() => copyToClipboard('npx pacmanui add select', 2)}
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
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">options</th>
                  <td className="px-6 py-4">SelectOption[]</td>
                  <td className="px-6 py-4">required</td>
                  <td className="px-6 py-4">Array of options to display in the select</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">value</th>
                  <td className="px-6 py-4">string | string[]</td>
                  <td className="px-6 py-4">undefined</td>
                  <td className="px-6 py-4">Selected value(s)</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">onChange</th>
                  <td className="px-6 py-4">(value: string | string[]) =&gt; void</td>
                  <td className="px-6 py-4">required</td>
                  <td className="px-6 py-4">Called when selection changes</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">placeholder</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">&apos;Select...&apos;</td>
                  <td className="px-6 py-4">Placeholder text when no option is selected</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">multiple</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Enable multiple selection</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">searchable</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Enable search functionality</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">preview</th>
                  <td className="px-6 py-4">&apos;text&apos; | &apos;tabs&apos; | &apos;badge&apos; | &apos;numbers&apos;</td>
                  <td className="px-6 py-4">&apos;text&apos;</td>
                  <td className="px-6 py-4">How to display selected options in multiple mode</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">disabled</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Disable the select component</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">clearable</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Show clear button to remove selection</td>
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
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}