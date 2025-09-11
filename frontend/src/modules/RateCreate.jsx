import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import ContentCard from '../ContentCard.jsx'
import { Star, Plus, Target, TrendingUp, Lightbulb, Users, BarChart3 } from 'lucide-react'

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
      average_rating: 4.2,
      rating_count: 15,
      comment_count: 8,
      user_rating: null
    },
    {
      id: 2,
      title: "Sustainable Urban Development",
      short_description: "Growing trend towards eco-friendly and sustainable urban planning and development practices.",
      content_type: "trend",
      industry: "Real Estate",
      average_rating: 4.7,
      rating_count: 23,
      comment_count: 12,
      user_rating: 5
    },
    {
      id: 3,
      title: "Virtual Property Tours Platform",
      short_description: "Innovative VR/AR platform enabling immersive virtual property viewings and remote inspections.",
      content_type: "inspiration",
      industry: "Real Estate",
      average_rating: 4.5,
      rating_count: 19,
      comment_count: 6,
      user_rating: 4
    }
  ]

  const mockOpportunitySpaces = [
    {
      id: 1,
      title: "Smart Sustainable Buildings",
      description: "Combining IoT technology with sustainable practices for next-generation building management",
      content_count: 3,
      average_score: 4.2,
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Virtual Real Estate Experience",
      description: "Leveraging VR/AR technology to transform property viewing and marketing",
      content_count: 2,
      average_score: 4.5,
      created_at: "2024-01-14T14:30:00Z"
    }
  ]

  useEffect(() => {
    setSelectedContents(mockSelectedContents)
    setOpportunitySpaces(mockOpportunitySpaces)
  }, [])

  const handleRateContent = (contentId, rating, criteria = 'overall') => {
    setSelectedContents(prev => prev.map(content => 
      content.id === contentId 
        ? { ...content, user_rating: rating }
        : content
    ))
    console.log(`Rating content ${contentId}: ${rating} stars for ${criteria}`)
  }

  const handleCreateOpportunitySpace = () => {
    if (!newSpace.title.trim()) return

    const space = {
      id: Date.now(),
      ...newSpace,
      content_count: 0,
      average_score: 0,
      created_at: new Date().toISOString()
    }

    setOpportunitySpaces(prev => [space, ...prev])
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

  const RatingStars = ({ rating, onRate, size = 'sm' }) => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate && onRate(star)}
            className={`${starSize} ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${onRate ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          >
            <Star className={starSize} />
          </button>
        ))}
      </div>
    )
  }

  const CriteriaRating = ({ label, value, onChange, description }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500">{value}/5</span>
      </div>
      <RatingStars rating={value} onRate={onChange} />
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Rate & Create</h2>
        <p className="text-gray-600">
          Evaluate selected content and create strategic opportunity spaces
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selected Content for Rating */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Selected Content</h3>
            <Badge variant="secondary">
              {selectedContents.length} items
            </Badge>
          </div>

          {selectedContents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Content Selected</h4>
                <p className="text-gray-600 mb-4">
                  Go to Explore & Select to choose content for evaluation
                </p>
                <Button variant="outline">
                  Explore Content
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {selectedContents.map((content) => (
                <Card key={content.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{content.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {content.short_description}
                        </CardDescription>
                      </div>
                      <Badge className={
                        content.content_type === 'trend' ? 'bg-blue-100 text-blue-800' :
                        content.content_type === 'technology' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }>
                        {content.content_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Overall Rating */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Your Overall Rating</h5>
                        <div className="flex items-center space-x-3">
                          <RatingStars 
                            rating={content.user_rating || 0} 
                            onRate={(rating) => handleRateContent(content.id, rating)}
                          />
                          <span className="text-sm text-gray-500">
                            {content.user_rating ? `${content.user_rating}/5` : 'Not rated'}
                          </span>
                        </div>
                      </div>

                      {/* Community Rating */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Community Rating</h5>
                        <div className="flex items-center space-x-3">
                          <RatingStars rating={Math.round(content.average_rating)} />
                          <span className="text-sm text-gray-500">
                            {content.average_rating.toFixed(1)}/5 ({content.rating_count} ratings)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Criteria Rating */}
                    <div className="mt-6 pt-6 border-t">
                      <h5 className="font-medium text-gray-900 mb-4">Detailed Evaluation</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CriteriaRating
                          label="Relevance"
                          value={0}
                          onChange={(rating) => handleRateContent(content.id, rating, 'relevance')}
                          description="How relevant is this to your business?"
                        />
                        <CriteriaRating
                          label="Feasibility"
                          value={0}
                          onChange={(rating) => handleRateContent(content.id, rating, 'feasibility')}
                          description="How feasible is implementation?"
                        />
                        <CriteriaRating
                          label="Impact"
                          value={0}
                          onChange={(rating) => handleRateContent(content.id, rating, 'impact')}
                          description="What's the potential business impact?"
                        />
                        <CriteriaRating
                          label="Innovation"
                          value={0}
                          onChange={(rating) => handleRateContent(content.id, rating, 'innovation')}
                          description="How innovative is this approach?"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-2">
                      <Button variant="outline" size="sm">
                        Add Comment
                      </Button>
                      <Button variant="outline" size="sm">
                        Add to Opportunity Space
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Opportunity Spaces */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Opportunity Spaces</h3>
            <Button 
              size="sm" 
              onClick={() => setShowCreateSpace(true)}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Create</span>
            </Button>
          </div>

          {/* Create New Opportunity Space */}
          {showCreateSpace && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Create Opportunity Space</CardTitle>
                <CardDescription>
                  Define a strategic area for innovation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="e.g., Smart Building Solutions"
                    value={newSpace.title}
                    onChange={(e) => setNewSpace(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe the opportunity and its potential..."
                    value={newSpace.description}
                    onChange={(e) => setNewSpace(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleCreateOpportunitySpace}
                    disabled={!newSpace.title.trim()}
                    className="flex-1"
                  >
                    Create Space
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateSpace(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Opportunity Spaces */}
          <div className="space-y-4">
            {opportunitySpaces.map((space) => (
              <Card key={space.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{space.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {space.description}
                      </CardDescription>
                    </div>
                    <Target className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        {space.content_count} items
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {space.average_score.toFixed(1)}
                      </span>
                    </div>
                    <span>
                      {new Date(space.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {opportunitySpaces.length === 0 && !showCreateSpace && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">No Opportunity Spaces</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Create strategic spaces to organize your innovation efforts
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => setShowCreateSpace(true)}
                  >
                    Create First Space
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateCreate

