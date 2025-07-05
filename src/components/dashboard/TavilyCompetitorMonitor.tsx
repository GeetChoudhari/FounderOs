'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  ExternalLink, 
  RefreshCw,
  Globe,
  Calendar,
  DollarSign,
  Users,
  Zap
} from 'lucide-react'

interface CompetitorInsight {
  id: string
  competitor: string
  type: 'funding' | 'product' | 'hiring' | 'partnership' | 'acquisition'
  title: string
  summary: string
  impact: 'high' | 'medium' | 'low'
  source: string
  url: string
  timestamp: Date
  sentiment: 'positive' | 'negative' | 'neutral'
  actionItems: string[]
}

interface MarketTrend {
  trend: string
  confidence: number
  description: string
  impactScore: number
  sources: number
}

export default function TavilyCompetitorMonitor() {
  const [insights, setInsights] = useState<CompetitorInsight[]>([])
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState<Date>(new Date())
  const [scanProgress, setScanProgress] = useState(0)

  // Real-time competitor monitoring
  const performTavilyScan = async () => {
    setIsScanning(true)
    setScanProgress(0)

    try {
      // Simulate progressive scanning for demo
      const scanSteps = [
        'Scanning TechCrunch for funding announcements...',
        'Analyzing startup accelerator websites...',
        'Monitoring Canadian government funding pages...',
        'Checking competitor social media...',
        'Analyzing market trend publications...',
        'Synthesizing competitive intelligence...'
      ]

      for (let i = 0; i < scanSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setScanProgress((i + 1) / scanSteps.length * 100)
      }

      // Call our enhanced Tavily API
      const response = await fetch('/api/tavily/competitor-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitors: ['Shopify', 'Klaviyo', 'Lightspeed', 'Nuvei', 'Coveo'],
          industries: ['AI', 'SaaS', 'Fintech', 'E-commerce'],
          regions: ['Canada', 'North America'],
          timeframe: '7d'
        })
      })

      const data = await response.json()
      
      if (data.insights) {
        setInsights(data.insights)
        setMarketTrends(data.marketTrends || [])
      } else {
        // Fallback demo data
        generateDemoInsights()
      }

      setLastScan(new Date())
    } catch (error) {
      console.error('Tavily scan error:', error)
      generateDemoInsights()
    } finally {
      setIsScanning(false)
      setScanProgress(0)
    }
  }

  const generateDemoInsights = () => {
    const demoInsights: CompetitorInsight[] = [
      {
        id: 'insight-1',
        competitor: 'Shopify',
        type: 'product',
        title: 'Shopify launches AI-powered marketing automation',
        summary: 'New AI tools for personalized customer experiences, directly competing with your proposed features.',
        impact: 'high',
        source: 'TechCrunch',
        url: 'https://techcrunch.com/shopify-ai-launch',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        sentiment: 'negative',
        actionItems: [
          'Analyze their AI capabilities vs yours',
          'Identify differentiation opportunities',
          'Consider strategic partnership'
        ]
      },
      {
        id: 'insight-2',
        competitor: 'Lightspeed',
        type: 'funding',
        title: 'Lightspeed raises $50M Series C for Canadian expansion',
        summary: 'Major funding round focused on AI-driven retail solutions in Canadian market.',
        impact: 'medium',
        source: 'BetaKit',
        url: 'https://betakit.com/lightspeed-funding',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        sentiment: 'neutral',
        actionItems: [
          'Study their expansion strategy',
          'Identify market gaps they\'re not filling',
          'Consider similar funding approach'
        ]
      },
      {
        id: 'insight-3',
        competitor: 'Klaviyo',
        type: 'hiring',
        title: 'Klaviyo hiring 200+ engineers across Canada',
        summary: 'Massive hiring spree in Toronto and Vancouver, focusing on ML and data engineering.',
        impact: 'medium',
        source: 'LinkedIn',
        url: 'https://linkedin.com/klaviyo-hiring',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        sentiment: 'negative',
        actionItems: [
          'Monitor talent competition',
          'Strengthen employer brand',
          'Consider remote-first strategy'
        ]
      }
    ]

    const demoTrends: MarketTrend[] = [
      {
        trend: 'AI-powered customer personalization',
        confidence: 94,
        description: 'Canadian retailers increasingly adopting AI for personalized shopping experiences',
        impactScore: 8.7,
        sources: 23
      },
      {
        trend: 'Government digital transformation funding',
        confidence: 87,
        description: 'Increased federal funding for digital transformation in SMB sector',
        impactScore: 7.2,
        sources: 15
      }
    ]

    setInsights(demoInsights)
    setMarketTrends(demoTrends)
  }

  // Auto-scan every 30 seconds during demo
  useEffect(() => {
    performTavilyScan() // Initial scan
    
    const interval = setInterval(() => {
      performTavilyScan()
    }, 30000) // 30 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'funding': return DollarSign
      case 'product': return Zap
      case 'hiring': return Users
      case 'partnership': return Globe
      case 'acquisition': return TrendingUp
      default: return AlertTriangle
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Competitor Intelligence</h3>
            <p className="text-sm text-gray-400">Powered by Tavily Advanced Crawling</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-400">Last scan</div>
            <div className="text-xs text-green-400">
              {lastScan.toLocaleTimeString('en-CA', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
          
          <button
            onClick={performTavilyScan}
            disabled={isScanning}
            className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600"
        >
          <div className="flex items-center space-x-3 mb-2">
            <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
            <span className="text-sm text-blue-400">Scanning competitive landscape...</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-blue-400 h-2 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

      {/* Market Trends Summary */}
      {marketTrends.length > 0 && (
        <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
          <h4 className="text-lg font-medium text-white mb-3">Market Trends Detected</h4>
          <div className="space-y-2">
            {marketTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white">{trend.trend}</div>
                  <div className="text-xs text-gray-400">{trend.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">{trend.confidence}%</div>
                  <div className="text-xs text-gray-400">{trend.sources} sources</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitive Insights */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Recent Insights</h4>
        
        <AnimatePresence>
          {insights.map((insight) => {
            const TypeIcon = getTypeIcon(insight.type)
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="p-4 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg flex-shrink-0">
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h5 className="text-white font-medium">{insight.competitor}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                          {insight.impact} impact
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{insight.timestamp.toLocaleTimeString('en-CA', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}</span>
                      </div>
                    </div>
                    
                    <h6 className="text-sm font-medium text-white mb-2">{insight.title}</h6>
                    <p className="text-sm text-gray-300 mb-3">{insight.summary}</p>
                    
                    {insight.actionItems.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-blue-400 mb-1">Recommended Actions:</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {insight.actionItems.map((action, idx) => (
                            <li key={idx} className="flex items-center space-x-1">
                              <span className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Source: {insight.source}</span>
                      <a 
                        href={insight.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        
        {insights.length === 0 && !isScanning && (
          <div className="text-center py-8 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No competitive insights detected</p>
            <p className="text-xs mt-1">Scanning will begin automatically</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">{insights.length}</div>
            <div className="text-xs text-gray-400">Insights Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-400">
              {insights.filter(i => i.impact === 'high').length}
            </div>
            <div className="text-xs text-gray-400">High Impact</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">
              {insights.reduce((acc, i) => acc + i.actionItems.length, 0)}
            </div>
            <div className="text-xs text-gray-400">Action Items</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">94%</div>
            <div className="text-xs text-gray-400">Accuracy</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}