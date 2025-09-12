import { useState } from 'react'
import { Menu, X, Home, Search, Plus, Star, Lightbulb, BarChart3, TrendingUp } from 'lucide-react'

// Local UI Components (to avoid import issues)
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
      icon: Search,
      color: 'bg-green-500',
      description: 'Discover and filter content'
    },
    {
      id: 'add-connect',
      name: 'Add & Connect',
      icon: Plus,
      color: 'bg-blue-500',
      description: 'Create and link new content'
    },
    {
      id: 'rate-create',
      name: 'Rate & Create',
      icon: Star,
      color: 'bg-yellow-500',
      description: 'Evaluate and develop ideas'
    },
    {
      id: 'ideate-realize',
      name: 'Ideate & Realize',
      icon: Lightbulb,
      color: 'bg-purple-500',
      description: 'Generate and implement solutions'
    },
    {
      id: 'trend-dashboard',
      name: 'Trend Dashboard',
      icon: BarChart3,
      color: 'bg-teal-500',
      description: 'Monitor trend activities'
    },
    {
      id: 'trend-analytics',
      name: 'Trend Analytics',
      icon: TrendingUp,
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
              <Home className="h-8 w-8 text-blue-600" />
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
                  <Icon className="h-4 w-4" />
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
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
                      <Icon className="h-4 w-4" />
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

