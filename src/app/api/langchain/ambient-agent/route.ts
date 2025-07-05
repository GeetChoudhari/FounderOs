import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface AgentTask {
  id: string
  type: 'market_scan' | 'funding_watch' | 'code_health' | 'ecosystem_monitor'
  status: 'pending' | 'running' | 'completed' | 'error'
  priority: 'high' | 'medium' | 'low'
  lastRun: Date
  nextRun: Date
  data?: any
  insights?: any[]
}

// In-memory store for demo (in production, use Redis/database)
let agentState = {
  isActive: true,
  lastHeartbeat: new Date(),
  activeTasks: [] as AgentTask[],
  completedTasks: [] as AgentTask[],
  insights: [] as any[],
  metrics: {
    tasksCompleted: 0,
    insightsGenerated: 0,
    uptime: 0
  }
}

export async function GET(req: NextRequest) {
  try {
    // Heartbeat endpoint - shows agent is alive
    agentState.lastHeartbeat = new Date()
    
    return new Response(JSON.stringify({
      status: 'active',
      lastHeartbeat: agentState.lastHeartbeat,
      activeTasks: agentState.activeTasks.length,
      recentInsights: agentState.insights.slice(0, 5),
      uptime: Date.now() - (agentState.lastHeartbeat.getTime() - 1000),
      metrics: agentState.metrics
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Agent heartbeat failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, taskType, priority = 'medium' } = await req.json()

    switch (action) {
      case 'start':
        return startAmbientAgent()
      
      case 'stop':
        return stopAmbientAgent()
        
      case 'schedule_task':
        return scheduleAgentTask(taskType, priority)
        
      case 'get_insights':
        return getLatestInsights()
        
      case 'execute_cycle':
        return executeAgentCycle()
        
      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
    }
  } catch (error) {
    console.error('LangChain Agent Error:', error)
    return new Response(JSON.stringify({ error: 'Agent operation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

async function startAmbientAgent() {
  agentState.isActive = true
  agentState.lastHeartbeat = new Date()
  
  // Initialize default monitoring tasks
  const defaultTasks: AgentTask[] = [
    {
      id: 'market-scan-001',
      type: 'market_scan',
      status: 'pending',
      priority: 'high',
      lastRun: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
      nextRun: new Date(Date.now() + 5 * 60 * 1000)   // 5 min from now
    },
    {
      id: 'funding-watch-001',
      type: 'funding_watch',
      status: 'pending',
      priority: 'medium',
      lastRun: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      nextRun: new Date(Date.now() + 10 * 60 * 1000)  // 10 min from now
    },
    {
      id: 'ecosystem-monitor-001',
      type: 'ecosystem_monitor',
      status: 'pending',
      priority: 'medium',
      lastRun: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
      nextRun: new Date(Date.now() + 15 * 60 * 1000)  // 15 min from now
    }
  ]
  
  agentState.activeTasks = defaultTasks
  
  return new Response(JSON.stringify({
    status: 'started',
    message: 'Ambient agent is now active',
    activeTasks: agentState.activeTasks,
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

async function stopAmbientAgent() {
  agentState.isActive = false
  agentState.activeTasks = []
  
  return new Response(JSON.stringify({
    status: 'stopped',
    message: 'Ambient agent has been stopped',
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

async function scheduleAgentTask(taskType: string, priority: string) {
  const newTask: AgentTask = {
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: taskType as any,
    status: 'pending',
    priority: priority as any,
    lastRun: new Date(0), // Never run
    nextRun: new Date(Date.now() + 2 * 60 * 1000) // 2 minutes from now
  }
  
  agentState.activeTasks.push(newTask)
  
  return new Response(JSON.stringify({
    status: 'scheduled',
    task: newTask,
    activeTasks: agentState.activeTasks.length
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

async function executeAgentCycle() {
  if (!agentState.isActive) {
    return new Response(JSON.stringify({ error: 'Agent is not active' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const now = new Date()
  const readyTasks = agentState.activeTasks.filter(task => 
    task.status === 'pending' && task.nextRun <= now
  )

  if (readyTasks.length === 0) {
    return new Response(JSON.stringify({
      status: 'no_tasks_ready',
      nextTaskIn: getNextTaskDelay(),
      activeTasks: agentState.activeTasks.length
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Execute ready tasks
  const executionResults = []
  
  for (const task of readyTasks) {
    try {
      task.status = 'running'
      const result = await executeSpecificTask(task)
      
      task.status = 'completed'
      task.lastRun = now
      task.nextRun = getNextRunTime(task.type)
      task.data = result
      
      // Generate insights from task results
      const insights = await generateInsightsFromTask(task, result)
      if (insights.length > 0) {
        agentState.insights.push(...insights)
        agentState.metrics.insightsGenerated += insights.length
      }
      
      agentState.metrics.tasksCompleted++
      executionResults.push({ taskId: task.id, status: 'completed', insights: insights.length })
      
      // Move to completed tasks
      agentState.completedTasks.push({ ...task })
      
    } catch (error) {
      task.status = 'error'
      const errorMessage = error instanceof Error ? error.message : String(error)
      executionResults.push({ taskId: task.id, status: 'error', error: errorMessage })
    }
  }

  // Clean up old completed tasks (keep last 50)
  agentState.completedTasks = agentState.completedTasks.slice(-50)
  agentState.insights = agentState.insights.slice(-100) // Keep last 100 insights

  return new Response(JSON.stringify({
    status: 'cycle_completed',
    executedTasks: executionResults.length,
    results: executionResults,
    nextCycleIn: getNextTaskDelay(),
    totalInsights: agentState.insights.length
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

async function executeSpecificTask(task: AgentTask) {
  // Simulate LangChain agent execution for different task types
  const taskExecutors = {
    market_scan: async () => {
      // Simulate market scanning with LangChain
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate processing
      return {
        competitors_analyzed: 5,
        market_trends_identified: 3,
        competitive_moves_detected: 2,
        data: {
          trends: ['AI adoption surge', 'Canadian fintech growth', 'Remote work tools'],
          competitors: ['Shopify', 'Lightspeed', 'Nuvei'],
          alerts: ['New funding announcement', 'Product launch detected']
        }
      }
    },
    
    funding_watch: async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      return {
        opportunities_found: 7,
        deadlines_approaching: 2,
        new_programs: 1,
        data: {
          programs: [
            { name: 'Innovation Canada Clean Tech', deadline: '2024-03-15', amount: '$50M' },
            { name: 'Ontario Digital Main Street', deadline: '2024-02-28', amount: '$25K' }
          ],
          grants_matched: 3,
          eligibility_score: 87
        }
      }
    },
    
    ecosystem_monitor: async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      return {
        accelerators_tracked: 12,
        events_upcoming: 5,
        networking_opportunities: 8,
        data: {
          events: ['TechTO', 'Startup Canada', 'Vector Institute Demo Day'],
          accelerators: ['MaRS', 'Techstars Toronto', 'Real Ventures'],
          opportunities: ['Mentorship programs', 'Demo day applications']
        }
      }
    },
    
    code_health: async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      return {
        repositories_analyzed: 3,
        issues_found: 12,
        security_alerts: 1,
        performance_score: 82,
        data: {
          technical_debt: 'Medium',
          vulnerabilities: ['Outdated dependency in package.json'],
          recommendations: ['Update Next.js', 'Implement caching', 'Add error boundaries']
        }
      }
    }
  }

  const executor = taskExecutors[task.type]
  if (!executor) {
    throw new Error(`No executor found for task type: ${task.type}`)
  }

  return await executor()
}

async function generateInsightsFromTask(task: AgentTask, result: any) {
  const insights = []
  
  // Generate contextual insights based on task type and results
  switch (task.type) {
    case 'market_scan':
      if (result.competitive_moves_detected > 0) {
        insights.push({
          id: `insight-${Date.now()}-market`,
          type: 'competitive_intelligence',
          title: 'Competitive Activity Detected',
          description: `Detected ${result.competitive_moves_detected} significant competitive moves in the Canadian market`,
          priority: 'high',
          actionable: true,
          recommendation: 'Review competitor strategies and adjust positioning',
          timestamp: new Date(),
          source: 'Market Scan Agent'
        })
      }
      break
      
    case 'funding_watch':
      if (result.deadlines_approaching > 0) {
        insights.push({
          id: `insight-${Date.now()}-funding`,
          type: 'funding_opportunity',
          title: 'Funding Deadlines Approaching',
          description: `${result.deadlines_approaching} funding opportunities have deadlines within 30 days`,
          priority: 'high',
          actionable: true,
          recommendation: 'Prepare and submit applications immediately',
          timestamp: new Date(),
          source: 'Funding Watch Agent'
        })
      }
      break
      
    case 'ecosystem_monitor':
      if (result.networking_opportunities > 5) {
        insights.push({
          id: `insight-${Date.now()}-ecosystem`,
          type: 'networking',
          title: 'High Networking Activity',
          description: `${result.networking_opportunities} networking opportunities available this month`,
          priority: 'medium',
          actionable: true,
          recommendation: 'Schedule time for strategic networking events',
          timestamp: new Date(),
          source: 'Ecosystem Monitor Agent'
        })
      }
      break
  }
  
  return insights
}

function getNextRunTime(taskType: AgentTask['type']): Date {
  const intervals: Record<AgentTask['type'], number> = {
    market_scan: 15 * 60 * 1000,     // 15 minutes
    funding_watch: 30 * 60 * 1000,   // 30 minutes  
    ecosystem_monitor: 60 * 60 * 1000, // 1 hour
    code_health: 120 * 60 * 1000      // 2 hours
  }
  
  const interval = intervals[taskType] || 30 * 60 * 1000
  return new Date(Date.now() + interval)
}

function getNextTaskDelay(): number {
  if (agentState.activeTasks.length === 0) return -1
  
  const nextTask = agentState.activeTasks
    .filter(task => task.status === 'pending')
    .sort((a, b) => a.nextRun.getTime() - b.nextRun.getTime())[0]
    
  if (!nextTask) return -1
  
  return Math.max(0, nextTask.nextRun.getTime() - Date.now())
}

async function getLatestInsights() {
  return new Response(JSON.stringify({
    insights: agentState.insights.slice(0, 20), // Latest 20 insights
    total: agentState.insights.length,
    categories: {
      competitive: agentState.insights.filter(i => i.type === 'competitive_intelligence').length,
      funding: agentState.insights.filter(i => i.type === 'funding_opportunity').length,
      networking: agentState.insights.filter(i => i.type === 'networking').length
    },
    lastUpdated: agentState.lastHeartbeat
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}