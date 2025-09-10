import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Lightbulb, Plus, Rocket, Calendar, Users, Target, CheckCircle, Clock, AlertCircle } from 'lucide-react'

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
      title: "AI-Powered Energy Optimization",
      description: "Develop an AI system that learns building usage patterns and automatically optimizes energy consumption.",
      opportunity_space: "Smart Sustainable Buildings",
      priority: "high",
      status: "concept",
      votes: 12,
      comments: 5,
      created_at: "2024-01-15T10:00:00Z",
      creator: "John Doe"
    },
    {
      id: 2,
      title: "Virtual Reality Property Staging",
      description: "Create a VR platform that allows potential buyers to see properties with different furniture and decoration styles.",
      opportunity_space: "Virtual Real Estate Experience",
      priority: "medium",
      status: "development",
      votes: 8,
      comments: 3,
      created_at: "2024-01-14T14:30:00Z",
      creator: "Jane Smith"
    },
    {
      id: 3,
      title: "Blockchain Property History",
      description: "Implement a blockchain-based system to track property history, maintenance records, and ownership changes.",
      opportunity_space: "Smart Sustainable Buildings",
      priority: "low",
      status: "concept",
      votes: 6,
      comments: 2,
      created_at: "2024-01-13T09:15:00Z",
      creator: "Mike Johnson"
    }
  ]

  const mockProjects = [
    {
      id: 1,
      title: "Smart Building IoT Pilot",
      description: "Pilot implementation of IoT sensors in Building A for energy monitoring and optimization.",
      idea_id: 1,
      status: "in_progress",
      progress: 65,
      timeline: "6 months",
      budget: "$50,000",
      team_size: "5 people",
      start_date: "2024-01-01",
      end_date: "2024-06-30",
      milestones: [
        { name: "Sensor Installation", completed: true },
        { name: "Data Collection Setup", completed: true },
        { name: "AI Model Development", completed: false },
        { name: "Testing & Optimization", completed: false }
      ]
    },
    {
      id: 2,
      title: "VR Property Tour Platform",
      description: "Development of a comprehensive VR platform for property tours and virtual staging.",
      idea_id: 2,
      status: "planning",
      progress: 15,
      timeline: "8 months",
      budget: "$75,000",
      team_size: "7 people",
      start_date: "2024-02-01",
      end_date: "2024-09-30",
      milestones: [
        { name: "Requirements Analysis", completed: true },
        { name: "Technical Architecture", completed: false },
        { name: "MVP Development", completed: false },
        { name: "User Testing", completed: false }
      ]
    }
  ]

  useEffect(() => {
    setIdeas(mockIdeas)
    setProjects(mockProjects)
  }, [])

  const handleCreateIdea = () => {
    if (!newIdea.title.trim()) return

    const idea = {
      id: Date.now(),
      ...newIdea,
      status: 'concept',
      votes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      creator: 'Current User'
    }

    setIdeas(prev => [idea, ...prev])
    setNewIdea({
      title: '',
      description: '',
      opportunity_space: '',
      priority: 'medium'
    })
    setShowCreateIdea(false)
  }

  const handleCreateProject = () => {
    if (!newProject.title.trim()) return

    const project = {
      id: Date.now(),
      ...newProject,
      status: 'planning',
      progress: 0,
      start_date: new Date().toISOString().split('T')[0],
      milestones: []
    }

    setProjects(prev => [project, ...prev])
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'concept': return 'bg-blue-100 text-blue-800'
      case 'development': return 'bg-purple-100 text-purple-800'
      case 'planning': return 'bg-orange-100 text-orange-800'
      case 'in_progress': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'concept': return <Lightbulb className="h-4 w-4" />
      case 'development': return <Rocket className="h-4 w-4" />
      case 'planning': return <Calendar className="h-4 w-4" />
      case 'in_progress': return <Clock className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ideate & Realize</h2>
        <p className="text-gray-600">
          Generate ideas and manage innovation projects from concept to completion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ideas Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Ideas</h3>
            <Button 
              size="sm" 
              onClick={() => setShowCreateIdea(true)}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>New Idea</span>
            </Button>
          </div>

          {/* Create New Idea */}
          {showCreateIdea && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Create New Idea</CardTitle>
                <CardDescription>
                  Share your innovative concept
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="e.g., Smart Parking Solution"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe your idea and its potential impact..."
                    value={newIdea.description}
                    onChange={(e) => setNewIdea(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opportunity Space
                    </label>
                    <Select value={newIdea.opportunity_space} onValueChange={(value) => setNewIdea(prev => ({ ...prev, opportunity_space: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select space" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Smart Sustainable Buildings">Smart Sustainable Buildings</SelectItem>
                        <SelectItem value="Virtual Real Estate Experience">Virtual Real Estate Experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <Select value={newIdea.priority} onValueChange={(value) => setNewIdea(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleCreateIdea}
                    disabled={!newIdea.title.trim()}
                    className="flex-1"
                  >
                    Create Idea
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateIdea(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ideas List */}
          <div className="space-y-4">
            {ideas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getPriorityColor(idea.priority)}>
                          {idea.priority}
                        </Badge>
                        <Badge className={getStatusColor(idea.status)}>
                          {getStatusIcon(idea.status)}
                          <span className="ml-1">{idea.status}</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{idea.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {idea.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>by {idea.creator}</span>
                    <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {idea.opportunity_space && (
                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs">
                        <Target className="h-3 w-3 mr-1" />
                        {idea.opportunity_space}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        {idea.votes} votes
                      </span>
                      <span>{idea.comments} comments</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Start Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
            <Button 
              size="sm" 
              onClick={() => setShowCreateProject(true)}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </div>

          {/* Create New Project */}
          {showCreateProject && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Create New Project</CardTitle>
                <CardDescription>
                  Turn an idea into a project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <Input
                    placeholder="e.g., Smart Parking Implementation"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe the project scope and objectives..."
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Based on Idea
                  </label>
                  <Select value={newProject.idea_id} onValueChange={(value) => setNewProject(prev => ({ ...prev, idea_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select idea" />
                    </SelectTrigger>
                    <SelectContent>
                      {ideas.map((idea) => (
                        <SelectItem key={idea.id} value={idea.id.toString()}>
                          {idea.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <Input
                      placeholder="6 months"
                      value={newProject.timeline}
                      onChange={(e) => setNewProject(prev => ({ ...prev, timeline: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <Input
                      placeholder="$50,000"
                      value={newProject.budget}
                      onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size
                    </label>
                    <Input
                      placeholder="5 people"
                      value={newProject.team_size}
                      onChange={(e) => setNewProject(prev => ({ ...prev, team_size: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleCreateProject}
                    disabled={!newProject.title.trim()}
                    className="flex-1"
                  >
                    Create Project
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateProject(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Projects List */}
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusIcon(project.status)}
                          <span className="ml-1">{project.status}</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <p className="font-medium">{project.timeline}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <p className="font-medium">{project.budget}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Team:</span>
                      <p className="font-medium">{project.team_size}</p>
                    </div>
                  </div>

                  {/* Milestones */}
                  {project.milestones && project.milestones.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Milestones</h5>
                      <div className="space-y-1">
                        {project.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-gray-400" />
                            )}
                            <span className={milestone.completed ? 'text-gray-900' : 'text-gray-500'}>
                              {milestone.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdeateRealize

