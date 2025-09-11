import { useState } from 'react'
import Header from './components/Header.jsx'
import ExploreSelect from './components/modules/ExploreSelect.jsx'
import AddConnect from './components/modules/AddConnect.jsx'
import RateCreate from './components/modules/RateCreate.jsx'
import IdeateRealize from './components/modules/IdeateRealize.jsx'
import TrendDashboard from './components/modules/TrendDashboard.jsx'
import TrendAnalytics from './components/modules/TrendAnalytics.jsx'
import './App.css'

function App() {
  const [activeModule, setActiveModule] = useState('explore')

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'explore':
        return <ExploreSelect />
      case 'add':
        return <AddConnect />
      case 'rate':
        return <RateCreate />
      case 'ideate':
        return <IdeateRealize />
      case 'dashboard':
        return <TrendDashboard />
      case 'analytics':
        return <TrendAnalytics />
      default:
        return <ExploreSelect />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeModule={activeModule} setActiveModule={setActiveModule} />
      <main>
        {renderActiveModule()}
      </main>
    </div>
  )
}

export default App

