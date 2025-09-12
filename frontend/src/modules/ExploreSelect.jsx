import { useState, useEffect } from 'react'

// Simple SVG Icons (NO external dependencies)
const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
)

const GridIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
)

const ListIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const CpuIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

// Local UI Components (NO external dependencies)
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

const Input = ({ className = '', ...props }) => (
  <input className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
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

const ExploreSelect = () => {
  const [contents, setContents] = useState([])
  const [filteredContents, setFilteredContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data
  const mockContents = [
    {
      id: 1,
      title: "Smart Building IoT Integration",
      short_description: "Internet of Things sensors and devices for intelligent building management and energy optimization.",
      content_type: "technology",
      industry: "Real Estate",
      time_horizon: "short",
      image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      creator_username: "tech_expert",
      created_at: "2024-01-15T10:00:00Z",
      average_rating: 4.2,
      rating_count: 15,
      comment_count: 8,
      status: "approved"
    },
    {
      id: 2,
      title: "Sustainable Urban Development",
      short_description: "Growing trend towards eco-friendly and sustainable urban planning and development practices.",
      content_type: "trend",
      industry: "Real Estate",
      time_horizon: "long",
      image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      creator_username: "sustainability_pro",
      created_at: "2024-01-14T14:30:00Z",
      average_rating: 4.7,
      rating_count: 23,
      comment_count: 12,
      status: "approved"
    },
    {
      id: 3,
      title: "Virtual Property Tours Platform",
      short_description: "Innovative VR/AR platform enabling immersive virtual property viewings and remote inspections.",
      content_type: "inspiration",
      industry: "Real Estate",
      time_horizon: "medium",
      image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      creator_username: "vr_innovator",
      created_at: "2024-01-13T09:15:00Z",
      average_rating: 4.5,
      rating_count: 19,
      comment_count: 6,
      status: "approved"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setContents(mockContents)
      setFilteredContents(mockContents)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = contents

    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.short_description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(content => content.content_type === selectedType)
    }

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(content => content.industry === selectedIndustry)
    }

    setFilteredContents(filtered)
  }, [contents, searchTerm, selectedType, selectedIndustry])

  const getTypeIcon = (type) => {
    switch (type) {
      case 'technology':
        return <CpuIcon />
      case 'trend':
        return <TrendingUpIcon />
      case 'inspiration':
        return <LightbulbIcon />
      default:
        return null
    }
  }

  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case 'technology':
        return 'danger'
      case 'trend':
        return 'warning'
      case 'inspiration':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const getTimeHorizonBadgeVariant = (horizon) => {
    switch (horizon) {
      case 'short':
        return 'success'
      case 'medium':
        return 'secondary'
      case 'long':
        return 'warning'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore & Select</h2>
        <p className="text-gray-600">
          Discover trends, technologies, and inspirations in the real estate industry
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <Input
                placeholder="Search trends, technologies, inspirations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center space-x-2">
                <FilterIcon />
                <span>Filters</span>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <ListIcon /> : <GridIcon />}
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="technology">Technology</option>
                  <option value="trend">Trend</option>
                  <option value="inspiration">Inspiration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select 
                  value={selectedIndustry} 
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Industries</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedType('all')
                    setSelectedIndustry('all')
                    setSearchTerm('')
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">{filteredContents.length} results</p>
      </div>

      {/* Content Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {filteredContents.map((content) => (
          <div key={content.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={content.image_url} 
                alt={content.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hidden w-full h-full bg-gray-200 items-center justify-center">
                <span className="text-gray-400">Image placeholder</span>
              </div>
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant={getTypeBadgeVariant(content.content_type)}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(content.content_type)}
                    {content.content_type}
                  </span>
                </Badge>
                <Badge variant="default">
                  {content.industry}
                </Badge>
                <Badge variant={getTimeHorizonBadgeVariant(content.time_horizon)}>
                  {content.time_horizon} term
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                by {content.creator_username} • {new Date(content.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {content.short_description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" className="p-2">
                    Like
                  </Button>
                  <Button variant="outline" className="text-sm">
                    View Details
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">
                      {content.average_rating} ({content.rating_count})
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{content.comment_count}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto mb-4 text-gray-400">
            <SearchIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}

export default ExploreSelect

