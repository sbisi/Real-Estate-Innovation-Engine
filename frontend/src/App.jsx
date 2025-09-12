import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ExploreSelect from './components/modules/ExploreSelect'
import AddConnect from './components/modules/AddConnect'
import RateCreate from './components/modules/RateCreate'
import IdeateRealize from './components/modules/IdeateRealize'
import TrendDashboard from './components/modules/TrendDashboard'
import TrendAnalytics from './components/modules/TrendAnalytics'
import './App.css'

// Home Page Component
const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Real Estate Innovation Engine
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover, analyze, and implement innovative trends and technologies in the real estate industry. 
          Navigate through our comprehensive modules to explore opportunities and drive innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Module Cards */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore & Select</h3>
          <p className="text-gray-600 text-sm mb-4">
            Discover and evaluate emerging trends, technologies, and opportunities in real estate.
          </p>
          <a href="/explore-select" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Explore Module →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Add & Connect</h3>
          <p className="text-gray-600 text-sm mb-4">
            Add new content, create connections, and build your innovation network.
          </p>
          <a href="/add-connect" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Add Content →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rate & Create</h3>
          <p className="text-gray-600 text-sm mb-4">
            Rate existing content and create comprehensive reviews for the community.
          </p>
          <a href="/rate-create" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Rate Content →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ideate & Realize</h3>
          <p className="text-gray-600 text-sm mb-4">
            Transform opportunity spaces into actionable ideas and realize them through projects.
          </p>
          <a href="/ideate-realize" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Start Ideating →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Dashboard</h3>
          <p className="text-gray-600 text-sm mb-4">
            Monitor and analyze trend lifecycle phases and their impact on the industry.
          </p>
          <a href="/trend-dashboard" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View Dashboard →
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Analytics</h3>
          <p className="text-gray-600 text-sm mb-4">
            Advanced analytics and insights into trend patterns, correlations, and predictions.
          </p>
          <a href="/trend-analytics" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View Analytics →
          </a>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Active Trends</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-600">Content Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">342</div>
            <div className="text-sm text-gray-600">User Ratings</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore-select" element={<ExploreSelect />} />
            <Route path="/add-connect" element={<AddConnect />} />
            <Route path="/rate-create" element={<RateCreate />} />
            <Route path="/ideate-realize" element={<IdeateRealize />} />
            <Route path="/trend-dashboard" element={<TrendDashboard />} />
            <Route path="/trend-analytics" element={<TrendAnalytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

