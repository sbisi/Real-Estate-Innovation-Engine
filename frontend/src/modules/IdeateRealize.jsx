import { useState, useEffect } from 'react'

// Simple SVG Icons (NO external dependencies)
const LightbulbIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const RocketIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const TargetIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Local UI Components (NO external dependencies)
const Button = ({ children, onClick, className = '', variant = 'default', disabled = false }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className}`}>
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

const Textarea = ({ className = '', ...props }) => (
  <textarea className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
)

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
)

const IdeateRealize = () => {
  const [ideas, setIdeas] = useState([])
  const [projects, setProjects] = useState([])
  const [showCreateIdea, setShowCreateIdea] = useState(false)
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    opportunity_space: '',
    priority: 'medium'
  })
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    idea_id: '',
    timeline: '',
    budget: '',
    team_size: ''
  })

  // Mock data
  const mockIdeas = [
    {
      id: 1,
      title: "Smart Building Energy Management",
      description: "AI-powered system to optimize energy consumption in commercial buildings using IoT sensors and machine learning.",
      opportunity_space: "Smart Sustainable Buildings",
      priority: "high",
      status: "concept",
      created_at: "2024-01-15T10:00:00Z",
      votes: 12,
      comments: 5
    },
    {
      id: 2,
      title: "Virtual Property Staging Platform",
      description: "AR/VR platform for virtual staging of properties to enhance marketing and reduce physical staging costs.",
      opportunity_space: "Digital Property Experience",
      priority: "medium",
      status: "development",
      created_at: "2024-01-14T14:30:00Z",
      votes: 8,
      comments: 3
    }
  ]

  const mockProjects = [
    {
      id: 1,
      title: "Smart Building Pilot Program",
      description: "Implementation of smart building technology in 3 commercial properties",
      idea_id: 1,
      timeline: "6 months",
      budget: "$150,000",
      team_size: "5 people",
      status: "in_progress",
      progress: 35,
      created_at: "2024-01-10T12:00:00Z"
    }
  ]

  useEffect(() => {
    setIdeas(mockIdeas)
    setProjects(mockProjects)
  }, [])

  const handleCreateIdea = () => {
    if (newIdea.title && newIdea.description) {
      const idea = {
        id: ideas.length + 1,
        ...newIdea,
        status: 'concept',
        created_at: new Date().toISOString(),
        votes: 0,
        comments: 0
      }
      setIdeas(prev => [...prev, idea])
      setNewIdea({
        title: '',
        description: '',
        opportunity_space: '',
        priority: 'medium'
      })
      setShowCreateIdea(false)
    }
  }

  const handleCreateProject = () => {
    if (newProject.title && newProject.description && newProject.idea_id) {
      const project = {
        id: projects.length + 1,
        ...newProject,
        status: 'planning',
        progress: 0,
        created_at: new Date().toISOString()
      }
      setProjects(prev => [...prev, project])
      setNewProject({
        title: '',
        description: '',
        idea_id: '',
        timeline: '',
        budget: '',
        team_size: ''
      })
      setShowCreateProject(false)
    }
  }

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger'
      case 'medium':
        return 'warning'
      case 'low':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'concept':
        return 'secondary'
      case 'development':
        return 'warning'
      case 'planning':
        return 'secondary'
      case 'in_progress':
        return 'warning'
      case 'completed':
        return 'success'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'concept':
        return <LightbulbIcon />
      case 'development':
        return <ClockIcon />
      case 'planning':
        return <CalendarIcon />
      case 'in_progress':
        return <ClockIcon />
      case 'completed':
        return <CheckCircleIcon />
      default:
        return <AlertCircleIcon />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ideate & Realize</h2>
        <p className="text-gray-600">
          Transform opportunity spaces into actionable ideas and realize them through structured projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ideas Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LightbulbIcon />
                  <span>Ideas</span>
                </div>
                <Button
                  onClick={() => setShowCreateIdea(true)}
                  className="flex items-center space-x-1"
                >
                  <PlusIcon />
                  <span>New Idea</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Innovative concepts derived from opportunity spaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ideas.map((idea) => (
                  <div key={idea.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-lg">{idea.title}</h4>
                      <div className="flex space-x-2">
                        <Badge variant={getPriorityBadgeVariant(idea.priority)}>
                          {idea.priority}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(idea.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(idea.status)}
                            {idea.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{idea.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Space: {idea.opportunity_space}</span>
                      <div className="flex space-x-4">
                        <span>{idea.votes} votes</span>
                        <span>{idea.comments} comments</span>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" className="text-sm">
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-sm"
                        onClick={() => {
                          setNewProject(prev => ({ ...prev, idea_id: idea.id }))
                          setShowCreateProject(true)
                        }}
                      >
                        Create Project
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RocketIcon />
                  <span>Projects</span>
                </div>
                <Button
                  onClick={() => setShowCreateProject(true)}
                  className="flex items-center space-x-1"
                >
                  <PlusIcon />
                  <span>New Project</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Active implementation projects from ideas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-lg">{project.title}</h4>
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon />
                        <span>{project.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UsersIcon />
                        <span>{project.team_size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TargetIcon />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Idea #{project.idea_id}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="text-sm">
                        View Details
                      </Button>
                      <Button variant="outline" className="text-sm">
                        Update Progress
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Idea Modal */}
      {showCreateIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Idea</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={newIdea.title}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter idea title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your idea"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opportunity Space
                </label>
                <Input
                  value={newIdea.opportunity_space}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, opportunity_space: e.target.value }))}
                  placeholder="Related opportunity space"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select 
                  value={newIdea.priority} 
                  onChange={(e) => setNewIdea(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateIdea(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateIdea}>
                Create Idea
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the project"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Based on Idea
                </label>
                <select 
                  value={newProject.idea_id} 
                  onChange={(e) => setNewProject(prev => ({ ...prev, idea_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an idea</option>
                  {ideas.map(idea => (
                    <option key={idea.id} value={idea.id}>{idea.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeline
                  </label>
                  <Input
                    value={newProject.timeline}
                    onChange={(e) => setNewProject(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g., 6 months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <Input
                    value={newProject.budget}
                    onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="e.g., $100,000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <Input
                  value={newProject.team_size}
                  onChange={(e) => setNewProject(prev => ({ ...prev, team_size: e.target.value }))}
                  placeholder="e.g., 5 people"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateProject(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Innovation Pipeline</CardTitle>
            <CardDescription>
              Overview of ideas and projects in the innovation pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {ideas.length}
                </div>
                <div className="text-sm text-gray-600">Total Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {ideas.filter(i => i.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">High Priority Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {projects.filter(p => p.status === 'in_progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default IdeateRealize

