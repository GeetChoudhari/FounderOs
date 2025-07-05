'use client'

import { motion } from 'framer-motion'
import { Globe, DollarSign, Code, MapPin, TrendingUp, AlertCircle } from 'lucide-react'

// Market Intelligence Component (Tavily Prize)
export function MarketIntelligence() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
          <Globe className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Market Intelligence</h3>
          <p className="text-sm text-gray-400">Powered by Tavily Web Crawling</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Competitor Analysis</span>
            <span className="text-xs text-green-400">Live</span>
          </div>
          <p className="text-xs text-gray-300">Monitoring 15 competitors across Canadian market</p>
        </div>
        
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Market Trends</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-xs text-gray-300">AI adoption in SMBs up 340% this quarter</p>
        </div>
      </div>
    </motion.div>
  )
}

// Funding Opportunities Component (Canadian Focus)
export function FundingOpportunities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Funding Opportunities</h3>
          <p className="text-sm text-gray-400">Canadian grants & programs</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-gray-900/50 rounded-lg border border-green-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">SR&ED Tax Credits</span>
            <span className="text-xs text-green-400">Eligible</span>
          </div>
          <p className="text-xs text-gray-300">Up to $3M in R&D tax credits available</p>
        </div>
        
        <div className="p-3 bg-gray-900/50 rounded-lg border border-yellow-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Innovation Canada</span>
            <span className="text-xs text-yellow-400">Deadline: Mar 15</span>
          </div>
          <p className="text-xs text-gray-300">$50M clean tech funding round</p>
        </div>
      </div>
    </motion.div>
  )
}

// Code Health Monitor Component (MCP Prize)
export function CodeHealthMonitor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Code Health</h3>
          <p className="text-sm text-gray-400">MCP real-time monitoring</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Technical Debt</span>
            <span className="text-xs text-yellow-400">Medium</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Performance Score</span>
            <span className="text-xs text-green-400">Good</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Canadian Ecosystem Component
export function CanadianEcosystem() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Canadian Startup Ecosystem</h3>
          <p className="text-sm text-gray-400">Regional opportunities & connections</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-xs text-gray-400">Active Accelerators</div>
          </div>
        </div>
        
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">$2.1B</div>
            <div className="text-xs text-gray-400">Q4 Funding</div>
          </div>
        </div>
        
        <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">43</div>
            <div className="text-xs text-gray-400">Gov Programs</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Export all components
export default {
  MarketIntelligence,
  FundingOpportunities,
  CodeHealthMonitor,
  CanadianEcosystem
}