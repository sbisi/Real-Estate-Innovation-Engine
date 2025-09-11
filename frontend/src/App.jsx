import React, { useState, useEffect } from 'react'

function App() {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState('explore')

  // Backend URL
  const API_BASE_URL = 'https://rei-backend-mtcr.onrender.com/api'

  // Demo data
  const demoContents = [
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
      comment_count: 8
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
      comment_count: 12
    },
    {
      id: 3,
      title: "Virtual Property Tours Platform",
      short_description: "Innovative VR/AR platform enabling immersive virtual property viewings and remote inspections.",
      content_type: "inspiration",
      industry: "Real Estate",
      time_horizon: "medium",
      creator_username: "vr_innovator",
      created_at: "2024-01-13T09:15:00Z",
      average_rating: 4.5,
      rating_count: 19,
      comment_count: 6
    }
  ]

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contents`)
      if (response.ok) {
        const data = await response.json()
        setContents(data)
        console.log('✅ Backend connected successfully')
      } else {
        throw new Error('Backend not available')
      }
    } catch (error) {
      console.log('⚠️ Using demo data:', error.message)
      setContents(demoContents)
    } finally {
      setLoading(false)
    }
  }

  const modules = [
    { id: 'explore', name: 'Explore & Select', icon: '🔍' },
    { id: 'add', name: 'Add & Connect', icon: '➕' },
    { id: 'rate', name: 'Rate & Create', icon: '📊' },
    { id: 'ideate', name: 'Ideate & Realize', icon: '💡' },
    { id: 'dashboard', name: 'Trend Dashboard', icon: '📈' },
    { id: 'analytics', name: 'Trend Analytics', icon: '⚡' }
  ]

  const getBadgeClass = (type) => {
    const classes = {
      technology: 'badge badge-blue',
      trend: 'badge badge-green',
      inspiration: 'badge badge-purple'
    }
    return classes[type] || 'badge badge-blue'
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className="stars">
        {i < Math.round(rating) ? '★' : '☆'}
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading Digital Real Estate Innovation Engine...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                Digital Real Estate Innovation Engine
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                Powered by AI & Data Analytics
              </p>
            </div>
            <div className="logo">
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>pom</span>
              <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>+</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="nav">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`nav-button ${activeModule === module.id ? 'active' : ''}`}
              >
                <span>{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
            <p style={{ color: '#6b7280' }}>
              Discover trends, technologies, and inspirations in the real estate industry
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid">
            {contents.map(content => (
              <div key={content.id} className="card">
                {/* Badge */}
                <span className={getBadgeClass(content.content_type)}>
                  {content.content_type}
                </span>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {content.title}
                </h3>

                {/* Description */}
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '0.875rem', 
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {content.short_description}
                </p>

                {/* Meta */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '1rem'
                }}>
                  <span>by {content.creator_username}</span>
                  <span>{new Date(content.created_at).toLocaleDateString('de-DE')}</span>
                </div>

                {/* Rating */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div>{renderStars(content.average_rating || 0)}</div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {content.average_rating?.toFixed(1) || '0.0'} ({content.rating_count || 0})
                  </span>
                </div>

                {/* Actions */}
                <div>
                  <button className="btn btn-primary">
                    💬 Comments ({content.comment_count || 0})
                  </button>
                  <button className="btn btn-secondary">
                    👁️ Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="status">
            ✅ Application running successfully! 
            Backend: {contents === demoContents ? 'Demo Mode' : 'Connected'} | 
            Content Items: {contents.length}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

