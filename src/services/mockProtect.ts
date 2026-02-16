export interface ShapFeature {
  feature: string;
  value: string | number;
  shapValue: number;
  impact: 'increases' | 'decreases';
  explanation: string;
}

export interface ThreatAlert {
  id: string;
  type: 'fraud' | 'overdraft' | 'subscription_leak' | 'unusual_spending';
  severity: 'critical' | 'high' | 'medium' | 'low';
  transaction: {
    amount: number;
    merchant: string;
    timestamp: Date;
    location?: string;
  };
  aiExplanation: {
    reason: string;
    shapValues: ShapFeature[];
    confidence: number;
    falsePositiveRate: number;
  };
  status: 'pending' | 'approved' | 'blocked' | 'reviewed';
}

export interface SubscriptionLeak {
  id: string;
  service: string;
  monthlyCharge: number;
  lastUsed: Date;
  estimatedWaste: number;
  cancellationLink?: string;
  aiInsight: string;
}

export const mockThreats: ThreatAlert[] = [
  {
    id: 'threat-001',
    type: 'fraud',
    severity: 'critical',
    transaction: {
      amount: 1250,
      merchant: 'Amazon.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      location: 'London, UK'
    },
    aiExplanation: {
      reason: '95% deviation from behavioral patterns over the past 6 months. Transaction amount is 3x the usual, and location is 5,000 km outside normal range.',
      confidence: 97,
      falsePositiveRate: 3,
      shapValues: [
        {
          feature: 'Transaction Amount',
          value: 1250,
          shapValue: 0.35,
          impact: 'increases',
          explanation: '3x the usual amount of $400'
        },
        {
          feature: 'Location',
          value: 'London, UK',
          shapValue: 0.28,
          impact: 'increases',
          explanation: '5,000 km outside normal range (Seattle → London)'
        },
        {
          feature: 'Time of Day',
          value: '03:00 AM',
          shapValue: 0.12,
          impact: 'increases',
          explanation: 'Outside normal usage hours (3:00 AM)'
        },
        {
          feature: 'Merchant History',
          value: 'Amazon.com',
          shapValue: -0.05,
          impact: 'decreases',
          explanation: '12 transactions in the past 6 months'
        },
        {
          feature: 'Frequency',
          value: '2nd today',
          shapValue: 0.22,
          impact: 'increases',
          explanation: 'Multiple high-value transactions in a single day is unusual'
        }
      ]
    },
    status: 'pending'
  },
  {
    id: 'threat-002',
    type: 'unusual_spending',
    severity: 'medium',
    transaction: {
      amount: 450,
      merchant: 'Uber Eats',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      location: 'Seattle, WA'
    },
    aiExplanation: {
      reason: '20% higher than usual Uber Eats spending.',
      confidence: 72,
      falsePositiveRate: 28,
      shapValues: [
        {
          feature: 'Transaction Amount',
          value: 450,
          shapValue: 0.18,
          impact: 'increases',
          explanation: '10x the usual amount of $45'
        },
        {
          feature: 'Category Frequency',
          value: '3rd this week',
          shapValue: 0.15,
          impact: 'increases',
          explanation: 'Typical usage is 1-2 times per week'
        },
        {
          feature: 'Time of Day',
          value: '18:30',
          shapValue: -0.08,
          impact: 'decreases',
          explanation: 'Within normal dinner hours'
        }
      ]
    },
    status: 'pending'
  },
  {
    id: 'threat-003',
    type: 'overdraft',
    severity: 'high',
    transaction: {
      amount: 1800,
      merchant: 'Rent Payment',
      timestamp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
      location: 'Seattle, WA'
    },
    aiExplanation: {
      reason: '85% probability of insufficient balance due to rent payment in 3 days.',
      confidence: 85,
      falsePositiveRate: 15,
      shapValues: [
        {
          feature: 'Projected Balance',
          value: '$1,650',
          shapValue: 0.42,
          impact: 'increases',
          explanation: '$150 short of the $1,800 rent payment'
        },
        {
          feature: 'Expected Deposits',
          value: '$0',
          shapValue: 0.28,
          impact: 'increases',
          explanation: 'No deposits expected within 3 days'
        },
        {
          feature: 'Past Overdrafts',
          value: '0 times',
          shapValue: 0.12,
          impact: 'increases',
          explanation: 'No overdraft history in the past 12 months'
        }
      ]
    },
    status: 'pending'
  }
];

export const mockSubscriptionLeaks: SubscriptionLeak[] = [
  {
    id: 'sub-001',
    service: 'Netflix Premium',
    monthlyCharge: 19.99,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), // 90 days ago
    estimatedWaste: 240,
    cancellationLink: 'https://www.netflix.com/cancelplan',
    aiInsight: 'Unused for the past 3 months. Downgrade to Netflix Basic to save $7/month, or cancel to save $240/year.'
  },
  {
    id: 'sub-002',
    service: 'Gym Membership',
    monthlyCharge: 89.99,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120), // 120 days ago
    estimatedWaste: 1080,
    aiInsight: 'No usage in the past 4 months. $1,080/year wasted. Cancellation recommended.'
  },
  {
    id: 'sub-003',
    service: 'Adobe Creative Cloud',
    monthlyCharge: 54.99,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    estimatedWaste: 0,
    aiInsight: 'Used approximately once per month. Switch to Adobe Photography Plan to save $35/month.'
  }
];

export const mockProtectStats = {
  totalProtected: 1600,
  threatsBlocked: 12,
  savingsThisMonth: 340,
  accuracy: 94
};

// Simulate AI threat detection
export const detectThreat = async (transactionAmount: number, merchant: string): Promise<ThreatAlert | null> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 100));

  // Simple mock logic: amounts over $1000 or specific merchants trigger alerts
  if (transactionAmount > 1000 || merchant.includes('Suspicious')) {
    return {
      id: `threat-${Date.now()}`,
      type: 'fraud',
      severity: transactionAmount > 2000 ? 'critical' : 'high',
      transaction: {
        amount: transactionAmount,
        merchant,
        timestamp: new Date(),
        location: 'Unknown'
      },
      aiExplanation: {
        reason: `Transaction amount of $${transactionAmount} deviates from normal spending patterns.`,
        confidence: 85,
        falsePositiveRate: 15,
        shapValues: [
          {
            feature: 'Transaction Amount',
            value: transactionAmount,
            shapValue: 0.45,
            impact: 'increases',
            explanation: 'More than 3x the usual amount'
          }
        ]
      },
      status: 'pending'
    };
  }

  return null;
};
