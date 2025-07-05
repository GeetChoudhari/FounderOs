import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'

// Enable Edge Runtime for ultra-fast responses (Vercel prize optimization)
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { messages, type = 'general' } = await req.json()

    // Different prompts for different FounderOS features
    const systemPrompts = {
      general: `You are FounderOS, an ambient AI co-founder specifically designed for Canadian startups. You provide:
        - Strategic insights for early-stage founders
        - Canadian startup ecosystem knowledge
        - Funding opportunity guidance
        - Market intelligence analysis
        - Technical recommendations
        
        Always respond with actionable insights and Canadian context when relevant.`,
        
      market: `You are the Market Intelligence module of FounderOS. Analyze competitor movements, market trends, and strategic implications for Canadian startups. Focus on:
        - Competitor analysis and strategic positioning
        - Market opportunity identification
        - Trend analysis with business implications
        - Strategic recommendations
        
        Provide specific, actionable insights with Canadian market context.`,
        
      funding: `You are the Canadian Funding Discovery module of FounderOS. You specialize in:
        - Government grants and programs (federal and provincial)
        - Canadian accelerators and incubators
        - Venture capital landscape in Canada
        - Funding strategy optimization
        
        Always provide specific program names, eligibility criteria, and application strategies.`,
        
      code: `You are the Code Health module of FounderOS. Analyze technical aspects and provide:
        - Technical debt assessment
        - Performance optimization recommendations
        - Security vulnerability insights
        - Development productivity improvements
        
        Focus on practical, implementable technical recommendations.`
    }

    const systemPrompt = systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.general

    const result = streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('AI Chat API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process AI request',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}