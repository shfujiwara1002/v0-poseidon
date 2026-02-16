export interface Action {
  id: string;
  type: 'auto_save' | 'bill_payment' | 'subscription_cancel' | 'negotiate_bill' | 'transfer' | 'investment';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedImpact: {
    savings: number;
    timeToExecute: number; // minutes
    riskLevel: 'none' | 'low' | 'medium' | 'high';
  };
  aiRecommendation: string;
  requiresApproval: boolean;
  status: 'pending' | 'approved' | 'executing' | 'completed' | 'failed' | 'declined';
  scheduledDate?: Date;
  createdAt: Date;
  sourceEngine: 'protect' | 'grow' | 'execute';
}

export interface AutoSaveRule {
  id: string;
  name: string;
  trigger: 'payday' | 'surplus_detected' | 'roundup' | 'manual';
  amount: {
    type: 'fixed' | 'percentage' | 'dynamic';
    value: number;
  };
  destination: string;
  conditions: {
    minBalance: number;
    excludeDates: Date[];
  };
  aiOptimization: boolean;
  enabled: boolean;
  lastExecuted?: Date;
}

export interface BillNegotiation {
  id: string;
  provider: string;
  currentRate: number;
  marketRate: number;
  negotiationScript: string;
  expectedSavings: {
    monthly: number;
    annual: number;
    confidence: number;
  };
  status: 'pending_approval' | 'executing' | 'completed' | 'failed';
}

export const mockActions: Action[] = [
  {
    id: 'action-001',
    type: 'auto_save',
    title: 'Auto-save surplus funds',
    description: 'Automatically move this month\'s $150 surplus to Emergency Fund',
    priority: 'medium',
    estimatedImpact: {
      savings: 150,
      timeToExecute: 2,
      riskLevel: 'low'
    },
    aiRecommendation: 'Based on your current spending pattern, a $150 surplus is projected by the end of this month. This would improve your emergency fund goal progress from 78% to 82%.',
    requiresApproval: true,
    status: 'pending',
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    sourceEngine: 'grow'
  },
  {
    id: 'action-002',
    type: 'subscription_cancel',
    title: 'Downgrade Netflix to Basic',
    description: 'Downgrade Netflix Premium to Basic plan',
    priority: 'high',
    estimatedImpact: {
      savings: 84, // $7/month x 12 months
      timeToExecute: 5,
      riskLevel: 'none'
    },
    aiRecommendation: 'Based on the last 3 months of viewing history, 4K quality usage is under 5%. Switching to the Basic plan saves $7/month, totaling $84/year.',
    requiresApproval: true,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    sourceEngine: 'protect'
  },
  {
    id: 'action-003',
    type: 'negotiate_bill',
    title: 'Negotiate internet bill',
    description: 'Negotiate Comcast rate based on market pricing',
    priority: 'high',
    estimatedImpact: {
      savings: 240, // $20/month x 12 months
      timeToExecute: 15,
      riskLevel: 'low'
    },
    aiRecommendation: 'You are currently paying $89 compared to the competitor average of $65. There is a 75% probability of achieving a $20/month reduction through negotiation.',
    requiresApproval: true,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    sourceEngine: 'execute'
  },
  {
    id: 'action-004',
    type: 'bill_payment',
    title: 'Schedule rent payment',
    description: 'Rent payment due in 3 days (overdraft risk mitigation)',
    priority: 'critical',
    estimatedImpact: {
      savings: 35, // overdraft fee avoided
      timeToExecute: 1,
      riskLevel: 'medium'
    },
    aiRecommendation: 'A $150 shortfall is projected for the rent payment due in 3 days. An automatic transfer from savings can avoid a $35 overdraft fee.',
    requiresApproval: true,
    status: 'pending',
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    sourceEngine: 'protect'
  },
  {
    id: 'action-005',
    type: 'transfer',
    title: 'Rebalance transfer',
    description: 'Transfer $500 from checking to high-yield savings',
    priority: 'low',
    estimatedImpact: {
      savings: 20, // additional interest per year
      timeToExecute: 2,
      riskLevel: 'none'
    },
    aiRecommendation: 'Your checking account balance of $3,200 significantly exceeds the recommended minimum of $2,000. Moving $500 to a 4.5% APY savings account would earn an additional $20/year in interest.',
    requiresApproval: true,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    sourceEngine: 'grow'
  }
];

export const mockAutoSaveRules: AutoSaveRule[] = [
  {
    id: 'rule-001',
    name: 'Payday Auto-Save',
    trigger: 'payday',
    amount: {
      type: 'percentage',
      value: 10
    },
    destination: 'Emergency Fund',
    conditions: {
      minBalance: 500,
      excludeDates: []
    },
    aiOptimization: true,
    enabled: true,
    lastExecuted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15)
  },
  {
    id: 'rule-002',
    name: 'Surplus Detection',
    trigger: 'surplus_detected',
    amount: {
      type: 'dynamic',
      value: 0 // AI determines amount
    },
    destination: 'Investment Account',
    conditions: {
      minBalance: 1000,
      excludeDates: []
    },
    aiOptimization: true,
    enabled: true
  },
  {
    id: 'rule-003',
    name: 'Round-Up Savings',
    trigger: 'roundup',
    amount: {
      type: 'dynamic',
      value: 0 // Roundup amount varies
    },
    destination: 'Travel Fund',
    conditions: {
      minBalance: 200,
      excludeDates: []
    },
    aiOptimization: false,
    enabled: false
  }
];

export const mockBillNegotiations: BillNegotiation[] = [
  {
    id: 'nego-001',
    provider: 'Comcast Internet',
    currentRate: 89,
    marketRate: 65,
    negotiationScript: `Hello Customer Service Team,

I have been a loyal customer of your service for the past 3 years. I am currently on the $89/month plan, but I have found that competitors are offering similar services for around $65.

I am satisfied with your service, but I am reviewing my budget and would like to request a rate adjustment. I would like to continue using your service, so I would appreciate it if you could consider reducing my rate to around $70.

Thank you for your cooperation.`,
    expectedSavings: {
      monthly: 20,
      annual: 240,
      confidence: 75
    },
    status: 'pending_approval'
  }
];

export const mockExecuteStats = {
  pendingActions: 5,
  completedThisMonth: 12,
  totalSavings: 1840,
  automationRate: 68
};

// Generate savings heatmap data for the last 90 days
export function generateSavingsHeatmapData(days: number = 90) {
  const data: { date: Date; amount: number }[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Simulate savings with some patterns
    // Higher savings on paydays (1st and 15th)
    const dayOfMonth = date.getDate();
    const isPayday = dayOfMonth === 1 || dayOfMonth === 15;
    const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;

    let amount = 0;

    if (isPayday) {
      amount = Math.random() * 150 + 100; // $100-250 on paydays
    } else if (isWeekday) {
      // Random savings on weekdays (roundup, surplus)
      amount = Math.random() < 0.6 ? Math.random() * 20 + 5 : 0;
    } else {
      // Lower chance on weekends
      amount = Math.random() < 0.3 ? Math.random() * 15 : 0;
    }

    data.push({ date, amount });
  }

  return data;
}

// Simulate action execution
export const executeAction = async (_actionId: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 80% success rate for simulation
  const success = Math.random() > 0.2;

  if (success) {
    return {
      success: true,
      message: 'Action executed successfully. Changes will be reflected within 24 hours.'
    };
  } else {
    return {
      success: false,
      message: 'An error occurred during execution. Please try again later.'
    };
  }
};
