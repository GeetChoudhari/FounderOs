'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  GitBranch,
  Bug,
  Shield,
  Zap,
  Clock,
  BarChart3,
  RefreshCw
} from 'lucide-react'

interface CodeMetric {
  name: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'critical'
  details: string
}

interface SecurityIssue {
  id: string
  severity: 'high' | 'medium' | 'low'
  type: string
  file: string
  line: number
  description: string
  recommendation: string
}

interface PerformanceInsight {
  category: string
  impact: 'high' | 'medium' | 'low'
  description: string
  suggestion: string
  estimatedSavings: string
}

export default function CodeHealthMonitor() {
  const [metrics, setMetrics] = useState<CodeMetric[]>([])
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>([])
  const [performanceInsights, setPerformanceInsights] = useState<PerformanceInsight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date>(new Date())
  const [overallScore, setOverallScore] = useState(85)

  // Real-time MCP analysis simulation
  const performMCPAnalysis = async () => {
    setIsAnalyzing(true)

    try {
      // Simulate MCP Model Context Protocol analysis
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Call our MCP API endpoint
      const response = await fetch('/api/mcp/code-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repositories: ['founderos/main', 'founderos/api'],
          analysisTypes: ['security', 'performance', 'quality', 'dependencies']
        })
      })

      const data = await response.json()
      
      if (data.metrics) {
        setMetrics(data.metrics)
        setSecurityIssues(data.securityIssues || [])
        setPerformanceInsights(data.performanceInsights || [])
        setOverallScore(data.overallScore || 85)
      } else {
        // Fallback demo data
        generateDemoAnalysis()
      }

      setLastAnalysis(new Date())
    } catch (error) {
      console.error('MCP Analysis error:', error)
      generateDemoAnalysis()
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateDemoAnalysis = () => {
    const demoMetrics: CodeMetric[] = [
      {
        name: 'Technical Debt',
        value: 23,
        unit: 'hours',
        trend: 'down',
        status: 'good',
        details: 'Decreased by 15% this week through refactoring efforts'
      },
      {
        name: 'Code Coverage',
        value: 78,
        unit: '%',
        trend: 'up',
        status: 'good',
        details: 'Improved test coverage for API routes and components'
      },
      {
        name: 'Bundle Size',
        value: 245,
        unit: 'KB',
        trend: 'stable',
        status: 'good',
        details: 'Optimized build size within recommended limits'
      },
      {
        name: 'Dependencies',
        value: 12,
        unit: 'outdated',
        trend: 'down',
        status: 'warning',
        details: 'Several dependencies need updates for security'
      },
      {
        name: 'Performance Score',
        value: 92,
        unit: '/100',
        trend: 'up',
        status: 'good',
        details: 'Lighthouse performance score improved'
      },
      {
        name: 'Security Score',
        value: 88,
        unit: '/100',
        trend: 'stable',
        status: 'good',
        details: 'No critical vulnerabilities detected'
      }
    ]

    const demoSecurity: SecurityIssue[] = [
      {
        id: 'sec-1',
        severity: 'medium',
        type: 'Dependency Vulnerability',
        file: 'package.json',
        line: 23,
        description: 'lodash has a known prototype pollution vulnerability',
        recommendation: 'Update to lodash@4.17.21 or higher'
      },
      {
        id: 'sec-2',
        severity: 'low',
        type: 'Weak Cryptography',
        file: 'utils/encryption.ts',
        line: 15,
        description: 'MD5 hash function detected',
        recommendation: 'Replace with SHA-256 or bcrypt for password hashing'
      }
    ]

    const demoPerformance: PerformanceInsight[] = [
      {
        category: 'Bundle Optimization',
        impact: 'medium',
        description: 'Large unused dependencies detected in client bundle',
        suggestion: 'Implement dynamic imports for non-critical components',
        estimatedSavings: '45KB bundle reduction'
      },
      {
        category: 'Image Optimization',
        impact: 'high',
        description: 'Unoptimized images affecting load times',
        suggestion: 'Use Next.js Image component with WebP format',
        estimatedSavings: '2.3s faster load time'
      }
    ]

    setMetrics(demoMetrics)
    setSecurityIssues(demoSecurity)
    setPerformanceInsights(demoPerformance)
    setOverallScore(85)
  }

  // Auto-analyze every 60 seconds during demo
  useEffect(() => {
    performMCPAnalysis() // Initial analysis
    
    const interval = setInterval(() => {
      performMCPAnalysis()
    }, 60000) // 60 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-400/10'
      case 'medium': return 'text-yellow-400 bg-yellow-400/10'
      case 'low': return 'text-blue-400 bg-blue-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />
      case 'stable': return <BarChart3 className="w-4 h-4 text-gray-400" />
      default: return <BarChart3 className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Code Health Monitor</h3>
            <p className="text-sm text-gray-400">MCP Real-time Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{overallScore}</div>
            <div className="text-xs text-gray-400">Health Score</div>
          </div>
          
          <button
            onClick={performMCPAnalysis}
            disabled={isAnalyzing}
            className="p-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600"
        >
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
            <span className="text-sm text-purple-400">Running MCP analysis...</span>
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${getStatusColor(metric.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-300">{metric.name}</div>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">{metric.value}</span>
              <span className="text-xs text-gray-400">{metric.unit}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
              {metric.details}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Issues */}
      {securityIssues.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="w-4 h-4 text-yellow-400" />
            <h4 className="text-sm font-medium text-white">Security Issues</h4>
          </div>
          <div className="space-y-2">
            {securityIssues.map((issue) => (
              <div key={issue.id} className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                    <span className="text-sm font-medium text-white">{issue.type}</span>
                  </div>
                  <span className="text-xs text-gray-400">{issue.file}:{issue.line}</span>
                </div>
                <p className="text-xs text-gray-300 mb-2">{issue.description}</p>
                <p className="text-xs text-blue-400">💡 {issue.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Insights */}
      {performanceInsights.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-4 h-4 text-green-400" />
            <h4 className="text-sm font-medium text-white">Performance Insights</h4>
          </div>
          <div className="space-y-2">
            {performanceInsights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{insight.category}</span>
                  <span className="text-xs text-green-400">{insight.estimatedSavings}</span>
                </div>
                <p className="text-xs text-gray-300 mb-2">{insight.description}</p>
                <p className="text-xs text-blue-400">🚀 {insight.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span>Last analysis: {lastAnalysis.toLocaleTimeString('en-CA', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{securityIssues.length} security issues</span>
            <span>{performanceInsights.length} optimizations</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}