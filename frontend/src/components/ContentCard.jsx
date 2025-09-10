import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ThumbsUp, ThumbsDown, Star, MessageCircle, Eye, MoreHorizontal } from 'lucide-react'

const ContentCard = ({ content, onRate, onComment, onView, compact = false }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const getTypeColor = (type) => {
    switch (type) {
      case 'trend': return 'bg-blue-100 text-blue-800'
      case 'technology': return 'bg-green-100 text-green-800'
      case 'inspiration': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (onRate) {
      onRate(content.id, isLiked ? 4 : 5) // Simple like/unlike rating
    }
  }

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onView && onView(content)}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            {content.image_url && (
              <img 
                src={content.image_url} 
                alt={content.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge className={getTypeColor(content.content_type)}>
                  {content.content_type}
                </Badge>
                {content.industry && (
                  <Badge variant="outline" className="text-xs">
                    {content.industry}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm truncate">{content.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                {content.short_description}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  {content.average_rating?.toFixed(1) || '0.0'}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {content.comment_count || 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={getTypeColor(content.content_type)}>
              {content.content_type}
            </Badge>
            {content.industry && (
              <Badge variant="outline">
                {content.industry}
              </Badge>
            )}
            {content.time_horizon && (
              <Badge variant="secondary">
                {content.time_horizon} term
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-lg">{content.title}</CardTitle>
        {content.creator_username && (
          <CardDescription>
            by {content.creator_username} • {new Date(content.created_at).toLocaleDateString()}
          </CardDescription>
        )}
      </CardHeader>

      {content.image_url && (
        <div className="px-6">
          <img 
            src={content.image_url} 
            alt={content.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <CardContent className="pt-4">
        <p className="text-gray-700 mb-4">
          {content.short_description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView && onView(content)}
              className="flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              {content.average_rating?.toFixed(1) || '0.0'} ({content.rating_count || 0})
            </span>
            <span className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              {content.comment_count || 0}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="mt-4 pt-4 border-t flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onComment && onComment(content)}>
              Add Comment
            </Button>
            <Button variant="outline" size="sm">
              Add to Playlist
            </Button>
            <Button variant="outline" size="sm">
              Add to Opportunity Space
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ContentCard

