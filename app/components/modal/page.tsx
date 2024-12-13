'use client'

import React, { useState } from 'react'
import { Modal, useModal } from '@/components/pacmanui/modal'
import { Button } from "@/components/pacmanui/button"
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ModalPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const examples = [
    {
      title: "Basic Modal",
      description: "A simple modal with title and content",
      component: function ModalExample() {
        const { isOpen, open, close } = useModal()
        return (
          <>
            <Button onClick={open}>Open Modal</Button>
            <Modal
              isOpen={isOpen}
              onClose={close}
              title="Basic Modal"
              description="This is a basic modal example"
            >
              <div className="p-4">
                <p>Modal content goes here</p>
              </div>
            </Modal>
          </>
        )
      },
      code: `'use client'

import { Modal, useModal } from '@/components/pacmanui/modal'
import { Button } from "@/components/pacmanui/button"

export default function ModalExample() {
  const { isOpen, open, close } = useModal()
  
  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Basic Modal"
        description="This is a basic modal example"
      >
        <div className="p-4">
          <p>Modal content goes here</p>
        </div>
      </Modal>
    </>
  )
}`
    },
    {
      title: "Close on Outside Click",
      description: "A modal that can be closed by clicking outside",
      component: function CloseOnOutsideExample() {
        const { isOpen, open, close } = useModal()
        return (
          <>
            <Button onClick={open}>Open Modal</Button>
            <Modal
              isOpen={isOpen}
              onClose={close}
              title="Click Outside"
              description="Click outside the modal to close it"
              closeOnOutsideClick={true}
            >
              <div className="p-4">
                <p>Try clicking outside this modal to close it</p>
              </div>
            </Modal>
          </>
        )
      },
      code: `'use client'

import { Modal, useModal } from '@/components/pacmanui/modal'
import { Button } from "@/components/pacmanui/button"

export default function CloseOnOutsideExample() {
  const { isOpen, open, close } = useModal()
  
  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Click Outside"
        description="Click outside the modal to close it"
        closeOnOutsideClick={true}
      >
        <div className="p-4">
          <p>Try clicking outside this modal to close it</p>
        </div>
      </Modal>
    </>
  )
}`
    },
    {
      title: "Modal Sizes",
      description: "Modals with different sizes: sm, md, lg, xl, and full",
      component: function ModalSizesExample() {
        const smallModal = useModal()
        const mediumModal = useModal()
        const largeModal = useModal()
        const xlModal = useModal()
        const fullModal = useModal()

        return (
          <div className="flex flex-wrap gap-4">
            <Button onClick={smallModal.open}>Small Modal</Button>
            <Modal
              isOpen={smallModal.isOpen}
              onClose={smallModal.close}
              title="Small Modal"
              size="sm"
            >
              <div className="p-4">
                <p>This is a small modal</p>
              </div>
            </Modal>

            <Button onClick={mediumModal.open}>Medium Modal</Button>
            <Modal
              isOpen={mediumModal.isOpen}
              onClose={mediumModal.close}
              title="Medium Modal"
              size="md"
            >
              <div className="p-4">
                <p>This is a medium modal</p>
              </div>
            </Modal>

            <Button onClick={largeModal.open}>Large Modal</Button>
            <Modal
              isOpen={largeModal.isOpen}
              onClose={largeModal.close}
              title="Large Modal"
              size="lg"
            >
              <div className="p-4">
                <p>This is a large modal</p>
              </div>
            </Modal>

            <Button onClick={xlModal.open}>Extra Large Modal</Button>
            <Modal
              isOpen={xlModal.isOpen}
              onClose={xlModal.close}
              title="Extra Large Modal"
              size="xl"
            >
              <div className="p-4">
                <p>This is an extra large modal</p>
              </div>
            </Modal>

            <Button onClick={fullModal.open}>Full Screen Modal</Button>
            <Modal
              isOpen={fullModal.isOpen}
              onClose={fullModal.close}
              title="Full Screen Modal"
              size="full"
            >
              <div className="p-4">
                <p>This is a full screen modal</p>
              </div>
            </Modal>
          </div>
        )
      },
      code: `'use client'

import { Modal, useModal } from '@/components/pacmanui/modal'
import { Button } from "@/components/pacmanui/button"

export default function ModalSizesExample() {
  const smallModal = useModal()
  const mediumModal = useModal()
  const largeModal = useModal()
  const xlModal = useModal()
  const fullModal = useModal()

  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={smallModal.open}>Small Modal</Button>
      <Modal
        isOpen={smallModal.isOpen}
        onClose={smallModal.close}
        title="Small Modal"
        size="sm"
      >
        <div className="p-4">
          <p>This is a small modal</p>
        </div>
      </Modal>

      {/* Add other size examples similarly */}
    </div>
  )
}`
    },
    {
      title: "Custom Modal",
      description: "A modal with custom styling and content layout",
      component: function CustomModalExample() {
        const { isOpen, open, close } = useModal()
        return (
          <>
            <Button onClick={open}>Custom Modal</Button>
            <Modal
              isOpen={isOpen}
              onClose={close}
              title="Custom Modal"
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
            >
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  This modal has custom background styling and content layout.
                </p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={close}>Cancel</Button>
                  <Button onClick={close}>Confirm</Button>
                </div>
              </div>
            </Modal>
          </>
        )
      },
      code: `'use client'

import { Modal, useModal } from '@/components/pacmanui/modal'
import { Button } from "@/components/pacmanui/button"

export default function CustomModalExample() {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open}>Custom Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Custom Modal"
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            This modal has custom background styling and content layout.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={close}>Cancel</Button>
            <Button onClick={close}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}`
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Modal Component</h1>
          <p className="text-slate-600 dark:text-slate-400">
            A flexible modal dialog component with multiple sizes and customization options.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Installation</h2>
          <div className="relative">
            <SyntaxHighlighter language="bash" style={tomorrow} className="rounded-lg !bg-slate-900 !text-white p-4">
              {`pnpm → pnpm dlx pacmanui add modal
npm  → npx pacmanui add modal`}
            </SyntaxHighlighter>
            <div className="absolute right-4 top-0 h-full flex flex-col justify-around py-4">
              <button
                onClick={() => copyToClipboard('pnpm dlx pacmanui add modal', 1)}
                className="p-2 rounded-md hover:bg-slate-800 group relative"
                title="Copy pnpm command"
              >
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Copy pnpm command
                </span>
                <Copy className={`h-4 w-4 text-white ${copiedIndex === 1 ? "text-green-500" : ""}`} />
              </button>
              <button
                onClick={() => copyToClipboard('npx pacmanui add modal', 2)}
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
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">isOpen</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">required</td>
                  <td className="px-6 py-4">Controls the visibility of the modal</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">onClose</th>
                  <td className="px-6 py-4">() =&gt; void</td>
                  <td className="px-6 py-4">required</td>
                  <td className="px-6 py-4">Function called when the modal is closed</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">title</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">undefined</td>
                  <td className="px-6 py-4">Title displayed at the top of the modal</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">description</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">undefined</td>
                  <td className="px-6 py-4">Description text below the title</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">size</th>
                  <td className="px-6 py-4">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;full&apos;</td>
                  <td className="px-6 py-4">&apos;md&apos;</td>
                  <td className="px-6 py-4">Controls the size of the modal</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">closeOnOutsideClick</th>
                  <td className="px-6 py-4">boolean</td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Whether clicking outside the modal should close it</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">className</th>
                  <td className="px-6 py-4">string</td>
                  <td className="px-6 py-4">undefined</td>
                  <td className="px-6 py-4">Additional CSS classes to apply to the modal</td>
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