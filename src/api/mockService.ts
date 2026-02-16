import type { EngineData, EngineMetrics } from '../contexts/EngineContext';

const MOCK_DELAY = 800; // Simulate network latency (ms)

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Mock data structure
export const mockData = {
  engines: {
    protect: {
      id: 'protect',
      name: 'Protect Engine',
      status: 'active' as const,
      metrics: {
        accuracy: 94,
        coverage: 87,
        speed: 92,
        volume: 1200000
      },
      lastUpdated: new Date()
    },
    grow: {
      id: 'grow',
      name: 'Grow Engine',
      status: 'active' as const,
      metrics: {
        accuracy: 96,
        coverage: 89,
        speed: 88,
        volume: 850000
      },
      lastUpdated: new Date()
    },
    execute: {
      id: 'execute',
      name: 'Execute Engine',
      status: 'active' as const,
      metrics: {
        accuracy: 91,
        coverage: 93,
        speed: 95,
        volume: 2100000
      },
      lastUpdated: new Date()
    },
    govern: {
      id: 'govern',
      name: 'Govern Engine',
      status: 'processing' as const,
      metrics: {
        accuracy: 98,
        coverage: 85,
        speed: 79,
        volume: 450000
      },
      lastUpdated: new Date()
    }
  },

  dashboardStats: {
    totalAlerts: 47,
    criticalAlerts: 3,
    avgResponseTime: 24,
    uptime: 99.7,
    activeWorkflows: 847,
    processedToday: 15234
  },

  alerts: [
    {
      id: 'alert-1',
      type: 'critical' as const,
      message: 'Unusual transaction pattern detected',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
      engine: 'protect'
    },
    {
      id: 'alert-2',
      type: 'warning' as const,
      message: 'Cash flow projection below threshold',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
      engine: 'grow'
    },
    {
      id: 'alert-3',
      type: 'info' as const,
      message: 'Savings optimization completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      engine: 'execute'
    }
  ]
};

export class MockService {
  /**
   * Get all engines
   */
  async getEngines(): Promise<Record<string, EngineData>> {
    await delay(MOCK_DELAY);
    return { ...mockData.engines };
  }

  /**
   * Get single engine by ID
   */
  async getEngine(id: string): Promise<EngineData> {
    await delay(MOCK_DELAY);
    const engine = mockData.engines[id as keyof typeof mockData.engines];
    if (!engine) {
      throw new Error(`Engine ${id} not found`);
    }
    return { ...engine };
  }

  /**
   * Update engine metrics
   */
  async updateEngineMetrics(
    id: string,
    metrics: Partial<EngineMetrics>
  ): Promise<EngineData> {
    await delay(MOCK_DELAY);
    const engine = mockData.engines[id as keyof typeof mockData.engines];
    if (!engine) {
      throw new Error(`Engine ${id} not found`);
    }

    // Update mock data
    engine.metrics = { ...engine.metrics, ...metrics };
    engine.lastUpdated = new Date();

    return { ...engine };
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    await delay(MOCK_DELAY);
    return { ...mockData.dashboardStats };
  }

  /**
   * Get recent alerts
   */
  async getAlerts(limit = 10) {
    await delay(MOCK_DELAY);
    return mockData.alerts.slice(0, limit);
  }

  /**
   * Get engine forecast data
   */
  async getForecast(engineId: string, days = 7) {
    await delay(MOCK_DELAY);

    // Generate mock forecast data
    const forecast = Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
      predicted: 60 + Math.random() * 40,
      confidence: 85 + Math.random() * 10
    }));

    return { engineId, forecast };
  }

  /**
   * Get audit log entries
   */
  async getAuditLog(limit = 20) {
    await delay(MOCK_DELAY);

    const entries = Array.from({ length: limit }, (_, i) => ({
      id: `audit-${i + 1}`,
      timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
      action: ['model_update', 'data_access', 'prediction', 'approval'][
        Math.floor(Math.random() * 4)
      ],
      user: ['system', 'admin', 'analyst'][Math.floor(Math.random() * 3)],
      details: 'Automated action performed'
    }));

    return entries;
  }
}

// Export singleton instance
export const mockService = new MockService();
