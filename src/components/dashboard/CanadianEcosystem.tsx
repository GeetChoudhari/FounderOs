'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function CanadianEcosystem() {
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