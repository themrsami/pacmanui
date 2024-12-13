# PacmanUI

A modern React UI component library with beautiful animations, built with Tailwind CSS and Framer Motion.

[![npm version](https://badge.fury.io/js/pacmanui.svg)](https://badge.fury.io/js/pacmanui)
[![Test Coverage](https://img.shields.io/badge/coverage-93.37%25-brightgreen.svg)](https://github.com/themrsami/pacmanui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
# Using npm
npm install pacmanui

# Using pnpm
pnpm add pacmanui

# Using yarn
yarn add pacmanui
```

## CLI Usage

Our CLI tool makes it easy to manage components:

```bash
# List all available components
npx pacmanui list

# Add a specific component
npx pacmanui add <component-name>

# Example: Add toast component
npx pacmanui add toast
```

The CLI will automatically:
- Detect your package manager (npm/pnpm)
- Install required dependencies
- Copy component files to your project
- Set up necessary configurations

## Available Components

### 1. Accordion
```tsx
import { Accordion } from '@/components/pacmanui/accordion'

function MyComponent() {
  const items = [
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: "Content for section 2" }
  ]

  return (
    <Accordion 
      items={items}
      variant="default" // 'default' | 'bordered' | 'rounded' | 'minimal' | 'card'
      allowMultiple={true}
    />
  )
}
```

### 2. Button
```tsx
import { Button } from '@/components/pacmanui/button'

function MyComponent() {
  return (
    <Button 
      variant="primary" // 'primary' | 'secondary' | 'outline' | 'ghost'
      size="md" // 'sm' | 'md' | 'lg'
      onClick={() => console.log('clicked')}
    >
      Click Me
    </Button>
  )
}
```

### 3. DatePicker
```tsx
import { DatePicker } from '@/components/pacmanui/date-picker'

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      selectedDate={date}
      onChange={(newDate) => setDate(newDate)}
      variant="default"
      animation="fade"
    />
  )
}
```

### 4. Modal
```tsx
import { Modal, useModal } from '@/components/pacmanui/modal'

function MyComponent() {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <button onClick={open}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="My Modal"
        description="This is a description"
        size="md"
        variant="default"
      >
        <div>Modal content goes here</div>
      </Modal>
    </>
  )
}
```

### 5. Select
```tsx
import { Select } from '@/components/pacmanui/select'

function MyComponent() {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" }
  ]

  return (
    <Select
      options={options}
      placeholder="Select an option"
      multiple={false}
      searchable={true}
      onChange={(value) => console.log(value)}
    />
  )
}
```

### 6. Toast
```tsx
import { Toast, useToast } from '@/components/pacmanui/toast'

function MyComponent() {
  const { showToast } = useToast()

  return (
    <button onClick={() => showToast({
      message: "Operation successful!",
      type: "success", // 'success' | 'error' | 'warning' | 'info'
      duration: 3000
    })}>
      Show Toast
    </button>
  )
}
```

## Features

- 🎨 Beautiful animations powered by Framer Motion
- 🌙 Dark mode support out of the box
- 📱 Fully responsive components
- 🎯 Written in TypeScript with full type support
- 🎭 Multiple variants for each component
- ⚡ Lightweight and performant
- 🔧 Highly customizable with Tailwind CSS
- 📦 Tree-shakeable
- 🛠️ Easy installation with CLI tool
- ✅ Comprehensive test coverage (93.37%)

## Test Coverage

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   93.37 |    86.42 |   95.23 |   93.37 |                   
 accordion.tsx   |      88 |    63.15 |    87.5 |      88 | 24,61-65          
 button.tsx      |     100 |      100 |     100 |     100 |                   
 date-picker.tsx |      86 |    78.37 |     100 |   85.41 | 109-121           
 modal.tsx       |     100 |      100 |     100 |     100 |                   
 select.tsx      |   97.91 |    91.83 |      95 |   97.77 | 60                
 toast.tsx       |   96.15 |      100 |   91.66 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```

## Requirements

- React 18+
- Tailwind CSS 3+
- Node.js 16+

## Dependencies

Core:
- framer-motion: ^10.0.0
- class-variance-authority
- clsx
- tailwind-merge

Component-specific:
- date-fns (DatePicker)
- lucide-react (Select)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [themrsami](https://github.com/themrsami)
