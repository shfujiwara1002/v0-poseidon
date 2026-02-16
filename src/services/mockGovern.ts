export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  engine: 'protect' | 'grow' | 'execute' | 'govern';
  decision: {
    type: string;
    input: Record<string, any>;
    output: Record<string, any>;
    model: {
      name: string;
      version: string;
      accuracy: number;
    };
    explanation: {
      naturalLanguage: string;
      confidence: number;
      alternativeOutcomes?: string[];
    };
  };
  userFeedback?: {
    correct: boolean;
    comment?: string;
  };
  complianceFlags: {
    gdprCompliant: boolean;
    ecoaCompliant: boolean;
    ccpaCompliant: boolean;
  };
}

export interface PrivacyControl {
  category: 'transaction_history' | 'location' | 'income' | 'investments' | 'personal_info';
  collected: boolean;
  purpose: string;
  retention: number; // days
  enabled: boolean;
  thirdPartySharing: {
    partner: string;
    purpose: string;
    userConsent: boolean;
  }[];
}

export interface DataExportRequest {
  id: string;
  requestedAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  format: 'json' | 'csv' | 'pdf';
  categories: string[];
  downloadUrl?: string;
}

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'audit-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    engine: 'protect',
    decision: {
      type: 'fraud_detected',
      input: {
        amount: 1250,
        merchant: 'Amazon.com',
        location: 'London, UK',
        time: '03:00 AM'
      },
      output: {
        isFraud: true,
        riskScore: 0.97,
        action: 'block_recommended'
      },
      model: {
        name: 'FraudDetectionV3.2',
        version: '3.2.1',
        accuracy: 99.7
      },
      explanation: {
        naturalLanguage: 'Transaction amount is 3x the usual, location is 5,000km away, and it occurred late at night. This deviates 95% from behavioral patterns over the past 6 months.',
        confidence: 97,
        alternativeOutcomes: [
          'Probability of legitimate transaction: 3%',
          'False positive likelihood: 2.5%'
        ]
      }
    },
    userFeedback: {
      correct: true,
      comment: 'Confirmed fraudulent transaction'
    },
    complianceFlags: {
      gdprCompliant: true,
      ecoaCompliant: true,
      ccpaCompliant: true
    }
  },
  {
    id: 'audit-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    engine: 'grow',
    decision: {
      type: 'cash_flow_prediction',
      input: {
        historicalData: '90_days',
        forecastHorizon: '30_days'
      },
      output: {
        predictedBalance: 2400,
        confidenceBand: { lower: 2200, upper: 2600 },
        confidence: 92
      },
      model: {
        name: 'CashFlowLSTM',
        version: '2.1.0',
        accuracy: 96.0
      },
      explanation: {
        naturalLanguage: 'Based on transaction patterns from the past 90 days, the predicted balance in 30 days is $2,400. The confidence interval is $2,200-$2,600 (90% confidence).',
        confidence: 92
      }
    },
    complianceFlags: {
      gdprCompliant: true,
      ecoaCompliant: true,
      ccpaCompliant: true
    }
  },
  {
    id: 'audit-003',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    engine: 'execute',
    decision: {
      type: 'auto_save_triggered',
      input: {
        trigger: 'surplus_detected',
        availableAmount: 150,
        minBalance: 500
      },
      output: {
        actionApproved: true,
        transferAmount: 150,
        destination: 'emergency_fund'
      },
      model: {
        name: 'AutoSaveOptimizer',
        version: '1.5.2',
        accuracy: 94.0
      },
      explanation: {
        naturalLanguage: 'Detected $150 in surplus funds. Recommending automatic transfer to the emergency fund account while maintaining a minimum balance of $500.',
        confidence: 94
      }
    },
    complianceFlags: {
      gdprCompliant: true,
      ecoaCompliant: true,
      ccpaCompliant: true
    }
  }
];

export const mockPrivacyControls: PrivacyControl[] = [
  {
    category: 'transaction_history',
    collected: true,
    purpose: 'Fraud detection and cash flow forecasting',
    retention: 2555, // 7 years for compliance
    enabled: true,
    thirdPartySharing: [
      {
        partner: 'Plaid (Data Aggregation)',
        purpose: 'Bank account integration',
        userConsent: true
      }
    ]
  },
  {
    category: 'location',
    collected: true,
    purpose: 'Location-based anomaly detection',
    retention: 90,
    enabled: true,
    thirdPartySharing: []
  },
  {
    category: 'income',
    collected: true,
    purpose: 'Savings goals and budget planning',
    retention: 365,
    enabled: true,
    thirdPartySharing: []
  },
  {
    category: 'investments',
    collected: false,
    purpose: 'Portfolio recommendations (Phase 3 feature)',
    retention: 365,
    enabled: false,
    thirdPartySharing: []
  },
  {
    category: 'personal_info',
    collected: true,
    purpose: 'Account management and identity verification',
    retention: 2555,
    enabled: true,
    thirdPartySharing: []
  }
];

export const mockGovernStats = {
  totalDecisions: 1247,
  complianceRate: 100,
  userFeedbackCount: 342,
  accuracyScore: 96
};

export const mockDataExports: DataExportRequest[] = [
  {
    id: 'export-001',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: 'completed',
    format: 'json',
    categories: ['transactions', 'ai_decisions', 'user_preferences'],
    downloadUrl: '/api/exports/export-001.json'
  },
  {
    id: 'export-002',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'processing',
    format: 'csv',
    categories: ['transactions']
  }
];

// Simulate data export request
export const requestDataExport = async (
  format: 'json' | 'csv' | 'pdf',
  categories: string[]
): Promise<DataExportRequest> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: `export-${Date.now()}`,
    requestedAt: new Date(),
    status: 'processing',
    format,
    categories
  };
};

// Simulate account deletion
export const requestAccountDeletion = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    success: true,
    message: 'Your account deletion request has been received. All data will be deleted within 30 days.'
  };
};
