import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Plus, Link, Upload, Globe, FileText, TrendingUp, Cpu, Lightbulb, Check } from 'lucide-react'

const AddConnect = () => {
  const [activeTab, setActiveTab] = useState('manual') // 'manual', 'url', 'upload'
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    long_description: '',
    content_type: '',
    industry: '',
    time_horizon: '',
    image_url: '',
    url_source: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting content:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          title: '',
          short_description: '',
          long_description: '',
          content_type: '',
          industry: '',
          time_horizon: '',
          image_url: '',
          url_source: ''
        })
        setSubmitSuccess(false)
      }, 2000)
    }, 1500)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4" />
      case 'technology': return <Cpu className="h-4 w-4" />
      case 'inspiration': return <Lightbulb className="h-4 w-4" />
      default: return null
    }
  }

  const inputMethods = [
    {
      id: 'manual',
      name: 'Manual Entry',
      icon: FileText,
      description: 'Manually enter content details'
    },
    {
      id: 'url',
      name: 'From URL',
      icon: Globe,
      description: 'Import content from a website URL'
    },
    {
      id: 'upload',
      name: 'File Upload',
      icon: Upload,
      description: 'Upload content from a file'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add & Connect</h2>
        <p className="text-gray-600">
          Add new trends, technologies, and inspirations to the innovation engine
        </p>
      </div>

      {/* Input Method Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Input Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inputMethods.map((method) => {
            const Icon = method.icon
            return (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all ${
                  activeTab === method.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveTab(method.id)}
              >
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 mb-2">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Content Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Content</span>
          </CardTitle>
          <CardDescription>
            Fill in the details for your new {formData.content_type || 'content'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Added Successfully!</h3>
              <p className="text-gray-600">Your content has been submitted for review.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input (if URL method selected) */}
              {activeTab === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source URL
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="https://example.com/article"
                      value={formData.url_source}
                      onChange={(e) => handleInputChange('url_source', e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      <Link className="h-4 w-4 mr-2" />
                      Extract
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll automatically extract content details from the URL
                  </p>
                </div>
              )}

              {/* File Upload (if upload method selected) */}
              {activeTab === 'upload' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drop your file here or click to browse
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: PDF, DOC, TXT, Excel
                    </p>
                  </div>
                </div>
              )}

              {/* Content Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type *
                </label>
                <Select value={formData.content_type} onValueChange={(value) => handleInputChange('content_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trend">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Trend</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="technology">
                      <div className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4" />
                        <span>Technology</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="inspiration">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>Inspiration</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <Textarea
                  placeholder="Brief summary (1-2 sentences)"
                  value={formData.short_description}
                  onChange={(e) => handleInputChange('short_description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                </label>
                <Textarea
                  placeholder="Detailed explanation, implications, and potential applications"
                  value={formData.long_description}
                  onChange={(e) => handleInputChange('long_description', e.target.value)}
                  rows={5}
                />
              </div>

              {/* Industry and Time Horizon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Horizon
                  </label>
                  <Select value={formData.time_horizon} onValueChange={(value) => handleInputChange('time_horizon', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time horizon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short Term (0-2 years)</SelectItem>
                      <SelectItem value="medium">Medium Term (2-5 years)</SelectItem>
                      <SelectItem value="long">Long Term (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Add an image to make your content more engaging
                </p>
              </div>

              {/* Preview */}
              {formData.title && formData.content_type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={
                          formData.content_type === 'trend' ? 'bg-blue-100 text-blue-800' :
                          formData.content_type === 'technology' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {getTypeIcon(formData.content_type)}
                          <span className="ml-1">{formData.content_type}</span>
                        </Badge>
                        {formData.industry && (
                          <Badge variant="outline">{formData.industry}</Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900">{formData.title}</h4>
                      {formData.short_description && (
                        <p className="text-sm text-gray-600 mt-1">{formData.short_description}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.title || !formData.content_type || !formData.short_description}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Content
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AddConnect

