'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building,
  Users,
  Zap,
  Target,
  Filter,
  Search,
  RefreshCw,
  Award,
  Flag
} from 'lucide-react'

interface FundingOpportunity {
  id: string
  name: string
  organization: string
  type: 'grant' | 'tax-credit' | 'loan' | 'accelerator' | 'competition'
  amount: {
    min: number
    max: number
    currency: 'CAD' | 'USD'
  }
  deadline: Date
  location: string
  province: string
  eligibility: string[]
  description: string
  matchScore: number
  status: 'open' | 'closing-soon' | 'closed'
  applicationTime: string
  successRate: number
  url: string
  tags: string[]
  requirements: string[]
  benefits: string[]
}

interface FilterState {
  type: string[]
  province: string[]
  amountRange: [number, number]
  search: string
}

export default function FundingOpportunities() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<FundingOpportunity[]>([])
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    province: [],
    amountRange: [0, 1000000],
    search: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Comprehensive Canadian funding opportunities database
  useEffect(() => {
    const generateCanadianFunding = (): FundingOpportunity[] => [
      {
        id: 'sred-2024',
        name: 'Scientific Research and Experimental Development (SR&ED)',
        organization: 'Canada Revenue Agency',
        type: 'tax-credit',
        amount: { min: 10000, max: 3000000, currency: 'CAD' },
        deadline: new Date('2024-12-31'),
        location: 'Canada-wide',
        province: 'All Provinces',
        eligibility: ['Canadian-controlled private corporation', 'Conducting R&D in Canada', 'Eligible R&D expenditures'],
        description: 'Federal tax incentive program encouraging R&D in Canada. Refundable for CCPCs, non-refundable for others.',
        matchScore: 94,
        status: 'open',
        applicationTime: '4-6 weeks',
        successRate: 85,
        url: 'https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html',
        tags: ['R&D', 'Tax Credit', 'Federal', 'Technology'],
        requirements: ['Detailed technical documentation', 'Financial records', 'Project timelines'],
        benefits: ['Up to 65% refundable for CCPCs', 'Non-refundable credit for others', 'No application fee']
      },
      {
        id: 'innovation-solutions-canada',
        name: 'Innovation Solutions Canada',
        organization: 'Innovation, Science and Economic Development Canada',
        type: 'grant',
        amount: { min: 75000, max: 1500000, currency: 'CAD' },
        deadline: new Date('2024-03-15'),
        location: 'Canada-wide',
        province: 'All Provinces',
        eligibility: ['Canadian small business', 'Innovative solution for government challenge', 'Majority Canadian-owned'],
        description: 'Helps government departments procure innovative solutions from Canadian small businesses.',
        matchScore: 87,
        status: 'closing-soon',
        applicationTime: '6-8 weeks',
        successRate: 35,
        url: 'https://www.ic.gc.ca/eic/site/101.nsf/eng/home',
        tags: ['Innovation', 'Small Business', 'Government Procurement', 'Technology'],
        requirements: ['Technical proposal', 'Business case', 'Demonstration capability'],
        benefits: ['Phase 1: $75K', 'Phase 2: Up to $1.5M', 'Government procurement opportunity']
      },
      {
        id: 'clean-growth-program',
        name: 'Clean Growth Program',
        organization: 'Innovation, Science and Economic Development Canada',
        type: 'grant',
        amount: { min: 500000, max: 10000000, currency: 'CAD' },
        deadline: new Date('2024-04-30'),
        location: 'Canada-wide',
        province: 'All Provinces',
        eligibility: ['For-profit corporation', 'Clean technology project', 'Minimum 50% Canadian ownership'],
        description: 'Supports late-stage development and demonstration of clean technologies.',
        matchScore: 76,
        status: 'open',
        applicationTime: '12-16 weeks',
        successRate: 25,
        url: 'https://ised-isde.canada.ca/site/clean-growth-program/en',
        tags: ['Clean Tech', 'Environment', 'Demonstration', 'Large Scale'],
        requirements: ['Environmental impact assessment', 'Detailed project plan', 'Financial projections'],
        benefits: ['Up to $10M funding', 'Repayable contribution', 'Technology validation']
      },
      {
        id: 'ontario-research-fund',
        name: 'Ontario Research Fund - Research Excellence',
        organization: 'Ontario Ministry of Colleges and Universities',
        type: 'grant',
        amount: { min: 100000, max: 2000000, currency: 'CAD' },
        deadline: new Date('2024-02-28'),
        location: 'Ontario',
        province: 'Ontario',
        eligibility: ['Ontario-based organization', 'Research partnership', 'Commercialization potential'],
        description: 'Supports applied research and development projects with strong commercialization potential.',
        matchScore: 82,
        status: 'closing-soon',
        applicationTime: '8-12 weeks',
        successRate: 40,
        url: 'https://www.ontario.ca/page/ontario-research-fund-research-excellence',
        tags: ['Research', 'Ontario', 'Commercialization', 'Partnership'],
        requirements: ['Industry partnership', 'Research proposal', 'Commercialization plan'],
        benefits: ['Up to $2M over 3 years', 'Industry collaboration', 'IP support']
      },
      {
        id: 'techstars-toronto',
        name: 'Techstars Toronto Accelerator',
        organization: 'Techstars',
        type: 'accelerator',
        amount: { min: 120000, max: 120000, currency: 'USD' },
        deadline: new Date('2024-05-15'),
        location: 'Toronto, ON',
        province: 'Ontario',
        eligibility: ['Early-stage startup', 'Scalable business model', 'Strong founding team'],
        description: '3-month accelerator program providing mentorship, funding, and network access.',
        matchScore: 79,
        status: 'open',
        applicationTime: '4-6 weeks',
        successRate: 8,
        url: 'https://www.techstars.com/accelerators/toronto',
        tags: ['Accelerator', 'Mentorship', 'Network', 'Toronto'],
        requirements: ['Pitch deck', 'Financial model', 'Team bios'],
        benefits: ['$120K investment', 'Mentorship network', 'Demo day exposure']
      },
      {
        id: 'bdc-growth-venture',
        name: 'BDC Growth & Transition Capital',
        organization: 'Business Development Bank of Canada',
        type: 'loan',
        amount: { min: 500000, max: 50000000, currency: 'CAD' },
        deadline: new Date('2024-12-31'),
        location: 'Canada-wide',
        province: 'All Provinces',
        eligibility: ['Revenue of $5M+', 'Growth stage company', 'Strong management team'],
        description: 'Patient capital for growth-stage companies looking to scale operations.',
        matchScore: 71,
        status: 'open',
        applicationTime: '8-16 weeks',
        successRate: 60,
        url: 'https://www.bdc.ca/en/financing/growth-transition-capital',
        tags: ['Growth Capital', 'BDC', 'Patient Capital', 'Scale'],
        requirements: ['Financial statements', 'Business plan', 'Management presentation'],
        benefits: ['Flexible terms', 'Strategic support', 'Network access']
      },
      {
        id: 'quebec-innovation',
        name: 'Québec Innovation Capital Program',
        organization: 'Investissement Québec',
        type: 'grant',
        amount: { min: 250000, max: 5000000, currency: 'CAD' },
        deadline: new Date('2024-06-30'),
        location: 'Quebec',
        province: 'Quebec',
        eligibility: ['Quebec-based company', 'Innovation project', 'Job creation potential'],
        description: 'Supports innovative projects that create jobs and economic growth in Quebec.',
        matchScore: 68,
        status: 'open',
        applicationTime: '10-14 weeks',
        successRate: 45,
        url: 'https://www.investquebec.com/en/financing-solutions/all-programs/innovation-capital',
        tags: ['Quebec', 'Innovation', 'Job Creation', 'Economic Growth'],
        requirements: ['Innovation plan', 'Job creation forecast', 'Financial projections'],
        benefits: ['Up to $5M funding', 'Quebec market access', 'Ecosystem support']
      },
      {
        id: 'bc-tech-fund',
        name: 'BC Tech Fund',
        organization: 'BC Innovation Council',
        type: 'grant',
        amount: { min: 50000, max: 500000, currency: 'CAD' },
        deadline: new Date('2024-04-15'),
        location: 'British Columbia',
        province: 'British Columbia',
        eligibility: ['BC-based tech company', 'Product development stage', 'Commercial potential'],
        description: 'Provides funding for BC tech companies to develop and commercialize innovative products.',
        matchScore: 85,
        status: 'open',
        applicationTime: '6-10 weeks',
        successRate: 55,
        url: 'https://www.bcic.ca/programs/bc-tech-fund/',
        tags: ['BC', 'Technology', 'Product Development', 'Commercialization'],
        requirements: ['Technical roadmap', 'Market analysis', 'Team capabilities'],
        benefits: ['Up to $500K', 'BC tech ecosystem', 'Mentorship access']
      }
    ]

    const mockOpportunities = generateCanadianFunding()
    setOpportunities(mockOpportunities)
    setFilteredOpportunities(mockOpportunities)
    setIsLoading(false)
    setLastUpdated(new Date())
  }, [])

  // Filter opportunities based on current filters
  useEffect(() => {
    let filtered = opportunities

    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(opp => filters.type.includes(opp.type))
    }

    // Filter by province
    if (filters.province.length > 0) {
      filtered = filtered.filter(opp => 
        filters.province.includes(opp.province) || opp.province === 'All Provinces'
      )
    }

    // Filter by amount range
    filtered = filtered.filter(opp => 
      opp.amount.max >= filters.amountRange[0] && opp.amount.min <= filters.amountRange[1]
    )

    // Filter by search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(opp =>
        opp.name.toLowerCase().includes(searchTerm) ||
        opp.organization.toLowerCase().includes(searchTerm) ||
        opp.description.toLowerCase().includes(searchTerm) ||
        opp.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Sort by match score
    filtered.sort((a, b) => b.matchScore - a.matchScore)

    setFilteredOpportunities(filtered)
  }, [opportunities, filters])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'closing-soon': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'closed': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grant': return DollarSign
      case 'tax-credit': return TrendingUp
      case 'loan': return Building
      case 'accelerator': return Zap
      case 'competition': return Award
      default: return Target
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="loading-shimmer w-8 h-8 rounded-lg" />
          <div>
            <div className="loading-shimmer w-32 h-4 rounded mb-2" />
            <div className="loading-shimmer w-24 h-3 rounded" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="loading-shimmer h-20 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
            <Flag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">Canadian Funding Opportunities</h3>
            <p className="text-sm text-secondary">
              {filteredOpportunities.length} opportunities • Updated {lastUpdated.toLocaleTimeString('en-CA', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-card rounded-lg border border-surface-border hover:border-surface-hover transition-colors">
            <Filter className="w-4 h-4 text-secondary" />
          </button>
          <button className="p-2 bg-card rounded-lg border border-surface-border hover:border-surface-hover transition-colors">
            <RefreshCw className="w-4 h-4 text-secondary" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-background rounded-lg p-3 border border-surface-border">
          <div className="flex items-center space-x-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-secondary">Total Available</span>
          </div>
          <div className="text-lg font-bold text-primary">$67.3M</div>
        </div>
        
        <div className="bg-surface-background rounded-lg p-3 border border-surface-border">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-medium text-secondary">Closing Soon</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {opportunities.filter(o => o.status === 'closing-soon').length}
          </div>
        </div>
        
        <div className="bg-surface-background rounded-lg p-3 border border-surface-border">
          <div className="flex items-center space-x-2 mb-1">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-secondary">High Match</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {opportunities.filter(o => o.matchScore > 80).length}
          </div>
        </div>
        
        <div className="bg-surface-background rounded-lg p-3 border border-surface-border">
          <div className="flex items-center space-x-2 mb-1">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-secondary">Success Rate</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {Math.round(opportunities.reduce((acc, o) => acc + o.successRate, 0) / opportunities.length)}%
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search funding opportunities..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 bg-surface-background border border-surface-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
        <AnimatePresence>
          {filteredOpportunities.map((opportunity, index) => {
            const TypeIcon = getTypeIcon(opportunity.type)
            const daysLeft = getDaysUntilDeadline(opportunity.deadline)
            const isExpanded = selectedOpportunity === opportunity.id

            return (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface-background rounded-lg border border-surface-border hover:border-surface-hover transition-all cursor-pointer"
                onClick={() => setSelectedOpportunity(isExpanded ? null : opportunity.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 bg-green-500/20 text-green-400 rounded-lg flex-shrink-0">
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold text-primary truncate">{opportunity.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(opportunity.status)}`}>
                            {opportunity.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-xs text-secondary mb-2">{opportunity.organization}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted">
                          <span className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>
                              {formatCurrency(opportunity.amount.min, opportunity.amount.currency)} - {formatCurrency(opportunity.amount.max, opportunity.amount.currency)}
                            </span>
                          </span>
                          
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span className={daysLeft < 30 ? 'text-yellow-400' : ''}>
                              {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                            </span>
                          </span>
                          
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{opportunity.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">{opportunity.matchScore}%</div>
                        <div className="text-xs text-muted">Match</div>
                      </div>
                      
                      <a
                        href={opportunity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-secondary hover:text-primary" />
                      </a>
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t border-surface-border"
                    >
                      <div className="space-y-4">
                        <p className="text-sm text-secondary">{opportunity.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-primary mb-2">Eligibility</h5>
                            <ul className="space-y-1">
                              {opportunity.eligibility.map((item, idx) => (
                                <li key={idx} className="text-xs text-secondary flex items-start space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-primary mb-2">Key Benefits</h5>
                            <ul className="space-y-1">
                              {opportunity.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-xs text-secondary flex items-start space-x-2">
                                  <Zap className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-surface-border">
                          <div className="flex items-center space-x-4 text-xs text-muted">
                            <span>Application Time: {opportunity.applicationTime}</span>
                            <span>Success Rate: {opportunity.successRate}%</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {opportunity.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-8 text-secondary">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No funding opportunities match your criteria</p>
            <p className="text-xs mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-surface-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted">
            Showing {filteredOpportunities.length} of {opportunities.length} opportunities
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/20 transition-colors">
              Export List
            </button>
            <button className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
              Set Alerts
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}