import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { NextRequest } from 'next/server'

// Enable Edge Runtime for ultra-fast responses (Vercel prize optimization)
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    // Check for Google API key first
    if (!process.env.GOOGLE_API_KEY) {
      // Return mock streaming response for demo
      const mockResponse = "I'm FounderOS, your AI co-founder! I'm currently running in demo mode. In production, I would provide real-time insights about the Canadian startup ecosystem, funding opportunities, and strategic recommendations powered by Google's Gemini AI."
      
      return new Response(mockResponse, {
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    const { messages, type = 'general' } = await req.json()

    // Different prompts for different FounderOS features - optimized for Canadian context
    const systemPrompts = {
      general: `You are FounderOS, an ambient AI co-founder specifically designed for Canadian startups. You provide:
        - Strategic insights for early-stage founders
        - Canadian startup ecosystem knowledge (Toronto, Vancouver, Montreal, Calgary)
        - Government funding opportunities (SR&ED, Innovation Canada, provincial programs)
        - Market intelligence analysis with Canadian context
        - Technical recommendations for scaling in Canada
        
        Always respond with actionable insights and specific Canadian context. Reference Canadian companies, accelerators, and market conditions when relevant.`,
        
      market: `You are the Market Intelligence module of FounderOS. Analyze competitor movements, market trends, and strategic implications for Canadian startups. Focus on:
        - Competitor analysis and strategic positioning in Canadian market
        - Market opportunity identification across Canadian provinces
        - Trend analysis with business implications for Canadian companies
        - Strategic recommendations considering Canadian regulations and market dynamics
        
        Provide specific, actionable insights with Canadian market context. Reference Canadian competitors, market data, and regional opportunities.`,
        
      funding: `You are the Canadian Funding Discovery module of FounderOS. You specialize in:
        - Government grants and programs (federal: SR&ED, Innovation Canada; provincial: Ontario, Quebec, BC, Alberta)
        - Canadian accelerators and incubators (MaRS, Accelerator Centre, Techstars Toronto, Real Ventures)
        - Venture capital landscape in Canada (CVCA members, BDC Capital, regional VCs)
        - Tax credit optimization (SR&ED, digital media tax credits)
        - Funding strategy optimization for Canadian startups
        
        Always provide specific program names, eligibility criteria, application deadlines, and strategic application approaches for Canadian founders.`,
        
      code: `You are the Code Health module of FounderOS. Analyze technical aspects and provide:
        - Technical debt assessment with Canadian compliance considerations
        - Performance optimization recommendations for Canadian infrastructure
        - Security vulnerability insights considering PIPEDA and provincial privacy laws
        - Development productivity improvements for Canadian tech teams
        - Scalability recommendations for Canadian market expansion
        
        Focus on practical, implementable technical recommendations that consider Canadian regulatory environment.`
    }

    const systemPrompt = systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.general

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Gemini AI Chat API Error:', error)
    
    // Graceful fallback for demo
    const fallbackResponse = `I'm FounderOS, your AI co-founder for Canadian startups! 🇨🇦

I help founders with:
• 🔍 Market intelligence & competitor analysis
• 💰 Canadian funding opportunities (SR&ED, Innovation Canada)
• 🏢 Startup ecosystem navigation (Toronto, Vancouver, Montreal)
• 📊 Strategic insights for Canadian market

Currently running in demo mode. In production, I'd provide real-time insights powered by advanced AI!`

    return new Response(fallbackResponse, {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}