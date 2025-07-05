'use client'

import { motion } from 'framer-motion'
import { Globe, TrendingUp } from 'lucide-react'

export default function MarketIntelligence() {
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