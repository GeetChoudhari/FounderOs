import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({
    hasGoogleKey: !!process.env.GOOGLE_API_KEY,
    keyLength: process.env.GOOGLE_API_KEY?.length || 0,
    keyPrefix: process.env.GOOGLE_API_KEY?.substring(0, 10) || 'none',
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('GOOGLE') || key.includes('API')
    )
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}