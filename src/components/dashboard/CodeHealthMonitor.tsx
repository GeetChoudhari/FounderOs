'use client'

import { motion } from 'framer-motion'
import { Code } from 'lucide-react'

export default function CodeHealthMonitor() {
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