'use client'

import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'

export default function FundingOpportunities() {
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