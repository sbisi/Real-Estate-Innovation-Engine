import { useState, useEffect } from 'react'

// Simple SVG Icons (NO external dependencies)
const BarChart3Icon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const PieChartIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
  </svg>
)

const TargetIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

// Local UI Components (NO external dependencies)
const Button = ({ children, onClick, className = '', variant = 'default' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
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

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
)

const TrendAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState('impact')
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  // Mock data
  const mockAnalyticsData = {
    trendCorrelations: [
      {
        trend1: "Smart Building IoT",
        trend2: "Energy Efficiency",
        correlation: 0.87,
        strength: "Strong"
      },
      {
        trend1: "Virtual Property Tours",
        trend2: "Remote Work",
        correlation: 0.73,
        strength: "Moderate"
      },
      {
        trend1: "Sustainable Construction",
        trend2: "Green Building Certification",
        correlation: 0.91,
        strength: "Very Strong"
      }
    ],
    impactAnalysis: [
      {
        trend: "Smart Building IoT",
        current_impact: 85,
        predicted_impact: 92,
        growth_rate: 8.2,
        confidence: 87
      },
      {
        trend: "Sustainable Construction",
        current_impact: 92,
        predicted_impact: 95,
        growth_rate: 3.3,
        confidence: 94
      },
      {
        trend: "Virtual Property Tours",
        current_impact: 73,
        predicted_impact: 84,
        growth_rate: 15.1,
        confidence: 76
      }
    ],
    industryComparison: [
      {
        industry: "Real Estate",
        adoption_rate: 67,
        innovation_index: 78,
        trend_count: 24
      },
      {
        industry: "Technology",
        adoption_rate: 89,
        innovation_index: 95,
        trend_count: 156
      },
      {
        industry: "Finance",
        adoption_rate: 72,
        innovation_index: 82,
        trend_count: 89
      },
      {
        industry: "Healthcare",
        adoption_rate: 58,
        innovation_index: 71,
        trend_count: 67
      }
    ],
    timeSeriesData: [
      { month: "Jan", trends: 18, impact: 72 },
      { month: "Feb", trends: 19, impact: 74 },
      { month: "Mar", trends: 21, impact: 76 },
      { month: "Apr", trends: 22, impact: 79 },
      { month: "May", trends: 24, impact: 81 },
      { month: "Jun", trends: 24, impact: 83 }
    ]
  }

  useEffect(() => {
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData)
      setLoading(false)
    }, 1000)
  }, [])

  const getCorrelationColor = (strength) => {
    switch (strength.toLowerCase()) {
      case 'very strong':
        return 'text-green-600'
      case 'strong':
        return 'text-blue-600'
      case 'moderate':
        return 'text-yellow-600'
      case 'weak':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getCorrelationBadgeVariant = (strength) => {
    switch (strength.toLowerCase()) {
      case 'very strong':
        return 'success'
      case 'strong':
        return 'secondary'
      case 'moderate':
        return 'warning'
      case 'weak':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getGrowthColor = (rate) => {
    if (rate > 10) return 'text-green-600'
    if (rate > 5) return 'text-blue-600'
    if (rate > 0) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trend Analytics</h2>
        <p className="text-gray-600">
          Advanced analytics and insights into trend patterns, correlations, and future predictions
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <select 
            value={selectedMetric} 
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="impact">Impact Analysis</option>
            <option value="adoption">Adoption Rate</option>
            <option value="correlation">Correlation</option>
            <option value="prediction">Predictions</option>
          </select>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" className="flex items-center space-x-2">
            <FilterIcon />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <DownloadIcon />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Correlations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TargetIcon />
              <span>Trend Correlations</span>
            </CardTitle>
            <CardDescription>
              Relationships between different trends and their correlation strength
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trendCorrelations.map((correlation, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {correlation.trend1} ↔ {correlation.trend2}
                      </h4>
                    </div>
                    <Badge variant={getCorrelationBadgeVariant(correlation.strength)}>
                      {correlation.strength}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Correlation Coefficient</span>
                    <span className={`text-sm font-medium ${getCorrelationColor(correlation.strength)}`}>
                      {correlation.correlation.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={correlation.correlation * 100} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUpIcon />
              <span>Impact Analysis & Predictions</span>
            </CardTitle>
            <CardDescription>
              Current impact scores and future predictions with confidence levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.impactAnalysis.map((analysis, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{analysis.trend}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium ${getGrowthColor(analysis.growth_rate)}`}>
                        +{analysis.growth_rate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-gray-500">Current Impact</span>
                      <div className="text-lg font-semibold text-gray-900">{analysis.current_impact}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Predicted Impact</span>
                      <div className="text-lg font-semibold text-blue-600">{analysis.predicted_impact}</div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Confidence Level</span>
                      <span>{analysis.confidence}%</span>
                    </div>
                    <Progress value={analysis.confidence} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Comparison */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3Icon />
              <span>Industry Comparison</span>
            </CardTitle>
            <CardDescription>
              Compare trend adoption and innovation across different industries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Industry</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Adoption Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Innovation Index</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Active Trends</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.industryComparison.map((industry, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{industry.industry}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{industry.adoption_rate}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${industry.adoption_rate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{industry.innovation_index}</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${industry.innovation_index}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{industry.trend_count}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={
                          industry.innovation_index > 90 ? 'success' :
                          industry.innovation_index > 75 ? 'secondary' :
                          industry.innovation_index > 60 ? 'warning' : 'danger'
                        }>
                          {industry.innovation_index > 90 ? 'Excellent' :
                           industry.innovation_index > 75 ? 'Good' :
                           industry.innovation_index > 60 ? 'Average' : 'Below Average'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Chart Placeholder */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon />
              <span>Trend Evolution Over Time</span>
            </CardTitle>
            <CardDescription>
              Historical trend data and growth patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3Icon />
                <p className="text-gray-500 mt-2">Interactive chart showing trend evolution</p>
                <p className="text-sm text-gray-400">Data from {analyticsData.timeSeriesData.length} months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              AI-generated insights based on trend analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Strong Correlation Detected</h4>
                <p className="text-sm text-blue-800">
                  Smart Building IoT and Energy Efficiency show a very strong correlation (0.87), 
                  suggesting these trends are closely linked and may benefit from combined investment strategies.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">High Growth Potential</h4>
                <p className="text-sm text-green-800">
                  Virtual Property Tours shows the highest growth rate at 15.1%, indicating significant 
                  expansion potential in the coming months.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">Industry Gap Identified</h4>
                <p className="text-sm text-yellow-800">
                  Real Estate industry shows lower adoption rates (67%) compared to Technology (89%), 
                  presenting opportunities for innovation and competitive advantage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrendAnalytics

