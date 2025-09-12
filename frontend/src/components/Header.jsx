import { useState } from 'react'

// Simple SVG Icons (replacing lucide-react)
const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const HomeIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const StarIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const BarChartIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

// Local UI Components
const Button = ({ children, onClick, className = '', variant = 'default' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

const Header = ({ activeModule, onModuleChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const modules = [
    {
      id: 'explore-select',
      name: 'Explore & Select',
      icon: SearchIcon,
      color: 'bg-green-500',
      description: 'Discover and filter content'
    },
    {
      id: 'add-connect',
      name: 'Add & Connect',
      icon: PlusIcon,
      color: 'bg-blue-500',
      description: 'Create and link new content'
    },
    {
      id: 'rate-create',
      name: 'Rate & Create',
      icon: StarIcon,
      color: 'bg-yellow-500',
      description: 'Evaluate and develop ideas'
    },
    {
      id: 'ideate-realize',
      name: 'Ideate & Realize',
      icon: LightbulbIcon,
      color: 'bg-purple-500',
      description: 'Generate and implement solutions'
    },
    {
      id: 'trend-dashboard',
      name: 'Trend Dashboard',
      icon: BarChartIcon,
      color: 'bg-teal-500',
      description: 'Monitor trend activities'
    },
    {
      id: 'trend-analytics',
      name: 'Trend Analytics',
      icon: TrendingUpIcon,
      color: 'bg-pink-500',
      description: 'Analyze trend patterns'
    }
  ]

  const handleModuleClick = (moduleId) => {
    onModuleChange(moduleId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HomeIcon />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Real Estate Innovation Engine
                </h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {modules.map((module) => {
              const Icon = module.icon
              const isActive = activeModule === module.id
              
              return (
                <Button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  variant={isActive ? 'default' : 'ghost'}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm ${
                    isActive 
                      ? `${module.color} text-white hover:opacity-90` 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon />
                  <span>{module.name}</span>
                </Button>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {modules.map((module) => {
                const Icon = module.icon
                const isActive = activeModule === module.id
                
                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleClick(module.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1 rounded ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Icon />
                    </div>
                    <div>
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs text-gray-500">{module.description}</div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

