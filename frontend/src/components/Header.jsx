import { Button } from '@/components/ui/button.jsx'
import { Search, Plus, TrendingUp, Lightbulb, Cog, BarChart3, Activity } from 'lucide-react'

const Header = ({ activeModule, setActiveModule }) => {
  const modules = [
    { id: 'explore', name: 'Explore & Select', icon: Search },
    { id: 'add', name: 'Add & Connect', icon: Plus },
    { id: 'rate', name: 'Rate & Create', icon: TrendingUp },
    { id: 'ideate', name: 'Ideate & Realize', icon: Lightbulb },
    { id: 'dashboard', name: 'Trend Dashboard', icon: BarChart3 },
    { id: 'analytics', name: 'Trend Analytics', icon: Activity }
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Digital Real Estate Innovation Engine
            </h1>
          </div>
          
          <nav className="flex space-x-4">
            {modules.map((module) => {
              const Icon = module.icon
              return (
                <Button
                  key={module.id}
                  variant={activeModule === module.id ? "default" : "ghost"}
                  onClick={() => setActiveModule(module.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{module.name}</span>
                </Button>
              )
            })}
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Cog className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

