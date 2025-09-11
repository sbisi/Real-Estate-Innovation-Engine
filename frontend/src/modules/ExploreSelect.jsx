import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import ContentCard from '../ContentCard.jsx'
import { Search, Filter, Grid, List, TrendingUp, Cpu, Lightbulb } from 'lucide-react'

const ExploreSelect = () => {
  const [contents, setContents] = useState([])
  const [filteredContents, setFilteredContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for demonstration
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
      image_url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop",
      creator_username: "vr_innovator",
      created_at: "2024-01-13T09:15:00Z",
      average_rating: 4.5,
      rating_count: 19,
      comment_count: 6,
      status: "approved"
    },
    {
      id: 4,
      title: "Blockchain Property Transactions",
      short_description: "Decentralized ledger technology for secure, transparent, and efficient property transactions.",
      content_type: "technology",
      industry: "Real Estate",
      time_horizon: "medium",
      image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      creator_username: "blockchain_dev",
      created_at: "2024-01-12T16:45:00Z",
      average_rating: 3.9,
      rating_count: 11,
      comment_count: 4,
      status: "approved"
    },
    {
      id: 5,
      title: "Co-living and Flexible Spaces",
      short_description: "Rising demand for flexible living arrangements and shared spaces in urban environments.",
      content_type: "trend",
      industry: "Real Estate",
      time_horizon: "short",
      image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      creator_username: "urban_planner",
      created_at: "2024-01-11T11:20:00Z",
      average_rating: 4.3,
      rating_count: 17,
      comment_count: 9,
      status: "approved"
    }
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setContents(mockContents)
      setFilteredContents(mockContents)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = contents

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.short_description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(content => content.content_type === selectedType)
    }

    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(content => content.industry === selectedIndustry)
    }

    setFilteredContents(filtered)
  }, [contents, searchTerm, selectedType, selectedIndustry])

  const handleRate = (contentId, rating) => {
    console.log(`Rating content ${contentId} with ${rating} stars`)
    // Here you would make an API call to rate the content
  }

  const handleComment = (content) => {
    console.log(`Opening comment dialog for content ${content.id}`)
    // Here you would open a comment dialog or navigate to detail view
  }

  const handleView = (content) => {
    console.log(`Viewing details for content ${content.id}`)
    // Here you would navigate to detail view or open a modal
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4" />
      case 'technology': return <Cpu className="h-4 w-4" />
      case 'inspiration': return <Lightbulb className="h-4 w-4" />
      default: return null
    }
  }

  const typeStats = {
    all: contents.length,
    trend: contents.filter(c => c.content_type === 'trend').length,
    technology: contents.filter(c => c.content_type === 'technology').length,
    inspiration: contents.filter(c => c.content_type === 'inspiration').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
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
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search trends, technologies, inspirations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types ({typeStats.all})</SelectItem>
                    <SelectItem value="trend">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon('trend')}
                        <span>Trends ({typeStats.trend})</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="technology">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon('technology')}
                        <span>Technologies ({typeStats.technology})</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="inspiration">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon('inspiration')}
                        <span>Inspirations ({typeStats.inspiration})</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Stats */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="secondary">
          {filteredContents.length} results
        </Badge>
        {searchTerm && (
          <Badge variant="outline">
            Search: "{searchTerm}"
          </Badge>
        )}
        {selectedType !== 'all' && (
          <Badge variant="outline">
            Type: {selectedType}
          </Badge>
        )}
        {selectedIndustry !== 'all' && (
          <Badge variant="outline">
            Industry: {selectedIndustry}
          </Badge>
        )}
      </div>

      {/* Content Grid/List */}
      {filteredContents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredContents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onRate={handleRate}
              onComment={handleComment}
              onView={handleView}
              compact={viewMode === 'list'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExploreSelect

