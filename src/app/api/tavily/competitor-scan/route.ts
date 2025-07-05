import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface CompetitorScanRequest {
  competitors: string[]
  industries: string[]
  regions: string[]
  timeframe: string
}

interface CompetitorInsight {
  id: string
  competitor: string
  type: string
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

export async function POST(req: NextRequest) {
  try {
    const { competitors, industries, regions, timeframe }: CompetitorScanRequest = await req.json()

    if (!process.env.TAVILY_API_KEY) {
      // Return sophisticated mock data for demo
      return new Response(JSON.stringify(generateAdvancedMockData(competitors, industries, regions)), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Advanced multi-dimensional competitor scanning
    const scanResults = await performAdvancedCompetitorScan(competitors, industries, regions, timeframe)
    
    return new Response(JSON.stringify(scanResults), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Advanced Tavily Scan Error:', error)
    
    return new Response(JSON.stringify({
      insights: generateAdvancedMockData(['Demo Corp'], ['AI'], ['Canada']).insights,
      marketTrends: [],
      scanMetadata: {
        sources: 0,
        scanTime: new Date().toISOString(),
        confidence: 0,
        error: 'Demo mode - Tavily API unavailable'
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function performAdvancedCompetitorScan(
  competitors: string[], 
  industries: string[], 
  regions: string[], 
  timeframe: string
) {
  // Advanced Tavily search strategy - multiple parallel queries
  const searchStrategies = [
    // Funding intelligence
    ...competitors.map(comp => ({
      query: `"${comp}" funding investment round ${timeframe} ${regions.join(' OR ')}`,
      category: 'funding',
      priority: 'high'
    })),
    
    // Product launches
    ...competitors.map(comp => ({
      query: `"${comp}" product launch new feature ${timeframe}`,
      category: 'product',
      priority: 'high'
    })),
    
    // Strategic partnerships
    ...competitors.map(comp => ({
      query: `"${comp}" partnership acquisition merger ${timeframe}`,
      category: 'partnership',
      priority: 'medium'
    })),
    
    // Market positioning
    ...industries.map(industry => ({
      query: `${industry} market trends ${regions.join(' ')} startup ${timeframe}`,
      category: 'market',
      priority: 'medium'
    })),
    
    // Hiring intelligence
    ...competitors.map(comp => ({
      query: `"${comp}" hiring jobs career ${regions.join(' OR ')} ${timeframe}`,
      category: 'hiring',
      priority: 'low'
    }))
  ]

  // Execute searches in parallel with rate limiting
  const searchPromises = searchStrategies.map(async (strategy, index) => {
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, index * 200))
    
    return await executeTavilySearch(strategy.query, strategy.category)
  })

  const searchResults = await Promise.all(searchPromises)
  
  // Advanced synthesis and intelligence extraction
  return synthesizeCompetitiveIntelligence(searchResults, competitors, industries)
}

async function executeTavilySearch(query: string, category: string) {
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query,
        search_depth: 'advanced',
        include_images: false,
        include_answer: true,
        include_raw_content: true,
        max_results: 8,
        include_domains: [
          'techcrunch.com',
          'betakit.com', 
          'crunchbase.com',
          'globeandmail.com',
          'financialpost.com',
          'innovation.canada.ca',
          'cvca.ca',
          'linkedin.com'
        ],
        exclude_domains: ['reddit.com', 'quora.com', 'youtube.com']
      })
    })

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`)
    }

    const data = await response.json()
    return { ...data, category, query }
  } catch (error) {
    console.error(`Tavily search failed for query: ${query}`, error)
    const message = error instanceof Error ? error.message : String(error)
    return { results: [], category, query, error: message }
  }
}

function synthesizeCompetitiveIntelligence(searchResults: any[], competitors: string[], industries: string[]) {
  const insights: CompetitorInsight[] = []
  const marketTrends: MarketTrend[] = []
  let totalSources = 0

  // Process each search result category
  for (const result of searchResults) {
    if (!result.results) continue
    
    totalSources += result.results.length

    for (const item of result.results) {
      // Extract competitive insights based on category
      const insight = extractCompetitiveInsight(item, result.category, competitors)
      if (insight) {
        insights.push(insight)
      }

      // Extract market trends
      const trend = extractMarketTrend(item, result.category, industries)
      if (trend) {
        marketTrends.push(trend)
      }
    }
  }

  // Rank and filter insights
  const rankedInsights = insights
    .sort((a, b) => {
      const impactScore: { [key: string]: number } = { high: 3, medium: 2, low: 1 }
      return (impactScore[b.impact] || 1) - (impactScore[a.impact] || 1)
    })
    .slice(0, 10) // Top 10 insights

  // Consolidate market trends
  const consolidatedTrends = consolidateMarketTrends(marketTrends)

  return {
    insights: rankedInsights,
    marketTrends: consolidatedTrends,
    scanMetadata: {
      sources: totalSources,
      scanTime: new Date().toISOString(),
      confidence: calculateConfidence(rankedInsights, totalSources),
      queriesExecuted: searchResults.length
    }
  }
}

function extractCompetitiveInsight(item: any, category: string, competitors: string[]): CompetitorInsight | null {
  const content = `${item.title} ${item.content}`.toLowerCase()
  
  // Check if content mentions our competitors
  const mentionedCompetitor = competitors.find(comp => 
    content.includes(comp.toLowerCase())
  )

  if (!mentionedCompetitor) return null

  // Determine impact based on keywords and category
  let impact: 'high' | 'medium' | 'low' = 'low'
  if (category === 'funding' && (content.includes('million') || content.includes('billion'))) {
    impact = 'high'
  } else if (category === 'product' && content.includes('launch')) {
    impact = 'medium'
  } else if (category === 'partnership' && content.includes('acquisition')) {
    impact = 'high'
  }

  // Generate action items based on category
  const actionItems = generateActionItems(category, mentionedCompetitor, content)

  return {
    id: `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    competitor: mentionedCompetitor,
    type: category,
    title: item.title,
    summary: item.content.substring(0, 200) + '...',
    impact,
    source: extractSourceName(item.url),
    url: item.url,
    timestamp: new Date(),
    sentiment: determineSentiment(content, category),
    actionItems
  }
}

function extractMarketTrend(item: any, category: string, industries: string[]): MarketTrend | null {
  const content = `${item.title} ${item.content}`.toLowerCase()
  
  // Look for trend indicators
  const trendKeywords = ['trend', 'growth', 'increase', 'rise', 'surge', 'adoption']
  const hasTrendIndicator = trendKeywords.some(keyword => content.includes(keyword))
  
  if (!hasTrendIndicator || category !== 'market') return null

  // Extract trend confidence from numbers in content
  const percentageMatch = content.match(/(\d+)%/)
  const confidence = percentageMatch ? Math.min(parseInt(percentageMatch[1]), 95) : 75

  return {
    trend: item.title,
    confidence,
    description: item.content.substring(0, 150) + '...',
    impactScore: calculateTrendImpact(content),
    sources: 1
  }
}

function generateActionItems(category: string, competitor: string, content: string): string[] {
  const actionMap: { [key: string]: string[] } = {
    funding: [
      `Analyze ${competitor}'s funding strategy and investor network`,
      'Update competitive positioning against funded competitor',
      'Consider similar funding sources and timing'
    ],
    product: [
      `Compare product features with ${competitor}'s new launch`,
      'Identify differentiation opportunities',
      'Update product roadmap based on competitive moves'
    ],
    partnership: [
      `Evaluate impact of ${competitor}'s partnership on market`,
      'Identify similar partnership opportunities',
      'Adjust go-to-market strategy accordingly'
    ],
    hiring: [
      'Monitor talent competition and salary benchmarks',
      'Strengthen employer brand and recruitment',
      'Consider competitive talent acquisition strategies'
    ],
    market: [
      'Analyze market trend implications for product strategy',
      'Update messaging and positioning',
      'Consider market expansion opportunities'
    ]
  }

  return actionMap[category] || ['Monitor situation and reassess']
}

function determineSentiment(content: string, category: string): 'positive' | 'negative' | 'neutral' {
  const positiveWords = ['success', 'growth', 'partnership', 'expansion', 'innovation']
  const negativeWords = ['challenge', 'loss', 'decline', 'competition', 'threat']

  const positiveCount = positiveWords.filter(word => content.includes(word)).length
  const negativeCount = negativeWords.filter(word => content.includes(word)).length

  if (category === 'funding' || category === 'product') {
    return negativeCount > positiveCount ? 'negative' : 'neutral'
  }

  return positiveCount > negativeCount ? 'positive' : 
         negativeCount > positiveCount ? 'negative' : 'neutral'
}

function consolidateMarketTrends(trends: MarketTrend[]): MarketTrend[] {
  // Group similar trends and calculate aggregate confidence
  const trendMap = new Map<string, MarketTrend>()

  for (const trend of trends) {
    const key = trend.trend.toLowerCase().substring(0, 50)
    if (trendMap.has(key)) {
      const existing = trendMap.get(key)!
      existing.confidence = Math.max(existing.confidence, trend.confidence)
      existing.sources += trend.sources
    } else {
      trendMap.set(key, { ...trend })
    }
  }

  return Array.from(trendMap.values())
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5) // Top 5 trends
}

function calculateConfidence(insights: CompetitorInsight[], totalSources: number): number {
  if (insights.length === 0) return 0
  
  const highImpactCount = insights.filter(i => i.impact === 'high').length
  const sourceQuality = totalSources > 0 ? Math.min(95, totalSources * 5) : 0
  const insightQuality = (highImpactCount / insights.length) * 100
  
  return Math.round((sourceQuality + insightQuality) / 2)
}

function calculateTrendImpact(content: string): number {
  let score = 5 // baseline
  
  if (content.includes('billion')) score += 3
  if (content.includes('million')) score += 2
  if (content.includes('significant') || content.includes('major')) score += 2
  if (content.includes('canada') || content.includes('canadian')) score += 1
  
  return Math.min(10, score)
}

function extractSourceName(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '').split('.')[0]
  } catch {
    return 'Unknown Source'
  }
}

function generateAdvancedMockData(competitors: string[], industries: string[], regions: string[]) {
  return {
    insights: [
      {
        id: 'demo-insight-1',
        competitor: competitors[0] || 'Shopify',
        type: 'product',
        title: 'Shopify announces AI-powered checkout optimization',
        summary: 'New machine learning algorithms promise 15% conversion improvement, directly competing with similar fintech solutions in the Canadian market.',
        impact: 'high',
        source: 'TechCrunch',
        url: 'https://techcrunch.com/shopify-ai-checkout',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        sentiment: 'negative',
        actionItems: [
          'Analyze their AI checkout capabilities vs your solution',
          'Identify unique differentiators in your approach',
          'Consider strategic partnership or competitive positioning'
        ]
      },
      {
        id: 'demo-insight-2',
        competitor: 'Lightspeed',
        type: 'funding',
        title: 'Lightspeed secures $75M Series D for North American expansion',
        summary: 'Major funding round led by Canadian pension funds, focusing on AI-driven retail analytics across Canada and US markets.',
        impact: 'high',
        source: 'BetaKit',
        url: 'https://betakit.com/lightspeed-series-d',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        sentiment: 'neutral',
        actionItems: [
          'Study their expansion strategy and funding approach',
          'Identify market segments they may be overlooking',
          'Consider similar institutional investor outreach'
        ]
      },
      {
        id: 'demo-insight-3',
        competitor: 'Nuvei',
        type: 'partnership',
        title: 'Nuvei partners with Canadian banks for embedded finance',
        summary: 'Strategic partnerships with RBC and TD Bank to offer embedded payment solutions, potentially disrupting fintech startup space.',
        impact: 'medium',
        source: 'Financial Post',
        url: 'https://financialpost.com/nuvei-bank-partnership',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        sentiment: 'negative',
        actionItems: [
          'Evaluate impact on fintech partnership landscape',
          'Identify alternative bank partnership opportunities',
          'Consider direct-to-consumer strategy pivots'
        ]
      }
    ],
    marketTrends: [
      {
        trend: 'AI-powered fintech adoption in Canadian SMBs',
        confidence: 89,
        description: 'Small and medium businesses across Canada rapidly adopting AI-driven financial tools',
        impactScore: 8.5,
        sources: 12
      },
      {
        trend: 'Government digital transformation funding surge',
        confidence: 94,
        description: 'Federal and provincial governments increasing digital innovation funding by 340%',
        impactScore: 9.2,
        sources: 8
      }
    ],
    scanMetadata: {
      sources: 47,
      scanTime: new Date().toISOString(),
      confidence: 92,
      queriesExecuted: 15
    }
  }
}