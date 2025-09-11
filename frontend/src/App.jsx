import React, { useState, useEffect } from 'react'

function App() {
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)

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
    const timer = setTimeout(() => {
      setContents(demoContents)
      setLoading(false)
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
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          border: '3px solid #f3f4f6',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '1rem' }}>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                Digital Real Estate Innovation Engine
              </h1>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                Powered by AI & Data Analytics
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>pom</span>
              <span style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>+</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '2rem' }}>
            Explore & Select
          </h2>

          {/* Content Grid */}
          <div style={{ 
            display: 'grid', 
            gap: '1rem', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' 
          }}>
            {contents.map(content => (
              <div key={content.id} style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                {/* Type Badge */}
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  backgroundColor: content.type === 'technology' ? '#dbeafe' : 
                                  content.type === 'trend' ? '#dcfce7' : '#f3e8ff',
                  color: content.type === 'technology' ? '#1d4ed8' : 
                         content.type === 'trend' ? '#166534' : '#7c3aed',
                  marginBottom: '1rem'
                }}>
                  {content.type}
                </span>

                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '0.5rem' 
                }}>
                  {content.title}
                </h3>

                {/* Description */}
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '0.875rem', 
                  marginBottom: '1rem' 
                }}>
                  {content.description}
                </p>

                {/* Meta */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '1rem'
                }}>
                  <span>by {content.creator}</span>
                  <span>★ {content.rating} ({content.comments} comments)</span>
                </div>

                {/* Actions */}
                <div>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}>
                    💬 Comments
                  </button>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}>
                    👁️ Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '0.5rem',
            border: '1px solid #bae6fd',
            color: '#0369a1',
            fontSize: '0.875rem'
          }}>
            ✅ Application running successfully! Content Items: {contents.length}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

