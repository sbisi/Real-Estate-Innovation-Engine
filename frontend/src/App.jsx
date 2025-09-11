import React, { useState, useEffect } from 'react'

console.log('App.jsx loaded')

function App() {
  console.log('App component rendering')
  
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState('explore')

  // Navigation modules configuration
  const modules = [
    { id: 'explore', name: 'Explore & Select', color: '#10b981' },
    { id: 'connect', name: 'Add & Connect', color: '#3b82f6' },
    { id: 'create', name: 'Rate & Create', color: '#f59e0b' },
    { id: 'realize', name: 'Ideate & Realize', color: '#8b5cf6' },
    { id: 'dashboard', name: 'Trend Dashboard', color: '#06b6d4' },
    { id: 'analytics', name: 'Trend Analytics', color: '#ec4899' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleModuleClick = (moduleId) => {
    console.log('Switching to module:', moduleId)
    setActiveModule(moduleId)
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        <div>
          <div style={{ marginBottom: '20px' }}>⏳ Loading Real Estate Innovation Engine...</div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                margin: 0,
                marginBottom: '0.25rem'
              }}>
                Digital Real Estate Innovation Engine
              </h1>
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#6b7280',
                margin: 0
              }}>
                suprise for Rebekka
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Powered by</span>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                color: '#000'
              }}>
                pom<span style={{ color: '#10b981' }}>+</span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    backgroundColor: activeModule === module.id ? module.color : '#f3f4f6',
                    color: activeModule === module.id ? 'white' : '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: activeModule === module.id ? 'translateY(-1px)' : 'none',
                    boxShadow: activeModule === module.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeModule !== module.id) {
                      e.target.style.backgroundColor = '#e5e7eb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeModule !== module.id) {
                      e.target.style.backgroundColor = '#f3f4f6'
                    }
                  }}
                >
                  {module.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content - Different Components for Each Module */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {activeModule === 'explore' && <ExploreSelectModule />}
        {activeModule === 'connect' && <AddConnectModule />}
        {activeModule === 'create' && <RateCreateModule />}
        {activeModule === 'realize' && <IdeateRealizeModule />}
        {activeModule === 'dashboard' && <TrendDashboardModule />}
        {activeModule === 'analytics' && <TrendAnalyticsModule />}
      </main>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// EXPLORE & SELECT MODULE - Search and Filter Interface
const ExploreSelectModule = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const mockContents = [
    {
      id: 1,
      title: "Smart Building IoT Integration",
      description: "Internet of Things sensors for intelligent building management.",
      type: "technology",
      rating: 4.2,
      comments: 8,
      image: "🏢"
    },
    {
      id: 2,
      title: "Sustainable Urban Development",
      description: "Eco-friendly urban planning and development practices.",
      type: "trend",
      rating: 4.7,
      comments: 12,
      image: "🌱"
    },
    {
      id: 3,
      title: "Virtual Property Tours",
      description: "VR/AR platform for immersive property viewings.",
      type: "inspiration",
      rating: 4.5,
      comments: 6,
      image: "🥽"
    }
  ]

  const filteredContents = mockContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || content.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Explore & Select
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Discover trends, technologies, and inspirations in the real estate industry
      </p>

      {/* Search and Filters */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search trends, technologies, inspirations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '300px',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            🔍 Filters
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.75rem',
                backgroundColor: viewMode === 'grid' ? '#3b82f6' : '#f3f4f6',
                color: viewMode === 'grid' ? 'white' : '#374151',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.75rem',
                backgroundColor: viewMode === 'list' ? '#3b82f6' : '#f3f4f6',
                color: viewMode === 'list' ? 'white' : '#374151',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              ☰ List
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Content Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              >
                <option value="all">All Types</option>
                <option value="trend">Trends</option>
                <option value="technology">Technologies</option>
                <option value="inspiration">Inspirations</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ 
          backgroundColor: '#e5e7eb', 
          padding: '0.25rem 0.75rem', 
          borderRadius: '9999px', 
          fontSize: '0.875rem' 
        }}>
          {filteredContents.length} results
        </span>
      </div>

      {/* Content Grid/List */}
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr'
      }}>
        {filteredContents.map((content) => (
          <div
            key={content.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>{content.image}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {content.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {content.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: getTypeColor(content.type),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem'
                  }}>
                    {content.type}
                  </span>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                    <span>⭐ {content.rating}</span>
                    <span>💬 {content.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ADD & CONNECT MODULE - Form Interface
const AddConnectModule = () => {
  const [activeTab, setActiveTab] = useState('manual')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    url: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Content submitted successfully!')
    setFormData({ title: '', description: '', type: '', url: '' })
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Add & Connect
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Add new content to the platform and connect with the community
      </p>

      {/* Input Method Tabs */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {[
            { id: 'manual', name: 'Manual Entry', icon: '📝' },
            { id: 'url', name: 'From URL', icon: '🌐' },
            { id: 'upload', name: 'File Upload', icon: '📁' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem',
                backgroundColor: activeTab === tab.id ? '#3b82f6' : 'white',
                color: activeTab === tab.id ? 'white' : '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter a descriptive title..."
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the content in detail..."
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Content Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            >
              <option value="">Select type...</option>
              <option value="trend">Trend</option>
              <option value="technology">Technology</option>
              <option value="inspiration">Inspiration</option>
            </select>
          </div>

          {activeTab === 'url' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Source URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://example.com/article"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            ➕ Add Content
          </button>
        </form>
      </div>
    </div>
  )
}

// RATE & CREATE MODULE - Rating Interface
const RateCreateModule = () => {
  const [selectedContent, setSelectedContent] = useState(null)
  const [ratings, setRatings] = useState({
    relevance: 0,
    feasibility: 0,
    impact: 0,
    innovation: 0
  })

  const contents = [
    { id: 1, title: "Smart Building IoT", type: "technology" },
    { id: 2, title: "Sustainable Development", type: "trend" },
    { id: 3, title: "Virtual Tours", type: "inspiration" }
  ]

  const handleRating = (criterion, value) => {
    setRatings({...ratings, [criterion]: value})
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Rate & Create
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Rate content and create strategic opportunity spaces
      </p>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
        {/* Content Selection */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Select Content to Rate
          </h3>
          {contents.map((content) => (
            <div
              key={content.id}
              onClick={() => setSelectedContent(content)}
              style={{
                padding: '1rem',
                border: selectedContent?.id === content.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                backgroundColor: selectedContent?.id === content.id ? '#eff6ff' : 'white'
              }}
            >
              <div style={{ fontWeight: '500' }}>{content.title}</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{content.type}</div>
            </div>
          ))}
        </div>

        {/* Rating Interface */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Rate Selected Content
          </h3>
          {selectedContent ? (
            <div>
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
                <strong>{selectedContent.title}</strong>
              </div>
              
              {Object.entries({
                relevance: 'Business Relevance',
                feasibility: 'Implementation Feasibility',
                impact: 'Potential Impact',
                innovation: 'Innovation Level'
              }).map(([key, label]) => (
                <div key={key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    {label}
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(key, star)}
                        style={{
                          fontSize: '1.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: star <= ratings[key] ? '#fbbf24' : '#d1d5db'
                        }}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              <button
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                💾 Save Rating
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
              Select content to start rating
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// IDEATE & REALIZE MODULE - Project Management
const IdeateRealizeModule = () => {
  const [projects] = useState([
    { id: 1, name: "Smart Building Implementation", status: "In Progress", progress: 65, team: 5 },
    { id: 2, name: "VR Tour Platform", status: "Planning", progress: 25, team: 3 },
    { id: 3, name: "Sustainability Initiative", status: "Concept", progress: 10, team: 2 }
  ])

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Ideate & Realize
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Transform ideas into viable projects and track their progress
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {project.name}
                </h3>
                <span style={{
                  backgroundColor: getStatusColor(project.status),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem'
                }}>
                  {project.status}
                </span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>
                👥 {project.team} team members
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Progress</span>
                <span style={{ fontSize: '0.875rem' }}>{project.progress}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e5e7eb', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  height: '100%',
                  backgroundColor: '#10b981',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}>
                📊 View Details
              </button>
              <button style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}>
                ✏️ Edit Project
              </button>
            </div>
          </div>
        ))}
        
        <button style={{
          backgroundColor: '#8b5cf6',
          color: 'white',
          padding: '1rem',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          ➕ Create New Project
        </button>
      </div>
    </div>
  )
}

// TREND DASHBOARD MODULE - Charts and Metrics
const TrendDashboardModule = () => {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Trend Dashboard
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Monitor real-time trends and metrics in the real estate market
      </p>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Metric Cards */}
        {[
          { title: "Active Trends", value: "127", change: "+12%", icon: "📈" },
          { title: "New Technologies", value: "43", change: "+8%", icon: "🔧" },
          { title: "User Engagement", value: "89%", change: "+5%", icon: "👥" },
          { title: "Innovation Score", value: "8.7", change: "+0.3", icon: "💡" }
        ].map((metric, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {metric.title}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {metric.value}
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>{metric.icon}</div>
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#10b981',
              fontWeight: '500'
            }}>
              {metric.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Trend Analysis Chart
        </h3>
        <div style={{ 
          height: '200px', 
          backgroundColor: '#f9fafb', 
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem'
        }}>
          📊
        </div>
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          Interactive charts and visualizations would be displayed here
        </p>
      </div>
    </div>
  )
}

// TREND ANALYTICS MODULE - Advanced Analytics
const TrendAnalyticsModule = () => {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Trend Analytics
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Advanced analytics and predictions for real estate innovation
      </p>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Prediction Cards */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🔮 Market Predictions
          </h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              { trend: "Smart Home Integration", probability: "92%", timeframe: "Next 6 months" },
              { trend: "Sustainable Materials", probability: "87%", timeframe: "Next 12 months" },
              { trend: "Virtual Reality Tours", probability: "78%", timeframe: "Next 18 months" }
            ].map((prediction, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                  {prediction.trend}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {prediction.timeframe}
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#10b981' 
                }}>
                  {prediction.probability}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Tools */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🧮 Analytics Tools
          </h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {[
              { name: "Correlation Analysis", icon: "🔗" },
              { name: "Sentiment Analysis", icon: "😊" },
              { name: "Risk Assessment", icon: "⚠️" },
              { name: "ROI Calculator", icon: "💰" },
              { name: "Market Simulator", icon: "🎮" },
              { name: "Trend Forecasting", icon: "🔮" }
            ].map((tool, index) => (
              <button
                key={index}
                style={{
                  padding: '1rem',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                <span style={{ fontSize: '1.2rem' }}>{tool.icon}</span>
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getTypeColor(type) {
  const colors = {
    trend: '#10b981',
    technology: '#3b82f6',
    inspiration: '#8b5cf6'
  }
  return colors[type] || '#6b7280'
}

function getStatusColor(status) {
  const colors = {
    'In Progress': '#10b981',
    'Planning': '#f59e0b',
    'Concept': '#6b7280'
  }
  return colors[status] || '#6b7280'
}

export default App

