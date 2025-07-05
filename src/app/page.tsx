'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Globe, 
  Code, 
  DollarSign, 
  AlertCircle,
  MapPin,
  Zap,
  Activity,
  Bell,
  Settings,
  Search,
  BarChart3,
  Users,
  Calendar,
  Target,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

import AmbientAgent from '@/components/ambient/AmbientAgent'
import TavilyCompetitorMonitor from '@/components/dashboard/TavilyCompetitorMonitor'
import MarketIntelligence from '@/components/dashboard/MarketIntelligence'
import FundingOpportunities from '@/components/dashboard/FundingOpportunities'
import CodeHealthMonitor from '@/components/dashboard/CodeHealthMonitor'
import CanadianEcosystem from '@/components/dashboard/CanadianEcosystem'

interface QuickStat {
  label: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: any
  color: string
}

interface Notification {
  id: string
  type: 'funding' | 'competitor' | 'market' | 'system'
  title: string
  message: string
  timestamp: Date
  priority: 'high' | 'medium' | 'low'
  read: boolean
}

export default function FounderOSDashboard() {
  // State management for ambient intelligence
  const [isAmbientActive, setIsAmbientActive] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [quickStats, setQuickStats] = useState<QuickStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Real-time clock for Canadian timezone
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    const generateQuickStats = () => {
      const stats: QuickStat[] = [
        {
          label: 'Active Opportunities',
          value: 47,
          change: '+12%',
          trend: 'up',
          icon: Target,
          color: 'text-green-400'
        },
        {
          label: 'Market Score',
          value: '94%',
          change: '+5%',
          trend: 'up',
          icon: TrendingUp,
          color: 'text-blue-400'
        },
        {
          label: 'Funding Pipeline',
          value: '$2.3M',
          change: '+$340K',
          trend: 'up',
          icon: DollarSign,
          color: 'text-green-400'
        },
        {
          label: 'Network Health',
          value: 89,
          change: 'Stable',
          trend: 'stable',
          icon: Users,
          color: 'text-purple-400'
        }
      ]
      setQuickStats(stats)
    }

    // Generate initial notifications
    const generateNotifications = () => {
      const newNotifications: Notification[] = [
        {
          id: '1',
          type: 'funding',
          title: 'New Grant Opportunity',
          message: 'Innovation Canada announced $50M clean tech funding. You match 94% of criteria.',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          priority: 'high',
          read: false
        },
        {
          id: '2',
          type: 'competitor',
          title: 'Competitor Activity',
          message: 'Shopify announced new AI features that may impact your market positioning.',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          priority: 'medium',
          read: false
        },
        {
          id: '3',
          type: 'market',
          title: 'Market Trend Alert',
          message: 'AI adoption in Canadian SMBs increased 340% - strong opportunity for expansion.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          priority: 'medium',
          read: true
        }
      ]
      setNotifications(newNotifications)
      setUnreadCount(newNotifications.filter(n => !n.read).length)
    }

    const timer = setTimeout(() => {
      generateQuickStats()
      generateNotifications()
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Ambient agent notifications
  useEffect(() => {
    if (!isAmbientActive) return

    const interval = setInterval(() => {
      // Simulate new ambient insights
      const insights = [
        'Detected 3 new Canadian accelerator applications opening',
        'Market volatility in fintech sector - strategic opportunity identified',
        'Government of Ontario announced new startup tax incentives',
        'Your competitor raised Series A - analysis complete'
      ]

      const randomInsight = insights[Math.floor(Math.random() * insights.length)]
      
      const newNotification: Notification = {
        id: `ambient-${Date.now()}`,
        type: 'system',
        title: 'Ambient Insight',
        message: randomInsight,
        timestamp: new Date(),
        priority: 'low',
        read: false
      }

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep latest 10
      setUnreadCount(prev => prev + 1)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [isAmbientActive])

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('en-CA', {
      timeZone: 'America/Toronto',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }, [])

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-CA', {
      timeZone: 'America/Toronto',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-400 bg-red-400/5'
      case 'medium': return 'border-l-yellow-400 bg-yellow-400/5'
      case 'low': return 'border-l-blue-400 bg-blue-400/5'
      default: return 'border-l-gray-400 bg-gray-400/5'
    }
  }

  const features = [
    {
      icon: Brain,
      title: "Ambient Intelligence",
      description: "AI agent monitoring Canadian startup ecosystem 24/7",
      color: "from-purple-500 to-pink-500",
      prize: "LangChain $1,000",
      status: isAmbientActive ? 'Active' : 'Paused',
      metric: '15 insights/hour'
    },
    {
      icon: Globe,
      title: "Market Intelligence",
      description: "Advanced web crawling for real-time competitive insights",
      color: "from-blue-500 to-cyan-500",
      prize: "Tavily $2,000",
      status: 'Scanning',
      metric: '47 sources monitored'
    },
    {
      icon: Code,
      title: "Code Health",
      description: "Real-time technical debt and performance monitoring",
      color: "from-green-500 to-emerald-500",
      prize: "Ross Video $600",
      status: 'Healthy',
      metric: '85% performance score'
    },
    {
      icon: DollarSign,
      title: "Canadian Funding",
      description: "Government grants and accelerator opportunities",
      color: "from-yellow-500 to-orange-500",
      prize: "Google $500",
      status: 'Tracking',
      metric: '$2.3M pipeline'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-4" />
          <div className="text-primary text-lg font-medium">Loading FounderOS...</div>
          <div className="text-secondary text-sm mt-2">Initializing ambient intelligence</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Enhanced Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">FounderOS</h1>
                  <p className="text-xs text-muted">Canadian Startup Command Center</p>
                </div>
              </div>
              
              {/* Quick Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#dashboard" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Dashboard
                </a>
                <a href="#funding" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Funding
                </a>
                <a href="#intelligence" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Intelligence
                </a>
                <a href="#network" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Network
                </a>
              </nav>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-card rounded-lg px-3 py-2 border border-surface-border">
                <Search className="w-4 h-4 text-muted mr-2" />
                <input 
                  type="text" 
                  placeholder="Search Canadian startups..."
                  className="bg-transparent text-sm text-primary placeholder-muted outline-none w-48"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 bg-card rounded-lg border border-surface-border hover:border-surface-hover transition-colors">
                  <Bell className="w-5 h-5 text-secondary" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Time & Location */}
              <div className="hidden lg:flex items-center space-x-3 bg-card rounded-lg px-3 py-2 border border-surface-border">
                <div className="text-right">
                  <div className="text-sm font-medium text-primary">{formatTime(currentTime)}</div>
                  <div className="text-xs text-muted">Toronto, ON</div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>

              {/* Settings */}
              <button className="p-2 bg-card rounded-lg border border-surface-border hover:border-surface-hover transition-colors">
                <Settings className="w-5 h-5 text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                Good {currentTime.getHours() < 12 ? 'morning' : currentTime.getHours() < 18 ? 'afternoon' : 'evening'}, Founder
              </h2>
              <p className="text-secondary">
                {formatDate(currentTime)} • Your ambient AI has been monitoring the ecosystem for {Math.floor(Math.random() * 12) + 1} hours
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-card rounded-lg px-4 py-2 border border-surface-border">
                <div className="flex items-center space-x-2">
                  <Activity className={`w-4 h-4 ${isAmbientActive ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm text-secondary">
                    Ambient AI {isAmbientActive ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-4 border border-surface-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-400/10 text-green-400' :
                    stat.trend === 'down' ? 'bg-red-400/10 text-red-400' :
                    'bg-gray-400/10 text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card-interactive group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-400 font-medium">🏆 {feature.prize}</div>
                  <div className="text-xs text-muted mt-1">{feature.status}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-secondary mb-4">{feature.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{feature.metric}</span>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Ambient Agent & Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-1 space-y-6"
          >
            <AmbientAgent 
              isActive={isAmbientActive}
              onToggle={() => setIsAmbientActive(!isAmbientActive)}
            />
            
            {/* Notifications Panel */}
            <div className="bg-card rounded-xl border border-surface-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-primary">Live Updates</h3>
                <span className="text-xs text-muted">{notifications.length} recent</span>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                <AnimatePresence>
                  {notifications.slice(0, 5).map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-3 rounded-lg border-l-2 ${getPriorityColor(notification.priority)}`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-medium text-primary">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        )}
                      </div>
                      <p className="text-xs text-secondary mb-2">{notification.message}</p>
                      <div className="text-xs text-muted">
                        {notification.timestamp.toLocaleTimeString('en-CA', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-3 space-y-6"
          >
            {/* Advanced Tavily Intelligence */}
            <TavilyCompetitorMonitor />
            
            {/* Secondary Intelligence Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketIntelligence />
              <FundingOpportunities />
            </div>
            
            {/* Code Health & Ecosystem */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeHealthMonitor />
              <CanadianEcosystem />
            </div>
          </motion.div>
        </div>

        {/* Live Demo Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Live Hackathon Demo</h3>
                <p className="text-sm text-secondary">Targeting $5,200+ in prizes across 6 categories</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-primary">Performance Score</div>
                <div className="text-2xl font-bold text-green-400">96/100</div>
              </div>
              <a 
                href="https://founderos.vercel.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center space-x-2"
              >
                <span>View Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}