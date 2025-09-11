import React, { useState, useEffect } from 'react'

console.log('App.jsx loaded')

function App() {
  console.log('App component rendering')
  
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState('explore')
  const [contents, setContents] = useState([])

  // Navigation modules configuration
  const modules = [
    { id: 'explore', name: 'Explore & Select', color: '#10b981' },
    { id: 'connect', name: 'Add & Connect', color: '#3b82f6' },
    { id: 'create', name: 'Rate & Create', color: '#f59e0b' },
    { id: 'realize', name: 'Ideate & Realize', color: '#8b5cf6' },
    { id: 'dashboard', name: 'Trend Dashboard', color: '#06b6d4' },
    { id: 'analytics', name: 'Trend Analytics', color: '#ec4899' }
  ]

  // Demo data for different modules - FIXED: Moved outside useEffect
  const getModuleData = (moduleId) => {
    const moduleData = {
      explore: [
        {
          id: 1,
          title: "Smart Building IoT Integration",
          description: "Internet of Things sensors for intelligent building management.",
          type: "technology",
          creator: "tech_expert",
          rating: 4.2,
          comments: 8
        },
        {
          id: 2,
          title: "Sustainable Urban Development", 
          description: "Eco-friendly urban planning and development practices.",
          type: "trend",
          creator: "sustainability_pro",
          rating: 4.7,
          comments: 12
        },
        {
          id: 3,
          title: "Virtual Property Tours",
          description: "VR/AR platform for immersive property viewings.",
          type: "innovation", 
          creator: "vr_innovator",
          rating: 4.5,
          comments: 6
        }
      ],
      connect: [
        {
          id: 4,
          title: "PropTech Network Hub",
          description: "Connect with real estate technology innovators and startups.",
          type: "network",
          creator: "network_admin",
          rating: 4.3,
          comments: 15
        },
        {
          id: 5,
          title: "API Integration Platform",
          description: "Seamlessly integrate multiple real estate data sources.",
          type: "integration",
          creator: "api_specialist",
          rating: 4.6,
          comments: 9
        },
        {
          id: 6,
          title: "Partnership Opportunities",
          description: "Discover collaboration opportunities with industry leaders.",
          type: "partnership",
          creator: "business_dev",
          rating: 4.4,
          comments: 11
        }
      ],
      create: [
        {
          id: 7,
          title: "Innovation Rating System",
          description: "Rate and review emerging real estate technologies.",
          type: "rating",
          creator: "innovation_expert",
          rating: 4.1,
          comments: 7
        },
        {
          id: 8,
          title: "Content Creation Tools",
          description: "Create compelling real estate marketing content.",
          type: "content",
          creator: "content_creator",
          rating: 4.5,
          comments: 13
        },
        {
          id: 9,
          title: "Market Analysis Generator",
          description: "Generate comprehensive market analysis reports.",
          type: "analysis",
          creator: "market_analyst",
          rating: 4.8,
          comments: 18
        }
      ],
      realize: [
        {
          id: 10,
          title: "Innovation Incubator",
          description: "Transform ideas into viable real estate solutions.",
          type: "incubator",
          creator: "startup_mentor",
          rating: 4.7,
          comments: 22
        },
        {
          id: 11,
          title: "Prototype Development",
          description: "Build and test real estate technology prototypes.",
          type: "prototype",
          creator: "tech_developer",
          rating: 4.4,
          comments: 14
        },
        {
          id: 12,
          title: "Investment Matching",
          description: "Connect innovative projects with potential investors.",
          type: "investment",
          creator: "investor_relations",
          rating: 4.6,
          comments: 16
        }
      ],
      dashboard: [
        {
          id: 13,
          title: "Market Trends Overview",
          description: "Real-time dashboard of real estate market trends.",
          type: "dashboard",
          creator: "data_analyst",
          rating: 4.9,
          comments: 25
        },
        {
          id: 14,
          title: "Technology Adoption Rates",
          description: "Track adoption rates of new real estate technologies.",
          type: "metrics",
          creator: "research_team",
          rating: 4.3,
          comments: 10
        },
        {
          id: 15,
          title: "Regional Innovation Index",
          description: "Compare innovation levels across different regions.",
          type: "index",
          creator: "regional_expert",
          rating: 4.5,
          comments: 12
        }
      ],
      analytics: [
        {
          id: 16,
          title: "Predictive Market Analysis",
          description: "AI-powered predictions for real estate market trends.",
          type: "prediction",
          creator: "ai_researcher",
          rating: 4.8,
          comments: 31
        },
        {
          id: 17,
          title: "Performance Analytics",
          description: "Deep dive analytics on property and technology performance.",
          type: "analytics",
          creator: "performance_analyst",
          rating: 4.6,
          comments: 19
        },
        {
          id: 18,
          title: "Risk Assessment Tools",
          description: "Comprehensive risk analysis for real estate investments.",
          type: "risk",
          creator: "risk_analyst",
          rating: 4.7,
          comments: 17
        }
      ]
    }
    
    return moduleData[moduleId] || []
  }

  // FIXED: Simplified useEffect that properly loads data
  useEffect(() => {
    console.log('useEffect running for module:', activeModule)
    setLoading(true)
    
    const timer = setTimeout(() => {
      const moduleContent = getModuleData(activeModule)
      console.log('Loading content for module:', activeModule, 'Content:', moduleContent)
      setContents(moduleContent)
      setLoading(false)
    }, 500) // Reduced timeout for better UX
    
    return () => clearTimeout(timer)
  }, [activeModule])

  // FIXED: Improved handleModuleClick function
  const handleModuleClick = (moduleId) => {
    console.log('Switching to module:', moduleId)
    if (moduleId !== activeModule) {
      setActiveModule(moduleId)
      // Content will be updated by useEffect
    }
  }

  const getModuleInfo = (moduleId) => {
    const moduleConfig = {
      explore: {
        title: "Explore & Select",
        description: "Discover trends, technologies, and inspirations in the real estate industry",
        searchPlaceholder: "Search trends, technologies, innovations..."
      },
      connect: {
        title: "Add & Connect",
        description: "Build connections and integrate with real estate technology networks",
        searchPlaceholder: "Search networks, integrations, partnerships..."
      },
      create: {
        title: "Rate & Create",
        description: "Rate innovations and create compelling real estate content",
        searchPlaceholder: "Search rating systems, content tools..."
      },
      realize: {
        title: "Ideate & Realize",
        description: "Transform innovative ideas into viable real estate solutions",
        searchPlaceholder: "Search incubators, prototypes, investments..."
      },
      dashboard: {
        title: "Trend Dashboard",
        description: "Monitor real-time trends and metrics in the real estate market",
        searchPlaceholder: "Search dashboards, metrics, trends..."
      },
      analytics: {
        title: "Trend Analytics",
        description: "Advanced analytics and predictions for real estate innovation",
        searchPlaceholder: "Search analytics, predictions, assessments..."
      }
    }
    return moduleConfig[moduleId] || moduleConfig.explore
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

  const currentModule = getModuleInfo(activeModule)

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
                Powered by AI & Data Analytics
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

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            {currentModule.title}
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            {currentModule.description}
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder={currentModule.searchPlaceholder}
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              🔍 Search
            </button>
          </div>
        </div>

        {/* Content Cards */}
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}>
          {contents.length > 0 ? contents.map((content) => (
            <div
              key={content.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    color: '#1f2937',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {content.title}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {content.type}
                  </span>
                </div>
                <div style={{ fontSize: '1.5rem' }}>
                  {getContentIcon(content.type)}
                </div>
              </div>
              
              <p style={{ 
                color: '#6b7280', 
                fontSize: '0.875rem',
                lineHeight: '1.5',
                marginBottom: '1rem'
              }}>
                {content.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  by {content.creator}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>⭐</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{content.rating}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>💬</span>
                    <span style={{ fontSize: '0.875rem' }}>{content.comments}</span>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f3f4f6'
              }}>
                <button style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                >
                  👍 Like
                </button>
                <button style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                >
                  📄 View Details
                </button>
              </div>
            </div>
          )) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              gridColumn: '1 / -1'
            }}>
              <div style={{ fontSize: '1rem', color: '#6b7280' }}>
                No content available for this module.
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
            ✅ Application running successfully!
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Real Estate Innovation Engine is live and operational - Active Module: {currentModule.title}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
            Content Items: {contents.length} | Module: {activeModule}
          </div>
        </div>
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

// Helper function to get appropriate icon for content type
function getContentIcon(type) {
  const icons = {
    technology: '🏢',
    trend: '🌱', 
    innovation: '🥽',
    network: '🌐',
    integration: '🔗',
    partnership: '🤝',
    rating: '⭐',
    content: '📝',
    analysis: '📊',
    incubator: '🚀',
    prototype: '🔧',
    investment: '💰',
    dashboard: '📈',
    metrics: '📊',
    index: '📋',
    prediction: '🔮',
    analytics: '📊',
    risk: '⚠️'
  }
  return icons[type] || '📄'
}

export default App

