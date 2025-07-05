'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building,
  MapPin,
  Calendar,
  Target,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Globe,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

interface MarketData {
  date: string
  funding: number
  startups: number
  valuation: number
  deals: number
  timestamp: number
}

interface RegionalData {
  province: string
  startups: number
  funding: number
  growth: number
  color: string
}

interface SectorData {
  sector: string
  value: number
  growth: number
  color: string
}

interface MetricCard {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: any
  color: string
  subtitle?: string
}

export default function RealtimeDataDashboard() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [regionalData, setRegionalData] = useState<RegionalData[]>([])
  const [sectorData, setSectorData] = useState<SectorData[]>([])
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Professional color palette for charts
  const chartColors = {
    primary: '#3b82f6',
    secondary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    purple: '#8b5cf6',
    gradient: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  }

  // Generate realistic Canadian startup market data
  useEffect(() => {
    const generateMarketData = () => {
      const baseDate = new Date()
      const data: MarketData[] = []

      for (let i = 29; i >= 0; i--) {
        const date = new Date(baseDate)
        date.setDate(date.getDate() - i)
        
        // Simulate realistic Canadian startup metrics
        const fundingBase = 45 + Math.sin(i * 0.2) * 15 + Math.random() * 10
        const startupsBase = 120 + Math.sin(i * 0.15) * 20 + Math.random() * 15
        const valuationBase = 2.1 + Math.sin(i * 0.1) * 0.5 + Math.random() * 0.3
        const dealsBase = 8 + Math.sin(i * 0.3) * 3 + Math.random() * 2

        data.push({
          date: date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }),
          funding: Math.round(fundingBase * 10) / 10,
          startups: Math.round(startupsBase),
          valuation: Math.round(valuationBase * 10) / 10,
          deals: Math.round(dealsBase),
          timestamp: date.getTime(),
        })
      }

      return data
    }

    const generateRegionalData = (): RegionalData[] => [
      {
        province: 'Ontario',
        startups: 2847,
        funding: 1240,
        growth: 15.3,
        color: chartColors.primary,
      },
      {
        province: 'Quebec',
        startups: 1523,
        funding: 680,
        growth: 12.8,
        color: chartColors.secondary,
      },
      {
        province: 'British Columbia',
        startups: 1891,
        funding: 950,
        growth: 18.5,
        color: chartColors.success,
      },
      {
        province: 'Alberta',
        startups: 892,
        funding: 420,
        growth: 9.2,
        color: chartColors.warning,
      },
      {
        province: 'Other',
        startups: 547,
        funding: 180,
        growth: 6.7,
        color: chartColors.purple,
      },
    ]

    const generateSectorData = (): SectorData[] => [
      { sector: 'Fintech', value: 28, growth: 22.1, color: chartColors.primary },
      { sector: 'AI/ML', value: 24, growth: 34.5, color: chartColors.secondary },
      { sector: 'Healthtech', value: 18, growth: 18.7, color: chartColors.success },
      { sector: 'Clean Tech', value: 15, growth: 28.9, color: chartColors.warning },
      { sector: 'E-commerce', value: 10, growth: 12.3, color: chartColors.error },
      { sector: 'Other', value: 5, growth: 8.1, color: chartColors.purple },
    ]

    setMarketData(generateMarketData())
    setRegionalData(generateRegionalData())
    setSectorData(generateSectorData())
  }, [])

  // Real-time data updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setMarketData(prevData => {
        const newData = [...prevData]
        const lastPoint = newData[newData.length - 1]
        
        // Add slight variations to simulate real-time updates
        const updatedPoint = {
          ...lastPoint,
          funding: Math.max(0, lastPoint.funding + (Math.random() - 0.5) * 2),
          startups: Math.max(0, lastPoint.startups + Math.floor((Math.random() - 0.5) * 5)),
          valuation: Math.max(0, lastPoint.valuation + (Math.random() - 0.5) * 0.1),
          deals: Math.max(0, lastPoint.deals + Math.floor((Math.random() - 0.5) * 1)),
        }
        
        newData[newData.length - 1] = updatedPoint
        return newData
      })
      
      setLastUpdate(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isLive])

  // Metric cards calculation
  const metricCards: MetricCard[] = useMemo(() => {
    if (marketData.length === 0) return []

    const latest = marketData[marketData.length - 1]
    const previous = marketData[marketData.length - 2] || latest

    return [
      {
        title: 'Total Funding',
        value: `$${latest.funding}M`,
        change: `${((latest.funding - previous.funding) / previous.funding * 100).toFixed(1)}%`,
        trend: latest.funding > previous.funding ? 'up' : latest.funding < previous.funding ? 'down' : 'stable',
        icon: DollarSign,
        color: 'text-green-400',
        subtitle: 'CAD Monthly',
      },
      {
        title: 'Active Startups',
        value: latest.startups.toLocaleString(),
        change: `+${latest.startups - previous.startups}`,
        trend: latest.startups > previous.startups ? 'up' : latest.startups < previous.startups ? 'down' : 'stable',
        icon: Building,
        color: 'text-blue-400',
        subtitle: 'Registered',
      },
      {
        title: 'Avg Valuation',
        value: `$${latest.valuation}M`,
        change: `${((latest.valuation - previous.valuation) / previous.valuation * 100).toFixed(1)}%`,
        trend: latest.valuation > previous.valuation ? 'up' : latest.valuation < previous.valuation ? 'down' : 'stable',
        icon: Target,
        color: 'text-purple-400',
        subtitle: 'Pre-Series A',
      },
      {
        title: 'Weekly Deals',
        value: latest.deals,
        change: `${latest.deals - previous.deals > 0 ? '+' : ''}${latest.deals - previous.deals}`,
        trend: latest.deals > previous.deals ? 'up' : latest.deals < previous.deals ? 'down' : 'stable',
        icon: Activity,
        color: 'text-cyan-400',
        subtitle: 'Completed',
      },
    ]
  }, [marketData])

  // Custom tooltip components
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-surface-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-primary mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Funding') ? '$' : ''}{entry.value}{entry.name.includes('Funding') ? 'M' : ''}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />
      default: return <BarChart3 className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Live Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Canadian Startup Ecosystem</h2>
          <p className="text-secondary">Real-time market intelligence and trends</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-secondary">
              {isLive ? 'Live' : 'Paused'} • Updated {lastUpdate.toLocaleTimeString('en-CA', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-green-400/10 text-green-400 hover:bg-green-400/20' 
                : 'bg-gray-400/10 text-gray-400 hover:bg-gray-400/20'
            }`}
          >
            {isLive ? 'Live' : 'Paused'}
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card group cursor-pointer hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-opacity-10 ${metric.color}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-secondary">{metric.title}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-primary">{metric.value}</span>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' : 
                  metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              {metric.subtitle && (
                <p className="text-xs text-muted">{metric.subtitle}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funding Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Funding Trends</h3>
              <p className="text-sm text-secondary">30-day rolling average</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <span className="text-xs text-muted">Monthly Funding (CAD)</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketData}>
                <defs>
                  <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-surface-border))" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgb(var(--color-text-secondary))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgb(var(--color-text-secondary))', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="funding"
                  stroke={chartColors.primary}
                  fillOpacity={1}
                  fill="url(#fundingGradient)"
                  strokeWidth={2}
                />
                <ReferenceLine y={50} stroke={chartColors.warning} strokeDasharray="2 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Regional Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Regional Distribution</h3>
              <p className="text-sm text-secondary">Active startups by province</p>
            </div>
            <MapPin className="w-5 h-5 text-muted" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="startups"
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-card border border-surface-border rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium text-primary">{data.province}</p>
                          <p className="text-sm text-secondary">{data.startups.toLocaleString()} startups</p>
                          <p className="text-sm text-green-400">+{data.growth}% growth</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {regionalData.map((region, index) => (
              <div key={region.province} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: region.color }}
                />
                <span className="text-xs text-secondary">{region.province}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Startup Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Daily Activity</h3>
              <p className="text-sm text-secondary">New registrations & deals</p>
            </div>
            <Activity className="w-5 h-5 text-muted" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-surface-border))" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgb(var(--color-text-secondary))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgb(var(--color-text-secondary))', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="deals" fill={chartColors.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sector Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Sector Growth</h3>
              <p className="text-sm text-secondary">YoY growth by industry</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          
          <div className="space-y-3">
            {sectorData.map((sector, index) => (
              <motion.div
                key={sector.sector}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-surface-background rounded-lg border border-surface-border"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="text-sm font-medium text-primary">{sector.sector}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{sector.value}%</div>
                    <div className="text-xs text-green-400">+{sector.growth}%</div>
                  </div>
                  <div className="w-16 bg-surface-border rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${sector.value * 2}%`,
                        backgroundColor: sector.color 
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Ecosystem Health Score</h3>
              <p className="text-sm text-secondary">Comprehensive market analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">94</div>
              <div className="text-xs text-muted">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">12%</div>
              <div className="text-xs text-muted">Monthly Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2,847</div>
              <div className="text-xs text-muted">Active Startups</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}