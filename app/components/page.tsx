import { Package, Sparkles, ListFilter, Square, MousePointerClick } from "lucide-react"
import { ComponentCard } from "@/components/component-card"

const components = [
  {
    name: 'Select',
    description: 'A versatile select component with multiple selection and search capabilities.',
    path: '/components/select',
    icon: <ListFilter className="w-6 h-6" />,
  },
  {
    name: 'Toast',
    description: 'Beautiful toast notifications with multiple variants and positions.',
    path: '/components/toast',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: 'Accordion',
    description: 'A flexible and accessible accordion component with multiple variants and animations.',
    path: '/components/accordion',
    icon: <Package className="w-6 h-6" />,
  },
  {
    name: 'Modal',
    description: 'A customizable modal dialog with multiple sizes, variants, and smooth animations.',
    path: '/components/modal',
    icon: <Square className="w-6 h-6" />,
  },
  {
    name: 'Date Picker',
    description: 'A customizable date picker component with multiple variants and animations.',
    path: '/components/date-picker',
    icon: <Square className="w-6 h-6" />,
  },
  {
    name: 'Button',
    description: 'A versatile button component with various styles, sizes, and states.',
    path: '/components/button',
    icon: <MousePointerClick className="w-6 h-6" />,
  }
]

export default function ComponentsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            PacmanUI Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A collection of beautiful and accessible React components
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 px-4">
          {components.map((component) => (
            <ComponentCard
              key={component.name}
              name={component.name}
              description={component.description}
              path={component.path}
              icon={component.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
