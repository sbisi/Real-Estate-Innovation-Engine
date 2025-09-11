import React, { useState, useEffect } from 'react'

console.log('App.jsx loaded')

function App() {
  console.log('App component rendering')
  
  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState([])

  const demoContents = [
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
  ]

  useEffect(() => {
    console.log('useEffect running')
    const timer = setTimeout(() => {
      setContents(demoContents)
      setLoading(false)
      console.log('Demo data loaded')
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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
              {[
                { name: 'Explore & Select', color: '#10b981', active: true },
                { name: 'Add & Connect', color: '#3b82f6' },
                { name: 'Rate & Create', color: '#f59e0b' },
                { name: 'Ideate & Realize', color: '#8b5cf6' },
                { name: 'Trend Dashboard', color: '#06b6d4' },
                { name: 'Trend Analytics', color: '#ec4899' }
              ].map((item, index) => (
                <button
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    backgroundColor: item.active ? item.color : '#f3f4f6',
                    color: item.active ? 'white' : '#374151',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {item.name}
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
            Explore & Select
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Discover trends, technologies, and inspirations in the real estate industry
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Search trends, technologies, innovations..."
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
          {contents.map((content) => (
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
                  {content.type === 'technology' ? '🏢' : content.type === 'trend' ? '🌱' : '🥽'}
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
                  cursor: 'pointer'
                }}>
                  👍 Like
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
                  📄 View Details
                </button>
              </div>
            </div>
          ))}
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
            Real Estate Innovation Engine is live and operational
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

export default App

