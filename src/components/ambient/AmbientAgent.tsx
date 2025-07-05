'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Activity, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react'

interface AmbientAgentProps {
  isActive: boolean
  onToggle: () => void
}

interface Insight {
  id: string
  type: 'competitor' | 'funding' | 'market' | 'code' | 'opportunity'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  timestamp: Date
  source: string
  action?: string
}

export default function AmbientAgent({ isActive, onToggle }: AmbientAgentProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [currentActivity, setCurrentActivity] = useState('Monitoring Canadian startup ecosystem...')
  const [isProcessing, setIsProcessing] = useState(false)

  // Simulate ambient agent continuously generating insights
  useEffect(() => {
    if (!isActive) return

    const activities = [
      'Scanning competitor funding announcements...',
      'Analyzing government grant databases...',
      'Monitoring tech news for market trends...',
      'Checking GitHub for code health metrics...',
      'Reviewing Canadian accelerator programs...',
      'Tracking VC investment patterns...',
      'Analyzing social media sentiment...',
      'Monitoring industry conferences and events...'
    ]

    const activityInterval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)]
      setCurrentActivity(randomActivity)
    }, 3000)

    // Generate insights periodically
    const insightInterval = setInterval(() => {
      generateNewInsight()
    }, 8000)

    return () => {
      clearInterval(activityInterval)
      clearInterval(insightInterval)
    }
  }, [isActive])

  const generateNewInsight = () => {
    setIsProcessing(true)
    
    // Simulate processing time
    setTimeout(() => {
      const newInsights: Insight[] = [
        {
          id: `insight-${Date.now()}`,
          type: 'competitor',
          title: 'Competitor Funding Alert',
          description: 'Shopify announced new developer tools that could impact your API strategy. Consider pivoting your integration approach.',
          priority: 'high',
          timestamp: new Date(),
          source: 'TechCrunch via Tavily',
          action: 'Review integration strategy'
        },
        {
          id: `insight-${Date.now()}-2`,
          type: 'funding',
          title: 'New Canadian Grant Available',
          description: 'Innovation Canada just announced $50M in clean tech funding. Your sustainability features might qualify.',
          priority: 'medium',
          timestamp: new Date(),
          source: 'Innovation Canada',
          action: 'Apply by March 15th'
        },
        {
          id: `insight-${Date.now()}-3`,
          type: 'market',
          title: 'Market Trend Detected',
          description: 'AI automation demand in Canadian SMBs increased 340% this quarter. Strong positioning opportunity.',
          priority: 'medium',
          timestamp: new Date(),
          source: 'Statistics Canada',
          action: 'Update marketing messaging'
        },
        {
          id: `insight-${Date.now()}-4`,
          type: 'code',
          title: 'Technical Debt Alert',
          description: 'Your main repository shows 15% increase in complexity. Consider refactoring before next sprint.',
          priority: 'low',
          timestamp: new Date(),
          source: 'GitHub Analysis via MCP',
          action: 'Schedule refactoring'
        },
        {
          id: `insight-${Date.now()}-5`,
          type: 'opportunity',
          title: 'Partnership Opportunity',
          description: 'Canadian Digital Media Network is seeking AI startups for their Q2 showcase. Application deadline in 2 weeks.',
          priority: 'high',
          timestamp: new Date(),
          source: 'CDMN Website',
          action: 'Submit application'
        }
      ]

      const randomInsight = newInsights[Math.floor(Math.random() * newInsights.length)]
      
      setInsights(prev => [randomInsight, ...prev.slice(0, 4)]) // Keep latest 5 insights
      setIsProcessing(false)
    }, 2000)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'competitor': return TrendingUp
      case 'funding': return CheckCircle
      case 'market': return Globe
      case 'code': return AlertTriangle
      case 'opportunity': return Zap
      default: return Brain
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
            <Brain className={`w-6 h-6 ${isActive ? 'ambient-pulse' : ''}`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Ambient Agent</h2>
            <p className="text-sm text-gray-400">LangChain-powered intelligence</p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isActive 
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
              : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
          }`}
        >
          {isActive ? 'Active' : 'Paused'}
        </button>
      </div>

      {/* Current Activity */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
          <span className="text-sm font-medium text-gray-300">Current Activity</span>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center space-x-2">
            {isProcessing && (
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            )}
            <span className="text-sm text-gray-300">{currentActivity}</span>
          </div>
        </div>
      </div>

      {/* Recent Insights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Insights</h3>
          <span className="text-xs text-gray-400">{insights.length}/5</span>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {insights.map((insight) => {
              const IconComponent = getInsightIcon(insight.type)
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className={`p-4 rounded-lg border ${getPriorityColor(insight.priority)} interactive-card`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white truncate">
                          {insight.title}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{insight.source}</span>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{insight.timestamp.toLocaleTimeString('en-CA', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</span>
                        </div>
                      </div>
                      {insight.action && (
                        <div className="mt-2 pt-2 border-t border-gray-600">
                          <span className="text-xs text-blue-400 font-medium">
                            💡 {insight.action}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          
          {insights.length === 0 && isActive && (
            <div className="text-center py-8 text-gray-500">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Agent is warming up...</p>
              <p className="text-xs mt-1">First insights will appear shortly</p>
            </div>
          )}
          
          {!isActive && (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Ambient agent is paused</p>
              <p className="text-xs mt-1">Activate to start monitoring</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">{insights.length}</div>
            <div className="text-xs text-gray-400">Insights Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">
              {insights.filter(i => i.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-400">High Priority</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">99.2%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}