import { useState, useEffect } from 'react'

// Simple SVG Icons (NO external dependencies)
const TrendingUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const ActivityIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const BarChart3Icon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

const Input = ({ className = '', ...props }) => (
  <input className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
)

const TrendDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [trendPhases, setTrendPhases] = useState([])
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  // Mock data
  const mockDashboardData = {
    totalTrends: 24,
    activeTrends: 18,
    emergingTrends: 6,
    trendGrowth: 12.5,
    topTrends: [
      {
        id: 1,
        name: "Smart Building IoT",
        phase: "Growth",
        impact_score: 85,
        adoption_rate: 67,
        time_horizon: "short",
        industry: "Real Estate"
      },
      {
        id: 2,
        name: "Sustainable Construction",
        phase: "Maturity",
        impact_score: 92,
        adoption_rate: 78,
        time_horizon: "medium",
        industry: "Real Estate"
      },
      {
        id: 3,
        name: "Virtual Property Tours",
        phase: "Emergence",
        impact_score: 73,
        adoption_rate: 45,
        time_horizon: "short",
        industry: "Real Estate"
      }
    ],
    phaseDistribution: [
      { phase: "Emergence", count: 6, percentage: 25 },
      { phase: "Growth", count: 8, percentage: 33 },
      { phase: "Maturity", count: 7, percentage: 29 },
      { phase: "Decline", count: 3, percentage: 13 }
    ]
  }

  const mockTrendPhases = [
    { id: 'emergence', name: 'Emergence', count: 6 },
    { id: 'growth', name: 'Growth', count: 8 },
    { id: 'maturity', name: 'Maturity', count: 7 },
    { id: 'decline', name: 'Decline', count: 3 }
  ]

  useEffect(() => {
    setTimeout(() => {
      setDashboardData(mockDashboardData)
      setTrendPhases(mockTrendPhases)
      setLoading(false)
    }, 1000)
  }, [])

  const getPhaseColor = (phase) => {
    switch (phase.toLowerCase()) {
      case 'emergence':
        return 'bg-blue-100 text-blue-800'
      case 'growth':
        return 'bg-green-100 text-green-800'
      case 'maturity':
        return 'bg-yellow-100 text-yellow-800'
      case 'decline':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trend Dashboard</h2>
        <p className="text-gray-600">
          Monitor and analyze trend lifecycle phases and their impact on the real estate industry
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <Input
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedPhase} 
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Phases</option>
            {trendPhases.map(phase => (
              <option key={phase.id} value={phase.id}>{phase.name}</option>
            ))}
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Trends</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalTrends}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUpIcon />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Active Trends</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.activeTrends}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ActivityIcon />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Emerging Trends</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.emergingTrends}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <BarChart3Icon />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+{dashboardData.trendGrowth}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <ClockIcon />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Trends</CardTitle>
            <CardDescription>
              Trends with highest impact scores and adoption rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topTrends.map((trend, index) => (
                <div key={trend.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{trend.name}</h4>
                      <Badge className={getPhaseColor(trend.phase)}>
                        {trend.phase}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Impact: <span className={`font-medium ${getImpactColor(trend.impact_score)}`}>{trend.impact_score}</span></span>
                      <span>Adoption: {trend.adoption_rate}%</span>
                      <span>{trend.time_horizon} term</span>
                    </div>
                    <div className="mt-2">
                      <Progress value={trend.adoption_rate} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Phase Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Phase Distribution</CardTitle>
            <CardDescription>
              Distribution of trends across lifecycle phases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.phaseDistribution.map((phase) => (
                <div key={phase.phase} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getPhaseColor(phase.phase).split(' ')[0]}`}></div>
                    <span className="text-sm font-medium text-gray-900">{phase.phase}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{phase.count} trends</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getPhaseColor(phase.phase).split(' ')[0]}`}
                        style={{ width: `${phase.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-10 text-right">{phase.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Timeline */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Trend Activity Timeline</CardTitle>
            <CardDescription>
              Recent trend phase transitions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Smart Building IoT moved to Growth phase</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border-l-4 border-green-500 bg-green-50">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New trend "Blockchain Property Records" added</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border-l-4 border-yellow-500 bg-yellow-50">
                <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sustainable Construction impact score updated to 92</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrendDashboard

