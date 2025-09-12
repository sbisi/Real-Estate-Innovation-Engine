import { useState } from 'react'

// Simple SVG Icons (NO external dependencies)
const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const LinkIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
)

const UploadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const FileTextIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

const Input = ({ className = '', ...props }) => (
  <input className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

const Textarea = ({ className = '', ...props }) => (
  <textarea className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

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

const AddConnect = () => {
  const [activeTab, setActiveTab] = useState('manual')
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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      setTimeout(() => {
        setSubmitSuccess(false)
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
      }, 2000)
    }, 1500)
  }

  const tabs = [
    {
      id: 'manual',
      name: 'Manual Entry',
      icon: FileTextIcon,
      description: 'Create content manually'
    },
    {
      id: 'url',
      name: 'From URL',
      icon: GlobeIcon,
      description: 'Import from web source'
    },
    {
      id: 'upload',
      name: 'Upload File',
      icon: UploadIcon,
      description: 'Upload document or file'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add & Connect</h2>
        <p className="text-gray-600">
          Add new content and connect it with existing trends and technologies
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center">
            <CheckIcon />
            <span className="ml-2 text-green-800 font-medium">
              Content added successfully!
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Create New Content</CardTitle>
              <CardDescription>
                Choose how you want to add content to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </div>

              <div className="space-y-6">
                {activeTab === 'manual' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter content title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description *
                      </label>
                      <Textarea
                        value={formData.short_description}
                        onChange={(e) => handleInputChange('short_description', e.target.value)}
                        placeholder="Brief description (max 200 characters)"
                        rows={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detailed Description
                      </label>
                      <Textarea
                        value={formData.long_description}
                        onChange={(e) => handleInputChange('long_description', e.target.value)}
                        placeholder="Detailed description of the content"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content Type *
                        </label>
                        <select 
                          value={formData.content_type} 
                          onChange={(e) => handleInputChange('content_type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select type</option>
                          <option value="technology">Technology</option>
                          <option value="trend">Trend</option>
                          <option value="inspiration">Inspiration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry *
                        </label>
                        <select 
                          value={formData.industry} 
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select industry</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time Horizon *
                        </label>
                        <select 
                          value={formData.time_horizon} 
                          onChange={(e) => handleInputChange('time_horizon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select horizon</option>
                          <option value="short">Short Term</option>
                          <option value="medium">Medium Term</option>
                          <option value="long">Long Term</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL (Optional)
                      </label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => handleInputChange('image_url', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'url' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Source URL *
                      </label>
                      <Input
                        value={formData.url_source}
                        onChange={(e) => handleInputChange('url_source', e.target.value)}
                        placeholder="https://example.com/article"
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> We'll automatically extract content from the provided URL.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'upload' && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <UploadIcon />
                      <div className="mt-4">
                        <p className="text-lg font-medium text-gray-900">Upload a file</p>
                        <p className="text-gray-600">Drag and drop or click to browse</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Supported formats: PDF, DOC, DOCX, TXT (max 10MB)
                        </p>
                      </div>
                      <Button className="mt-4">
                        Choose File
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.title || !formData.short_description}
                    className="flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon />
                        <span>Create Content</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {formData.content_type && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Content Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary">
                    {formData.content_type}
                  </Badge>
                  {formData.title && (
                    <h4 className="font-semibold">{formData.title}</h4>
                  )}
                  {formData.short_description && (
                    <p className="text-sm text-gray-600">{formData.short_description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Tips for Quality Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckIcon />
                  <span>Use clear, descriptive titles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon />
                  <span>Provide concise but informative descriptions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon />
                  <span>Select appropriate categories</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon />
                  <span>Include relevant source links</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddConnect

