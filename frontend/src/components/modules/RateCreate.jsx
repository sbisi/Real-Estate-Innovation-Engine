import { useState, useEffect } from 'react'
import ContentCard from '../ContentCard.jsx'

// Simple SVG Icons (replacing lucide-react)
const StarIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const TargetIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const BarChart3Icon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 ${className}`}>{children}</p>
)

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
)

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

const Input = ({ className = '', ...props }) => (
  <input className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

const Textarea = ({ className = '', ...props }) => (
  <textarea className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen
          })
        }
        if (child.type === SelectContent) {
          return isOpen ? React.cloneElement(child, {
            onValueChange: (val) => {
              onValueChange(val)
              setIsOpen(false)
            }
          }) : null
        }
        return child
      })}
    </div>
  )
}

const SelectTrigger = ({ children, className = '', onClick, isOpen }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
  >
    {children}
    <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
)

const SelectValue = ({ placeholder, children }) => (
  <span className="block truncate">
    {children || <span className="text-gray-500">{placeholder}</span>}
  </span>
)

const SelectContent = ({ children, onValueChange }) => (
  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
    {React.Children.map(children, child =>
      React.cloneElement(child, { onValueChange })
    )}
  </div>
)

const SelectItem = ({ children, value, onValueChange }) => (
  <div
    className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm hover:bg-gray-100"
    onClick={() => onValueChange(value)}
  >
    {children}
  </div>
)

const RateCreate = () => {
  const [selectedContents, setSelectedContents] = useState([])
  const [opportunitySpaces, setOpportunitySpaces] = useState([])
  const [showCreateSpace, setShowCreateSpace] = useState(false)
  const [newSpace, setNewSpace] = useState({
    title: '',
    description: '',
    criteria: {
      revenue_potential: 0,
      efficiency_gain: 0,
      competitive_advantage: 0,
      risk_mitigation: 0,
      feasibility: 0
    }
  })

  // Mock selected content data
  const mockSelectedContents = [
    {
      id: 1,
      title: "Smart Building IoT Integration",
      short_description: "Internet of Things sensors and devices for intelligent building management and energy optimization.",
      content_type: "technology",
      industry: "Real Estate",
      time_horizon: "short",
      creator_username: "tech_expert",
      created_at: "2024-01-15T10:00:00Z",
      average_rating: 4.2,
      rating_count: 15,
      user_rating: null
    },
    {
      id: 2,
      title: "Sustainable Urban Development",
      short_description: "Growing trend towards eco-friendly and sustainable urban planning and development practices.",
      content_type: "trend",
      industry: "Real Estate",
      time_horizon: "long",
      creator_username: "sustainability_pro",
      created_at: "2024-01-14T14:30:00Z",
      average_rating: 4.7,
      rating_count: 23,
      user_rating: 5
    }
  ]

  const mockOpportunitySpaces = [
    {
      id: 1,
      title: "Smart Sustainable Buildings",
      description: "Combining IoT technology with sustainable practices for next-generation buildings",
      content_count: 5,
      average_scores: {
        revenue_potential: 4.2,
        efficiency_gain: 4.5,
        competitive_advantage: 3.8,
        risk_mitigation: 4.0,
        feasibility: 3.5
      },
      created_at: "2024-01-10T12:00:00Z"
    }
  ]

  useEffect(() => {
    setSelectedContents(mockSelectedContents)
    setOpportunitySpaces(mockOpportunitySpaces)
  }, [])

  const handleRating = (contentId, criterion, rating) => {
    setSelectedContents(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, user_rating: rating }
          : content
      )
    )
  }

  const handleCreateSpace = () => {
    if (newSpace.title && newSpace.description) {
      const space = {
        id: opportunitySpaces.length + 1,
        ...newSpace,
        content_count: selectedContents.length,
        created_at: new Date().toISOString()
      }
      setOpportunitySpaces(prev => [...prev, space])
      setNewSpace({
        title: '',
        description: '',
        criteria: {
          revenue_potential: 0,
          efficiency_gain: 0,
          competitive_advantage: 0,
          risk_mitigation: 0,
          feasibility: 0
        }
      })
      setShowCreateSpace(false)
    }
  }

  const renderStarRating = (contentId, criterion, currentRating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(contentId, criterion, star)}
            className={`p-1 ${
              star <= (currentRating || 0)
                ? 'text-yellow-400'
                : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <StarIcon />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Rate & Create</h2>
        <p className="text-gray-600">
          Evaluate selected content and create opportunity spaces for innovation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Rating Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <StarIcon />
                <span>Rate Selected Content</span>
              </CardTitle>
              <CardDescription>
                Evaluate content based on multiple criteria to identify opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedContents.map((content) => (
                  <div key={content.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{content.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">
                          by {content.creator_username} • {new Date(content.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 text-sm">{content.short_description}</p>
                      </div>
                      <Badge variant="secondary">
                        {content.content_type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Revenue Potential
                        </label>
                        {renderStarRating(content.id, 'revenue_potential', content.user_rating)}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Efficiency Gain
                        </label>
                        {renderStarRating(content.id, 'efficiency_gain', content.user_rating)}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Competitive Advantage
                        </label>
                        {renderStarRating(content.id, 'competitive_advantage', content.user_rating)}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Risk Mitigation
                        </label>
                        {renderStarRating(content.id, 'risk_mitigation', content.user_rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunity Spaces Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TargetIcon />
                  <span>Opportunity Spaces</span>
                </div>
                <Button
                  onClick={() => setShowCreateSpace(true)}
                  className="flex items-center space-x-1"
                >
                  <PlusIcon />
                  <span>Create</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Innovation opportunities based on rated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunitySpaces.map((space) => (
                  <div key={space.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{space.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{space.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{space.content_count} contents</span>
                      <span>{new Date(space.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Space Modal */}
          {showCreateSpace && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-4">Create Opportunity Space</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      value={newSpace.title}
                      onChange={(e) => setNewSpace(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter space title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={newSpace.description}
                      onChange={(e) => setNewSpace(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the opportunity space"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateSpace(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSpace}>
                    Create Space
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3Icon />
              <span>Rating Analytics</span>
            </CardTitle>
            <CardDescription>
              Overview of content ratings and opportunity identification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedContents.length}
                </div>
                <div className="text-sm text-gray-600">Contents Rated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {opportunitySpaces.length}
                </div>
                <div className="text-sm text-gray-600">Opportunity Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedContents.filter(c => c.user_rating >= 4).length}
                </div>
                <div className="text-sm text-gray-600">High-Rated Contents</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RateCreate

