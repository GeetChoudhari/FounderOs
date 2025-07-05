import { NextRequest } from 'next/server'

// Edge Runtime for ultra-fast market intelligence
export const runtime = 'edge'

interface MarketIntelligenceRequest {
  companyName?: string
  industry?: string
  canadianFocus?: boolean
  analysisType: 'competitor' | 'funding' | 'market-trends' | 'acquisition'
}

export async function POST(req: NextRequest) {
  let analysisType: MarketIntelligenceRequest['analysisType'] | undefined;
  let companyName: string | undefined;
  let industry: string | undefined;

  try {
    const body: MarketIntelligenceRequest = await req.json();
    analysisType = body.analysisType;
    companyName = body.companyName;
    industry = body.industry;
    const canadianFocus = body.canadianFocus ?? true;

    // Check if Tavily API key is available
    if (!process.env.TAVILY_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'Tavily API key not configured',
          mockData: generateMockData(analysisType, companyName, industry)
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Use fetch API to call Tavily directly
    const searchQueries = generateAdvancedQueries(analysisType, companyName, industry, canadianFocus)
    
    // Execute Tavily searches using fetch
    const searchPromises = searchQueries.map(async (queryObj) => {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`
        },
        body: JSON.stringify({
          query: queryObj.query,
          search_depth: 'advanced',
          include_images: false,
          include_answer: true,
          include_raw_content: true,
          max_results: queryObj.maxResults || 10,
          include_domains: queryObj.includeDomains,
          exclude_domains: ['reddit.com', 'quora.com']
        })
      })

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.status}`)
      }

      return await response.json()
    })

    const searchResults = await Promise.all(searchPromises)
    
    // Advanced analysis and synthesis
    const intelligence = await synthesizeMarketIntelligence(
      searchResults, 
      analysisType, 
      companyName,
      canadianFocus
    )

    return new Response(JSON.stringify(intelligence), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Tavily Market Intelligence Error:', error)
    
    // Return mock data for demo purposes if API fails
    const mockData = generateMockData(
      analysisType || 'competitor',
      companyName,
      industry
    )
    
    const errorMessage = error instanceof Error ? error.message : String(error);

    return new Response(
      JSON.stringify({
        ...mockData,
        note: 'Demo data - Tavily API unavailable',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

function generateMockData(analysisType: string, companyName?: string, industry?: string) {
  return {
    summary: `Mock ${analysisType} analysis for ${companyName || 'your startup'}`,
    insights: [
      {
        type: 'competitor',
        title: 'Shopify announces new developer tools',
        insight: 'New API integrations could impact your strategy...',
        source: 'TechCrunch (Demo)',
        relevanceScore: 85
      },
      {
        type: 'funding',
        title: 'Innovation Canada $50M clean tech fund',
        insight: 'New funding opportunity for sustainable startups...',
        source: 'Innovation Canada (Demo)',
        relevanceScore: 78
      }
    ],
    competitors: [
      { name: 'DemoCompetitor Inc.', description: 'Leading Canadian startup...', relevance: 90 },
      { name: 'TechRival Corp.', description: 'Emerging player in the space...', relevance: 75 }
    ],
    fundingOpportunities: [
      { 
        program: 'SR&ED Tax Credits',
        description: 'Up to $3M in R&D tax credits...',
        type: 'Government Grant',
        eligibility: 'Canadian companies with R&D activities...'
      }
    ],
    marketTrends: [
      { trend: 'AI adoption surge', description: 'Canadian SMBs increasing AI adoption...', impact: 'high' }
    ],
    recommendations: [
      {
        type: 'competitive',
        priority: 'high',
        action: 'Differentiation Strategy',
        description: 'Focus on unique value propositions...'
      }
    ],
    sources: 25,
    canadianFocus: true,
    lastUpdated: new Date().toISOString(),
    confidence: 85
  }
}

function generateAdvancedQueries(
  analysisType: string, 
  companyName?: string, 
  industry?: string, 
  canadianFocus?: boolean
) {
  const baseQueries = {
    competitor: [
      {
        query: `${companyName} competitors ${industry} ${canadianFocus ? 'Canada' : ''} 2024`,
        maxResults: 15,
        includeDomains: ['crunchbase.com', 'techcrunch.com', 'bdc.ca']
      },
      {
        query: `${industry} startups funding rounds ${canadianFocus ? 'Canada' : ''} recent`,
        maxResults: 10,
        includeDomains: ['techcrunch.com', 'innovation.canada.ca']
      }
    ],
    funding: [
      {
        query: `Canadian government grants ${industry} startups 2024`,
        maxResults: 12,
        includeDomains: ['canada.ca', 'innovation.canada.ca', 'bdc.ca']
      },
      {
        query: `${industry} venture capital Canada funding trends 2024`,
        maxResults: 10,
        includeDomains: ['cvca.ca', 'techcrunch.com', 'betakit.com']
      }
    ],
    'market-trends': [
      {
        query: `${industry} market trends Canada 2024 growth opportunities`,
        maxResults: 15,
        includeDomains: ['statcan.gc.ca', 'deloitte.com']
      }
    ],
    acquisition: [
      {
        query: `${industry} acquisitions mergers Canada 2024`,
        maxResults: 12,
        includeDomains: ['techcrunch.com', 'globeandmail.com']
      }
    ]
  }

  return baseQueries[analysisType as keyof typeof baseQueries] || baseQueries.competitor
}

async function synthesizeMarketIntelligence(
  searchResults: any[], 
  analysisType: string, 
  companyName?: string,
  canadianFocus?: boolean
) {
  // Extract and organize key insights
  const allResults = searchResults.flatMap(result => result.results || [])
  
  // Advanced content analysis
  const keyInsights = extractKeyInsights(allResults, analysisType)
  const competitors = extractCompetitorInfo(allResults, companyName)
  const fundingOpportunities = extractFundingInfo(allResults, canadianFocus)
  const marketTrends = extractMarketTrends(allResults)
  
  // Generate strategic recommendations
  const recommendations = generateStrategicRecommendations(
    keyInsights, 
    competitors, 
    fundingOpportunities, 
    analysisType
  )

  return {
    summary: `Comprehensive ${analysisType} analysis for ${companyName || 'your startup'}`,
    insights: keyInsights,
    competitors: competitors.slice(0, 5),
    fundingOpportunities: fundingOpportunities.slice(0, 10),
    marketTrends: marketTrends.slice(0, 8),
    recommendations,
    sources: allResults.length,
    canadianFocus,
    lastUpdated: new Date().toISOString(),
    confidence: calculateConfidenceScore(allResults)
  }
}

function extractKeyInsights(results: any[], analysisType: string) {
  const insights = []
  
  for (const result of results.slice(0, 20)) {
    const content = `${result.title} ${result.content}`.toLowerCase()
    
    if (analysisType === 'funding' && (
      content.includes('funding') || 
      content.includes('investment') || 
      content.includes('grant')
    )) {
      insights.push({
        type: 'funding',
        title: result.title,
        insight: result.content.substring(0, 200) + '...',
        source: result.url,
        relevanceScore: calculateRelevanceScore(content, ['funding', 'investment', 'canada'])
      })
    }
  }
  
  return insights
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10)
}

function extractCompetitorInfo(results: any[], companyName?: string) {
  return results
    .filter(result => 
      result.title?.toLowerCase().includes('competitor') ||
      result.content?.toLowerCase().includes('vs ') ||
      result.content?.toLowerCase().includes('alternative')
    )
    .map(result => ({
      name: extractCompanyName(result.title),
      description: result.content?.substring(0, 150) + '...' || 'No description available',
      source: result.url,
      relevance: calculateRelevanceScore(result.content || '', [companyName || '', 'competitor'])
    }))
    .sort((a, b) => b.relevance - a.relevance)
}

function extractFundingInfo(results: any[], canadianFocus?: boolean) {
  const fundingKeywords = [
    'grant', 'funding', 'investment', 'accelerator', 
    'incubator', 'venture capital', 'seed funding'
  ]
  
  return results
    .filter(result => 
      fundingKeywords.some(keyword => 
        result.content?.toLowerCase().includes(keyword)
      ) && (!canadianFocus || result.content?.toLowerCase().includes('canada'))
    )
    .map(result => ({
      program: extractProgramName(result.title),
      description: result.content?.substring(0, 200) + '...' || 'No description available',
      source: result.url,
      type: identifyFundingType(result.content || ''),
      eligibility: extractEligibilityInfo(result.content || '')
    }))
    .slice(0, 10)
}

function extractMarketTrends(results: any[]) {
  const trendKeywords = ['trend', 'growth', 'market', 'opportunity', 'emerging']
  
  return results
    .filter(result => 
      trendKeywords.some(keyword => 
        result.content?.toLowerCase().includes(keyword)
      )
    )
    .map(result => ({
      trend: result.title || 'Unknown trend',
      description: result.content?.substring(0, 180) + '...' || 'No description available',
      source: result.url,
      impact: assessTrendImpact(result.content || '')
    }))
}

function generateStrategicRecommendations(
  insights: any[], 
  competitors: any[], 
  funding: any[], 
  analysisType: string
) {
  const recommendations = []
  
  if (competitors.length > 0) {
    recommendations.push({
      type: 'competitive',
      priority: 'high',
      action: 'Differentiation Strategy',
      description: `Based on competitor analysis, focus on unique value propositions that distinguish you from ${competitors[0]?.name}`
    })
  }
  
  if (funding.length > 0) {
    recommendations.push({
      type: 'funding',
      priority: 'medium',
      action: 'Funding Pipeline',
      description: `Explore ${funding.slice(0, 3).map(f => f.program).join(', ')} for strategic funding opportunities`
    })
  }
  
  return recommendations
}

// Helper functions
function calculateRelevanceScore(content: string, keywords: string[]): number {
  return keywords.reduce((score, keyword) => {
    const occurrences = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length
    return score + occurrences
  }, 0)
}

function calculateConfidenceScore(results: any[]): number {
  const sourceQuality = results.filter(r => 
    ['crunchbase.com', 'techcrunch.com', 'canada.ca'].some(domain => 
      r.url?.includes(domain)
    )
  ).length
  
  return Math.min(95, Math.max(60, (sourceQuality / results.length) * 100 + results.length * 2))
}

function extractCompanyName(title: string): string {
  return title?.split(' ')[0] || 'Unknown Company'
}

function extractProgramName(title: string): string {
  return title?.split('-')[0]?.trim() || title?.substring(0, 50) || 'Unknown Program'
}

function identifyFundingType(content: string): string {
  if (content.toLowerCase().includes('grant')) return 'Government Grant'
  if (content.toLowerCase().includes('venture')) return 'Venture Capital'
  if (content.toLowerCase().includes('accelerator')) return 'Accelerator Program'
  return 'Other Funding'
}

function extractEligibilityInfo(content: string): string {
  const sentences = content.split('.')
  const eligibilitySentence = sentences.find(s => 
    s.toLowerCase().includes('eligible') || 
    s.toLowerCase().includes('requirement')
  )
  return eligibilitySentence?.substring(0, 100) + '...' || 'See source for details'
}

function assessTrendImpact(content: string): 'high' | 'medium' | 'low' {
  const highImpactWords = ['significant', 'major', 'breakthrough', 'revolutionary']
  const mediumImpactWords = ['growing', 'increasing', 'emerging', 'notable']
  
  const lowercaseContent = content.toLowerCase()
  
  if (highImpactWords.some(word => lowercaseContent.includes(word))) return 'high'
  if (mediumImpactWords.some(word => lowercaseContent.includes(word))) return 'medium'
  return 'low'
}