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

  const headerStyle = {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 0'
  }

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  }

  const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  }

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '0.875rem',
    margin: 0
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  }

  const mainStyle = {
    padding: '2rem 0'
  }

  const gridStyle = {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  }

  const badgeStyle = (type) => ({
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    backgroundColor: type === 'technology' ? '#dbeafe' : 
                    type === 'trend' ? '#dcfce7' : '#f3e8ff',
    color: type === 'technology' ? '#1d4ed8' : 
           type === 'trend' ? '#166534' : '#7c3aed',
    marginBottom: '1rem'
  })

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    marginRight: '0.5rem'
  }

  const secondaryButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    cursor: 'pointer'
  }

  const statusStyle = {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '0.5rem',
    border: '1px solid #bae6fd',
    color: '#0369a1',
    fontSize: '0.875rem'
  }

  if (loading) {
    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }
    }, [
      React.createElement('div', {
        key: 'spinner',
        style: {
          border: '3px solid #f3f4f6',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite'
        }
      }),
      React.createElement('p', {
        key: 'text',
        style: { marginTop: '1rem' }
      }, 'Loading...'),
      React.createElement('style', {
        key: 'style'
      }, '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }')
    ])
  }

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    }
  }, [
    // Header
    React.createElement('header', {
      key: 'header',
      style: headerStyle
    }, 
      React.createElement('div', {
        style: containerStyle
      },
        React.createElement('div', {
          style: headerContentStyle
        }, [
          React.createElement('div', {
            key: 'title-section'
          }, [
            React.createElement('h1', {
              key: 'title',
              style: titleStyle
            }, 'Digital Real Estate Innovation Engine'),
            React.createElement('p', {
              key: 'subtitle',
              style: subtitleStyle
            }, 'Powered by AI & Data Analytics')
          ]),
          React.createElement('div', {
            key: 'logo',
            style: logoStyle
          }, [
            React.createElement('span', {
              key: 'pom',
              style: { fontSize: '1.5rem', fontWeight: 'bold' }
            }, 'pom'),
            React.createElement('span', {
              key: 'plus',
              style: { fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }
            }, '+')
          ])
        ])
      )
    ),
    
    // Main Content
    React.createElement('main', {
      key: 'main',
      style: mainStyle
    },
      React.createElement('div', {
        style: containerStyle
      }, [
        React.createElement('h2', {
          key: 'section-title',
          style: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '2rem'
          }
        }, 'Explore & Select'),
        
        // Content Grid
        React.createElement('div', {
          key: 'grid',
          style: gridStyle
        }, contents.map(content =>
          React.createElement('div', {
            key: content.id,
            style: cardStyle
          }, [
            // Badge
            React.createElement('span', {
              key: 'badge',
              style: badgeStyle(content.type)
            }, content.type),
            
            // Title
            React.createElement('h3', {
              key: 'title',
              style: {
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }
            }, content.title),
            
            // Description
            React.createElement('p', {
              key: 'description',
              style: {
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }
            }, content.description),
            
            // Meta
            React.createElement('div', {
              key: 'meta',
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginBottom: '1rem'
              }
            }, [
              React.createElement('span', {
                key: 'creator'
              }, `by ${content.creator}`),
              React.createElement('span', {
                key: 'rating'
              }, `★ ${content.rating} (${content.comments} comments)`)
            ]),
            
            // Actions
            React.createElement('div', {
              key: 'actions'
            }, [
              React.createElement('button', {
                key: 'comments',
                style: buttonStyle
              }, '💬 Comments'),
              React.createElement('button', {
                key: 'details',
                style: secondaryButtonStyle
              }, '👁️ Details')
            ])
          ])
        )),
        
        // Status
        React.createElement('div', {
          key: 'status',
          style: statusStyle
        }, `✅ Application running successfully! Content Items: ${contents.length}`)
      ])
    )
  ])
}

export default App

