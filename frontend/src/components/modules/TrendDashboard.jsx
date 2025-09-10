import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  TrendingUp, TrendingDown, Activity, AlertTriangle, 
  BarChart3, PieChart, Target, Clock, Star, Filter,
  Search, Calendar, Users, Zap, Eye, Bell
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts'

const TrendDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [trendPhases, setTrendPhases] = useState([])
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [timeRange, setTimeRange] = useState('30d')

  // Mock Dashboard Data
  const mockDashboardData = {
    phase_distribution: [
      { name: 'Emerging', count: 12, color: '#EF4444' },
      { name: 'Growing', count: 8, color: '#F59E0B' },
      { name: 'Mainstream', count: 15, color: '#10B981' },
      { name: 'Declining', count: 5, color: '#6B7280' },
      { name: 'Legacy', count: 3, color: '#374151' }
    ],
    top_trends: [
      {
        id: 1,
        title: 'Smart Building IoT Integration',
        priority_score: 4.8,
        trend_phase_name: 'Growing',
        sentiment_score: 0.7,
        confidence_level: 0.9,
        last_monitored_at: '2024-01-15T10:00:00Z'
      },
      {
        id: 2,
        title: 'Sustainable Urban Development',
        priority_score: 4.6,
        trend_phase_name: 'Mainstream',
        sentiment_score: 0.8,
        confidence_level: 0.95,
        last_monitored_at: '2024-01-14T14:30:00Z'
      },
      {
        id: 3,
        title: 'Virtual Property Tours',
        priority_score: 4.4,
        trend_phase_name: 'Growing',
        sentiment_score: 0.6,
        confidence_level: 0.85,
        last_monitored_at: '2024-01-13T09:15:00Z'
      }
    ],
    recent_activity: 23,
    average_scores: {
      relevance: 4.2,
      impact: 3.8,
      urgency: 3.5,
      feasibility: 3.9,
      risk: 2.8
    },
    trend_activity_chart: [
      { date: '2024-01-01', emerging: 2, growing: 1, mainstream: 0 },
      { date: '2024-01-08', emerging: 3, growing: 2, mainstream: 1 },
      { date: '2024-01-15', emerging: 1, growing: 3, mainstream: 2 },
      { date: '2024-01-22', emerging: 4, growing: 1, mainstream: 1 },
      { date: '2024-01-29', emerging: 2, growing: 2, mainstream: 3 }
    ]
  }

  const mockTrendPhases = [
    { id: 1, name: 'Emerging', color: '#EF4444', order: 1 },
    { id: 2, name: 'Growing', color: '#F59E0B', order: 2 },
    { id: 3, name: 'Mainstream', color: '#10B981', order: 3 },
    { id: 4, name: 'Declining', color: '#6B7280', order: 4 },
    { id: 5, name: 'Legacy', color: '#374151', order: 5 }
  ]

  useEffect(() => {
    setDashboardData(mockDashboardData)
    setTrendPhases(mockTrendPhases)
  }, [])

  const getPhaseColor = (phaseName) => {
    const phase = trendPhases.find(p => p.name === phaseName)
    return phase ? phase.color : '#6B7280'
  }

  const getSentimentIcon = (score) => {
    if (score > 0.5) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (score < -0.5) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Activity className="h-4 w-4 text-yellow-600" />
  }

  const formatScore = (score) => {
    return score ? score.toFixed(1) : '0.0'
  }

  if (!dashboardData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trend Dashboard</h2>
        <p className="text-gray-600">
          Übersicht über Trend-Aktivitäten und Performance-Metriken
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Trends durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedPhase} onValueChange={setSelectedPhase}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Phase auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Phasen</SelectItem>
            {trendPhases.map((phase) => (
              <SelectItem key={phase.id} value={phase.id.toString()}>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: phase.color }}
                  ></div>
                  <span>{phase.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Tage</SelectItem>
            <SelectItem value="30d">30 Tage</SelectItem>
            <SelectItem value="90d">90 Tage</SelectItem>
            <SelectItem value="1y">1 Jahr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Trends</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.phase_distribution.reduce((sum, phase) => sum + phase.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +{dashboardData.recent_activity} in den letzten 30 Tagen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durchschn. Priority Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatScore(dashboardData.top_trends.reduce((sum, trend) => sum + trend.priority_score, 0) / dashboardData.top_trends.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              von 5.0 möglichen Punkten
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emerging Trends</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.phase_distribution.find(p => p.name === 'Emerging')?.count || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Neue schwache Signale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Aktive Benachrichtigungen
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Phase Distribution */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Trend-Phasen Verteilung</span>
              </CardTitle>
              <CardDescription>
                Verteilung der Trends nach Lifecycle-Phasen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.phase_distribution.map((phase) => (
                  <div key={phase.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: phase.color }}
                      ></div>
                      <span className="text-sm font-medium">{phase.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{phase.count}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: phase.color,
                            width: `${(phase.count / Math.max(...dashboardData.phase_distribution.map(p => p.count))) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Trends */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Top-Trends nach Priority Score</span>
              </CardTitle>
              <CardDescription>
                Die wichtigsten Trends basierend auf dem berechneten Priority Score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.top_trends.map((trend, index) => (
                  <div key={trend.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{trend.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge 
                            style={{ 
                              backgroundColor: getPhaseColor(trend.trend_phase_name),
                              color: 'white'
                            }}
                          >
                            {trend.trend_phase_name}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {getSentimentIcon(trend.sentiment_score)}
                            <span className="text-xs text-gray-500">
                              Sentiment: {formatScore(trend.sentiment_score)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatScore(trend.priority_score)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Konfidenz: {Math.round(trend.confidence_level * 100)}%
                      </div>
                      <Progress 
                        value={trend.confidence_level * 100} 
                        className="w-16 h-1 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trend Activity Chart */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Trend-Aktivität über Zeit</span>
            </CardTitle>
            <CardDescription>
              Entwicklung neuer Trends in verschiedenen Phasen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.trend_activity_chart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="emerging" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Emerging"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growing" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    name="Growing"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mainstream" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Mainstream"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Durchschnittliche Score-Verteilung</span>
            </CardTitle>
            <CardDescription>
              Durchschnittswerte der verschiedenen Bewertungskriterien
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(dashboardData.average_scores).map(([scoreType, value]) => (
                <div key={scoreType} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatScore(value)}
                  </div>
                  <div className="text-sm text-gray-600 capitalize mb-2">
                    {scoreType === 'relevance' ? 'Relevanz' :
                     scoreType === 'impact' ? 'Impact' :
                     scoreType === 'urgency' ? 'Dringlichkeit' :
                     scoreType === 'feasibility' ? 'Machbarkeit' :
                     'Risiko'}
                  </div>
                  <Progress value={(value / 5) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrendDashboard

