import { useState, useEffect } from 'react'

// Simple SVG Icons (NO external dependencies)
const StarIcon = ({ filled = false }) => (
  <svg className="h-5 w-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ThumbsUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
)

const MessageCircleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const SendIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

// Local UI Components (NO external dependencies)
const Button = ({ children, onClick, className = '', variant = 'default', disabled = false }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className}`}>
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

const Textarea = ({ className = '', ...props }) => (
  <textarea className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

const RateCreate = () => {
  const [contents, setContents] = useState([])
  const [selectedContent, setSelectedContent] = useState(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)

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
      user_rating: null,
      user_comment: null
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
      user_rating: 5,
      user_comment: "Excellent trend analysis!"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setContents(mockContents)
      setLoading(false)
    }, 1000)
  }, [])

  const handleRateContent = (contentId, newRating, newComment) => {
    setContents(prev => prev.map(content => {
      if (content.id === contentId) {
        const wasRated = content.user_rating !== null
        const ratingDiff = newRating - (content.user_rating || 0)
        const newRatingCount = wasRated ? content.rating_count : content.rating_count + 1
        const newAverageRating = wasRated 
          ? ((content.average_rating * content.rating_count) - (content.user_rating || 0) + newRating) / content.rating_count
          : ((content.average_rating * content.rating_count) + newRating) / newRatingCount

        return {
          ...content,
          user_rating: newRating,
          user_comment: newComment,
          average_rating: Math.round(newAverageRating * 10) / 10,
          rating_count: newRatingCount,
          comment_count: newComment && !content.user_comment ? content.comment_count + 1 : content.comment_count
        }
      }
      return content
    }))

    setSelectedContent(null)
    setRating(0)
    setComment('')
  }

  const StarRating = ({ value, onChange, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
            onClick={() => !readonly && onChange && onChange(star)}
            onMouseEnter={() => !readonly && setHoverRating && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating && setHoverRating(0)}
          >
            <StarIcon 
              filled={star <= (readonly ? value : (hoverRating || rating))} 
              className={star <= (readonly ? value : (hoverRating || rating)) ? 'text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Rate & Create</h2>
        <p className="text-gray-600">
          Rate existing content and create reviews to help the community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contents.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={content.image_url} 
                alt={content.title}
                className="w-full h-full object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hidden w-full h-full bg-gray-200 items-center justify-center rounded-t-lg">
                <span className="text-gray-400">Image placeholder</span>
              </div>
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge variant="secondary">
                  {content.content_type}
                </Badge>
                <Badge variant="default">
                  {content.industry}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{content.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                by {content.creator_username} • {new Date(content.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                {content.short_description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StarRating value={content.average_rating} readonly />
                  <span className="text-sm text-gray-600">
                    {content.average_rating} ({content.rating_count} ratings)
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <ThumbsUpIcon />
                    <span className="text-sm text-gray-600">{content.rating_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircleIcon />
                    <span className="text-sm text-gray-600">{content.comment_count}</span>
                  </div>
                </div>
              </div>

              {content.user_rating ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">Your Rating:</span>
                    <StarRating value={content.user_rating} readonly />
                  </div>
                  {content.user_comment && (
                    <p className="text-sm text-green-700">"{content.user_comment}"</p>
                  )}
                  <Button
                    variant="outline"
                    className="mt-2 text-sm"
                    onClick={() => {
                      setSelectedContent(content)
                      setRating(content.user_rating)
                      setComment(content.user_comment || '')
                    }}
                  >
                    Edit Rating
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setSelectedContent(content)}
                  className="w-full"
                >
                  Rate This Content
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rating Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedContent.user_rating ? 'Edit Rating' : 'Rate Content'}
            </h3>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">{selectedContent.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedContent.short_description}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex items-center space-x-2">
                <StarRating 
                  value={rating} 
                  onChange={setRating}
                />
                <span className="text-sm text-gray-600">
                  {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment (Optional)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this content..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedContent(null)
                  setRating(0)
                  setComment('')
                  setHoverRating(0)
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleRateContent(selectedContent.id, rating, comment)}
                disabled={rating === 0}
                className="flex items-center space-x-2"
              >
                <SendIcon />
                <span>{selectedContent.user_rating ? 'Update' : 'Submit'} Rating</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Rating Activity</CardTitle>
            <CardDescription>
              Overview of your contributions to the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {contents.filter(c => c.user_rating).length}
                </div>
                <div className="text-sm text-gray-600">Contents Rated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {contents.filter(c => c.user_comment).length}
                </div>
                <div className="text-sm text-gray-600">Comments Written</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {contents.filter(c => c.user_rating).length > 0 
                    ? Math.round(contents.filter(c => c.user_rating).reduce((sum, c) => sum + c.user_rating, 0) / contents.filter(c => c.user_rating).length * 10) / 10
                    : 0}
                </div>
                <div className="text-sm text-gray-600">Average Rating Given</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RateCreate

