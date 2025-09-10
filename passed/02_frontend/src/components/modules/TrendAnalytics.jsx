import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Network, TrendingUp, GitBranch, Zap, AlertCircle, 
  BarChart3, LineChart, Radar, Target, Clock, 
  Search, Filter, Download, Share2, Eye
} from 'lucide-react'
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  AreaChart, Area, LineChart as RechartsLineChart, Line
} from 'recharts'

const TrendAnalytics = () => {
  const [selectedTrend, setSelectedTrend] = useState(null)
  const [correlations, setCorrelations] = useState([])
  const [trendMetrics, setTrendMetrics] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('correlations')

  // Mock Data
  const mockCorrelations = [
    {
      id: 1,
      trend_a_title: 'Smart Building IoT',
      trend_b_title: 'Energy Efficiency',
      correlation_strength: 0.85,
      correlation_type: 'positive',
      confidence_score: 0.92,
      detected_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      trend_a_title: 'Virtual Property Tours',
      trend_b_title: 'Remote Work',
      correlation_strength: 0.73,
      correlation_type: 'positive',
      confidence_score: 0.88,
      detected_at: '2024-01-14T14:30:00Z'
    },
    {
      id: 3,
      trend_a_title: 'Sustainable Development',
      trend_b_title: 'Carbon Pricing',
      correlation_strength: 0.67,
      correlation_type: 'positive',
      confidence_score: 0.79,
      detected_at: '2024-01-13T09:15:00Z'
    },
    {
      id: 4,
      trend_a_title: 'Traditional Offices',
      trend_b_title: 'Flexible Workspaces',
      correlation_strength: -0.54,
      correlation_type: 'negative',
      confidence_score: 0.71,
      detected_at: '2024-01-12T16:45:00Z'
    }
  ]

  const mockTrendMetrics = [
    {
      trend_title: 'Smart Building IoT',
      metrics: [
        { date: '2024-01-01', engagement: 45, mentions: 120, sentiment: 0.7 },
        { date: '2024-01-08', engagement: 52, mentions: 145, sentiment: 0.75 },
        { date: '2024-01-15', engagement: 48, mentions: 135, sentiment: 0.72 },
        { date: '2024-01-22', engagement: 61, mentions: 178, sentiment: 0.8 },
        { date: '2024-01-29', engagement: 58, mentions: 165, sentiment: 0.78 }
      ]
    }
  ]

  const mockTrendScores = [
    { subject: 'Relevanz', A: 4.2, B: 3.8, fullMark: 5 },
    { subject: 'Impact', A: 4.5, B: 4.1, fullMark: 5 },
    { subject: 'Dringlichkeit', A: 3.8, B: 3.2, fullMark: 5 },
    { subject: 'Machbarkeit', A: 3.9, B: 4.3, fullMark: 5 },
    { subject: 'Risiko', A: 2.1, B: 2.8, fullMark: 5 }
  ]

  const mockScatterData = [
    { x: 4.2, y: 0.85, name: 'Smart Building IoT', phase: 'Growing' },
    { x: 3.8, y: 0.73, name: 'Virtual Tours', phase: 'Growing' },
    { x: 4.6, y: 0.91, name: 'Sustainable Development', phase: 'Mainstream' },
    { x: 3.2, y: 0.45, name: 'Blockchain Property', phase: 'Emerging' },
    { x: 2.8, y: 0.32, name: 'Traditional Offices', phase: 'Declining' }
  ]

  useEffect(() => {
    setCorrelations(mockCorrelations)
    setTrendMetrics(mockTrendMetrics)
  }, [])

  const getCorrelationColor = (strength) => {
    if (strength > 0.7) return 'text-green-600 bg-green-100'
    if (strength > 0.4) return 'text-yellow-600 bg-yellow-100'
    if (strength > 0) return 'text-blue-600 bg-blue-100'
    if (strength > -0.4) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getCorrelationIcon = (type) => {
    switch (type) {
      case 'positive': return <TrendingUp className="h-4 w-4" />
      case 'negative': return <TrendingUp className="h-4 w-4 rotate-180" />
      default: return <GitBranch className="h-4 w-4" />
    }
  }

  const formatCorrelationStrength = (strength) => {
    return `${strength > 0 ? '+' : ''}${(strength * 100).toFixed(0)}%`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trend Analytics</h2>
        <p className="text-gray-600">
          Detaillierte Analyse von Trend-Korrelationen, Metriken und Vorhersagen
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Trends oder Korrelationen suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="correlations" className="flex items-center space-x-2">
            <Network className="h-4 w-4" />
            <span>Korrelationen</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Metriken</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center space-x-2">
            <Radar className="h-4 w-4" />
            <span>Vergleich</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>

        {/* Correlations Tab */}
        <TabsContent value="correlations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Correlation List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>Trend-Korrelationen</span>
                </CardTitle>
                <CardDescription>
                  Entdeckte Zusammenhänge zwischen verschiedenen Trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correlations.map((correlation) => (
                    <div key={correlation.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getCorrelationIcon(correlation.correlation_type)}
                            <span className="font-medium text-sm">
                              {correlation.trend_a_title} ↔ {correlation.trend_b_title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className={getCorrelationColor(Math.abs(correlation.correlation_strength))}>
                              {formatCorrelationStrength(correlation.correlation_strength)}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Konfidenz: {Math.round(correlation.confidence_score * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(correlation.detected_at).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Correlation Scatter Plot */}
            <Card>
              <CardHeader>
                <CardTitle>Priority Score vs. Konfidenz</CardTitle>
                <CardDescription>
                  Verteilung der Trends nach Score und Konfidenz-Level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={mockScatterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Priority Score"
                        domain={[0, 5]}
                        tickFormatter={(value) => value.toFixed(1)}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Konfidenz"
                        domain={[0, 1]}
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'x' ? value.toFixed(1) : `${(value * 100).toFixed(0)}%`,
                          name === 'x' ? 'Priority Score' : 'Konfidenz'
                        ]}
                        labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ''}
                      />
                      <Scatter 
                        dataKey="y" 
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement-Entwicklung</CardTitle>
                <CardDescription>
                  Zeitliche Entwicklung der Trend-Aktivität
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockTrendMetrics[0]?.metrics || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#3B82F6" 
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        name="Engagement"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment-Analyse</CardTitle>
                <CardDescription>
                  Stimmungsentwicklung über Zeit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={mockTrendMetrics[0]?.metrics || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis domain={[-1, 1]} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
                        formatter={(value) => [value.toFixed(2), 'Sentiment']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sentiment" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mentions Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Erwähnungen Timeline</CardTitle>
              <CardDescription>
                Anzahl der Erwähnungen in verschiedenen Quellen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTrendMetrics[0]?.metrics || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mentions" 
                      stroke="#F59E0B" 
                      fill="#F59E0B"
                      fillOpacity={0.3}
                      name="Erwähnungen"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Score-Vergleich</CardTitle>
                <CardDescription>
                  Multidimensionaler Vergleich von Trend-Bewertungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={mockTrendScores}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} />
                      <Radar
                        name="Trend A"
                        dataKey="A"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Trend B"
                        dataKey="B"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detaillierter Vergleich</CardTitle>
                <CardDescription>
                  Numerische Werte der Bewertungskriterien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrendScores.map((score) => (
                    <div key={score.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{score.subject}</span>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-bold text-blue-600">{score.A}</div>
                          <div className="text-xs text-gray-500">Trend A</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-red-600">{score.B}</div>
                          <div className="text-xs text-gray-500">Trend B</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>KI-Insights</span>
                </CardTitle>
                <CardDescription>
                  Automatisch generierte Erkenntnisse und Empfehlungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Starke Korrelation erkannt</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Smart Building IoT und Energy Efficiency zeigen eine sehr starke positive Korrelation (85%). 
                          Investitionen in IoT-Technologien könnten Energieeffizienz-Initiativen verstärken.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Emerging Trend Alert</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Blockchain Property Transactions zeigt wachsende Aktivität. 
                          Überwachung empfohlen für potenzielle Mainstream-Adoption.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">Opportunity Identified</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Virtual Property Tours haben hohes Potenzial für Remote Work Integration. 
                          Strategische Partnerschaft könnte wertvoll sein.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Vorhersagen</span>
                </CardTitle>
                <CardDescription>
                  Prognostizierte Entwicklungen basierend auf aktuellen Daten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Smart Building IoT</h4>
                      <Badge className="bg-green-100 text-green-800">Wachstum</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Voraussichtlicher Übergang zu "Mainstream" in den nächsten 6 Monaten
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Growing</span>
                      <span>75%</span>
                      <span>Mainstream</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Traditional Offices</h4>
                      <Badge className="bg-red-100 text-red-800">Rückgang</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Weiterer Rückgang erwartet, Übergang zu "Legacy" wahrscheinlich
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Declining</span>
                      <span>30%</span>
                      <span>Legacy</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TrendAnalytics

