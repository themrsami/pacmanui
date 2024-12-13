#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const componentMap = {
  'accordion': 'accordion.tsx',
  'button': 'button.tsx',
  'datepicker': 'date-picker.tsx',
  'modal': 'modal.tsx',
  'select': 'select.tsx',
  'toast': 'toast.tsx'
}

const componentDependencies = {
  accordion: {
    dependencies: ['framer-motion', 'class-variance-authority', 'clsx', 'tailwind-merge'],
    devDependencies: ['@types/react']
  },
  button: {
    dependencies: ['framer-motion', 'class-variance-authority', 'clsx', 'tailwind-merge'],
    devDependencies: ['@types/react']
  },
  datepicker: {
    dependencies: ['framer-motion', 'class-variance-authority', 'clsx', 'tailwind-merge', 'date-fns'],
    devDependencies: ['@types/react']
  },
  modal: {
    dependencies: ['framer-motion', 'class-variance-authority', 'clsx', 'tailwind-merge'],
    devDependencies: ['@types/react']
  },
  select: {
    dependencies: ['framer-motion', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
    devDependencies: ['@types/react']
  },
  toast: {
    dependencies: ['framer-motion', 'class-variance-authority', 'clsx', 'tailwind-merge'],
    devDependencies: ['@types/react']
  }
}

const availableComponents = Object.keys(componentDependencies)

const command = process.argv[2]
const componentName = process.argv[3]?.toLowerCase()

// Get the package root directory
function getPackageRoot() {
  // First try to find it relative to the current script
  let dir = __dirname
  while (dir !== path.parse(dir).root) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir
    }
    dir = path.dirname(dir)
  }
  
  // If not found, try node_modules
  const nodeModulesPath = require.resolve('pacmanui/package.json')
  return path.dirname(nodeModulesPath)
}

// Detect package manager
function detectPackageManager() {
  try {
    // Check for pnpm-lock.yaml
    if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
      return 'pnpm'
    }
    // Check for package-lock.json
    if (fs.existsSync(path.join(process.cwd(), 'package-lock.json'))) {
      return 'npm'
    }
    // Default to npm if no lock file is found
    return 'npm'
  } catch {
    return 'npm'
  }
}

// Check if pacmanui is installed
function isPacmanUIInstalled() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
    return !!(packageJson.dependencies?.pacmanui || packageJson.devDependencies?.pacmanui)
  } catch {
    return false
  }
}

// Get install command based on package manager
function getInstallCommand(pkgManager, isDev = false) {
  switch (pkgManager) {
    case 'pnpm':
      return isDev ? 'pnpm add -D' : 'pnpm add'
    case 'npm':
      return isDev ? 'npm install -D' : 'npm install'
    default:
      return isDev ? 'npm install -D' : 'npm install'
  }
}

// Install dependencies for a component
function installDependencies(component) {
  const deps = componentDependencies[component]
  if (!deps) return

  const pkgManager = detectPackageManager()
  console.log(`📦 Installing dependencies using ${pkgManager}...`)
  
  if (deps.dependencies?.length) {
    try {
      const cmd = `${getInstallCommand(pkgManager)} ${deps.dependencies.join(' ')}`
      console.log(`Running: ${cmd}`)
      execSync(cmd, { stdio: 'inherit' })
    } catch (error) {
      console.error('Error installing dependencies:', error.message)
      process.exit(1)
    }
  }

  if (deps.devDependencies?.length) {
    try {
      const cmd = `${getInstallCommand(pkgManager, true)} ${deps.devDependencies.join(' ')}`
      console.log(`Running: ${cmd}`)
      execSync(cmd, { stdio: 'inherit' })
    } catch (error) {
      console.error('Error installing dev dependencies:', error.message)
      process.exit(1)
    }
  }
}

if (!command) {
  console.error('Please specify a command. Available commands: add, list')
  process.exit(1)
}

if (command === 'list') {
  console.log('\nAvailable components:')
  availableComponents.forEach(comp => console.log(`- ${comp}`))
  console.log('\nTo add a component, run:')
  console.log('npx pacmanui add <component-name>')
  console.log('# or')
  console.log('pnpm dlx pacmanui add <component-name>\n')
  process.exit(0)
}

if (command !== 'add') {
  console.error('Unknown command. Available commands: add, list')
  process.exit(1)
}

if (!componentName) {
  console.error('Please specify a component name')
  console.error('Run "npx pacmanui list" or "pnpm dlx pacmanui list" to see available components')
  process.exit(1)
}

if (!availableComponents.includes(componentName)) {
  console.error(`Unknown component: ${componentName}`)
  console.error('Available components:', availableComponents.join(', '))
  process.exit(1)
}

// Check if pacmanui is installed
if (!isPacmanUIInstalled()) {
  const pkgManager = detectPackageManager()
  console.error('❌ PacmanUI is not installed. Please install it first:')
  console.error(`${getInstallCommand(pkgManager)} pacmanui`)
  process.exit(1)
}

const componentsDir = path.join(process.cwd(), 'components', 'pacmanui')

// Create components directory if it doesn't exist
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true })
}

// Get the correct file name from the component map
const fileName = componentMap[componentName]
if (!fileName) {
  console.error(`Component file mapping not found for ${componentName}`)
  process.exit(1)
}

// Copy component file
try {
  // Get the package root directory
  const packageRoot = getPackageRoot()
  console.log('Package root:', packageRoot)
  
  // Try multiple possible component locations
  const possiblePaths = [
    path.join(packageRoot, 'components', fileName),
    path.join(packageRoot, 'dist', 'components', fileName),
    path.join(packageRoot, 'src', 'components', fileName),
    require.resolve(`pacmanui/components/${fileName}`),
  ]

  let sourceFile
  let componentContent

  for (const p of possiblePaths) {
    try {
      console.log('Trying path:', p)
      if (fs.existsSync(p)) {
        sourceFile = p
        componentContent = fs.readFileSync(p, 'utf8')
        break
      }
    } catch (err) {
      console.log('Path not found:', p)
    }
  }

  if (!sourceFile || !componentContent) {
    throw new Error(`Could not find component file: ${fileName}`)
  }

  const targetFile = path.join(componentsDir, fileName)
  console.log('Target file:', targetFile)
  
  // Write to target location
  fs.writeFileSync(targetFile, componentContent)
  
  // Install dependencies
  installDependencies(componentName)
  
  console.log(`✅ Successfully added ${componentName} component`)
  console.log(`📁 Location: ${targetFile}`)
  console.log('\nUsage example:')
  console.log(`import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from '@/components/pacmanui/${fileName.replace('.tsx', '')}'`)
} catch (error) {
  console.error(`Error adding component: ${error.message}`)
  process.exit(1)
}
