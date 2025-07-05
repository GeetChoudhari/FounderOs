'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  Globe, 
  Code, 
  DollarSign, 
  AlertCircle,
  MapPin,
  Zap,
  Activity
} from 'lucide-react'

import AmbientAgent from '@/components/ambient/AmbientAgent'
import MarketIntelligence from '@/components/dashboard/MarketIntelligence'
import FundingOpportunities from '@/components/dashboard/FundingOpportunities'
import CodeHealthMonitor from '@/components/dashboard/CodeHealthMonitor'
import CanadianEcosystem from '@/components/dashboard/CanadianEcosystem'

export default function FounderOSDashboard() {
  const [isAmbientActive, setIsAmbientActive] = useState(true)
  const [notifications, setNotifications] = useState(0)

  // Simulate ambient agent notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "Ambient Intelligence",
      description: "AI agent monitoring your startup ecosystem 24/7",
      color: "from-purple-500 to-pink-500",
      prize: "LangChain $1,000"
    },
    {
      icon: Globe,
      title: "Market Intelligence",
      description: "Advanced web crawling for competitor insights",
      color: "from-blue-500 to-cyan-500",
      prize: "Tavily $2,000"
    },
    {
      icon: Code,
      title: "Code Health",
      description: "Real-time technical debt and performance monitoring",
      color: "from-green-500 to-emerald-500",
      prize: "Ross Video $600"
    },
    {
      icon: DollarSign,
      title: "Canadian Funding",
      description: "Government grants and accelerator opportunities",
      color: "from-yellow-500 to-orange-500",
      prize: "Google $500"
    }
  ]

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            FounderOS
          </h1>
          <p className="text-gray-400 mt-2">
            Your ambient AI co-founder for Canadian startups
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <AlertCircle className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5 py-0.5">
                  {notifications}
                </span>
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
            <Activity className={`w-4 h-4 ${isAmbientActive ? 'text-green-400' : 'text-gray-400'}`} />
            <span className="text-sm">
              {isAmbientActive ? 'Ambient Active' : 'Ambient Paused'}
            </span>
          </div>
        </div>
      </motion.header>

      {/* Feature Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{feature.description}</p>
            <div className="text-xs text-green-400 font-medium">
              🏆 {feature.prize}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Ambient Agent */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <AmbientAgent 
            isActive={isAmbientActive}
            onToggle={() => setIsAmbientActive(!isAmbientActive)}
          />
        </motion.div>

        {/* Right Column - Intelligence Panels */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          <MarketIntelligence />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FundingOpportunities />
            <CodeHealthMonitor />
          </div>
          <CanadianEcosystem />
        </motion.div>
      </div>

      {/* Live Demo Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Live Demo Active</span>
        </div>
      </motion.div>
    </div>
  )
}