import type {
  ProtectAlert,
  ForecastScenario,
  GrowRecommendation,
  ExecutableAction,
  AuditRecord,
  TrustScore,
  OversightCase,
  PolicyModelCard,
  AIBehaviorConfig,
  Integration,
  DataRightsRequest,
  SupportCase,
} from '../contracts/domain-models';

/**
 * ApiAdapter — swap-ready interface for all Poseidon data endpoints.
 * MockApiAdapter is the default; HttpApiAdapter is a stub for production.
 */
export interface ApiAdapter {
  // Dashboard
  getDashboardSummary(): Promise<{ trustScore: TrustScore; alertCount: number; actionCount: number }>;

  // Protect
  getAlerts(): Promise<ProtectAlert[]>;
  getAlertById(id: string): Promise<ProtectAlert | undefined>;
  dismissAlert(id: string): Promise<void>;

  // Grow
  getScenarios(): Promise<ForecastScenario[]>;
  getRecommendations(): Promise<GrowRecommendation[]>;

  // Execute
  getActions(): Promise<ExecutableAction[]>;
  approveAction(id: string): Promise<{ success: boolean }>;
  revokeAction(id: string): Promise<{ success: boolean }>;

  // Govern
  getAuditRecords(limit?: number): Promise<AuditRecord[]>;
  getAuditById(id: string): Promise<AuditRecord | undefined>;
  getTrustScore(): Promise<TrustScore>;
  getOversightCases(): Promise<OversightCase[]>;
  getModelCards(): Promise<PolicyModelCard[]>;

  // Settings
  getAIConfig(): Promise<AIBehaviorConfig>;
  updateAIConfig(config: Partial<AIBehaviorConfig>): Promise<void>;
  getIntegrations(): Promise<Integration[]>;
  revokeIntegration(id: string): Promise<void>;
  getDataRightsRequests(): Promise<DataRightsRequest[]>;
  requestDataExport(format: 'json' | 'csv' | 'pdf', categories: string[]): Promise<DataRightsRequest>;
  requestDataDeletion(): Promise<{ success: boolean; message: string }>;

  // Support
  getSupportCases(): Promise<SupportCase[]>;
}

// ─── Mock Implementation ─────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class MockApiAdapter implements ApiAdapter {
  async getDashboardSummary() {
    await delay(100);
    return {
      trustScore: {
        overall: 97,
        components: { accuracy: 96, transparency: 98, fairness: 94, compliance: 100 },
        trend: 'up' as const,
        lastUpdated: new Date().toISOString(),
      },
      alertCount: 5,
      actionCount: 5,
    };
  }

  async getAlerts(): Promise<ProtectAlert[]> {
    await delay(150);
    return [
      {
        id: 'ALT-001', type: 'fraud', severity: 'critical',
        title: 'Unusual transaction — Amazon UK', summary: '$1,250 at 03:00 AM from London',
        detectedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(), source: 'FraudDetectionV3.2',
        status: 'new',
        governMeta: { auditId: 'GV-ALT-001', modelVersion: 'v3.2', explanationVersion: '1.1', decisionId: 'DEC-001', timestamp: new Date().toISOString() },
      },
    ];
  }

  async getAlertById(id: string) {
    const alerts = await this.getAlerts();
    return alerts.find((a) => a.id === id);
  }

  async dismissAlert(_id: string) { await delay(200); }

  async getScenarios(): Promise<ForecastScenario[]> {
    await delay(150);
    return [
      {
        id: 'SC-001', name: 'Aggressive savings', description: 'Maximize savings with moderate risk',
        parameters: { savingsRate: 0.25, riskTolerance: 0.5 },
        projectedOutcome: { netWorthDelta: 2400, savingsDelta: 1200, riskDelta: -0.1, confidence: 0.87, timeHorizon: '12 months' },
        factors: [{ name: 'Income stability', contribution: 0.4, direction: 'positive', description: 'Stable monthly income' }],
        governMeta: { auditId: 'GV-SC-001', modelVersion: 'v2.1', explanationVersion: '1.0', decisionId: 'DEC-SC1', timestamp: new Date().toISOString() },
      },
    ];
  }

  async getRecommendations(): Promise<GrowRecommendation[]> {
    await delay(150);
    return [
      {
        id: 'REC-001', title: 'Consolidate streaming services', summary: 'Save $28/mo',
        expectedImpact: '$336/yr', confidence: 0.89,
        factors: [{ name: 'Usage overlap', contribution: 0.91, direction: 'positive', description: '3 overlapping services' }],
        governMeta: { auditId: 'GV-REC-001', modelVersion: 'v2.1', explanationVersion: '1.0', decisionId: 'DEC-REC1', timestamp: new Date().toISOString() },
      },
    ];
  }

  async getActions(): Promise<ExecutableAction[]> {
    await delay(150);
    return [
      {
        id: 'ACT-001', actionId: 'ACT-001', title: 'Auto-save surplus', description: 'Move $150 surplus to Emergency Fund',
        type: 'save', priority: 'normal', status: 'pending',
        expectedOutcome: { description: '+$150 to emergency fund', impact: 'Medium', reversible: true, sideEffects: [] },
        consentRequired: false, factors: [],
        createdAt: new Date().toISOString(),
        governMeta: { auditId: 'GV-ACT-001', modelVersion: 'v1.5', explanationVersion: '1.0', decisionId: 'DEC-ACT1', timestamp: new Date().toISOString() },
      },
    ];
  }

  async approveAction(_id: string) { await delay(500); return { success: true }; }
  async revokeAction(_id: string) { await delay(500); return { success: true }; }

  async getAuditRecords(_limit?: number): Promise<AuditRecord[]> {
    await delay(150);
    return [
      {
        id: 'AUD-001', auditId: 'GV-2026-0212-001', timestamp: new Date().toISOString(),
        engine: 'protect', screenId: 'S-V3-PRT02', action: 'fraud_detected',
        decision: {
          decisionId: 'DEC-001',
          signal: { type: 'fraud', severity: 'critical', source: 'FraudDetectionV3.2', detectedAt: new Date().toISOString() },
          evidence: { summary: 'Transaction flagged as fraudulent', confidence: 0.97, factors: [], modelVersion: 'v3.2' },
          decision: { recommendation: 'Block transaction', alternatives: ['Monitor only'], reversible: true },
          auditId: 'GV-2026-0212-001', explanationVersion: '1.1',
        },
        complianceFlags: { gdprCompliant: true, ecoaCompliant: true, ccpaCompliant: true },
        governMeta: { auditId: 'GV-2026-0212-001', modelVersion: 'v3.2', explanationVersion: '1.1', decisionId: 'DEC-001', timestamp: new Date().toISOString() },
      },
    ];
  }

  async getAuditById(id: string) {
    const records = await this.getAuditRecords();
    return records.find((r) => r.auditId === id);
  }

  async getTrustScore(): Promise<TrustScore> {
    await delay(100);
    return {
      overall: 97,
      components: { accuracy: 96, transparency: 98, fairness: 94, compliance: 100 },
      trend: 'up', lastUpdated: new Date().toISOString(),
    };
  }

  async getOversightCases(): Promise<OversightCase[]> {
    await delay(150);
    return [
      {
        id: 'OV-001', requestedAt: new Date().toISOString(), requestedBy: 'user',
        reason: 'Dispute: Transaction block', relatedAuditId: 'GV-2026-0212-001',
        status: 'in-review', slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        assignedTo: 'Risk team',
      },
    ];
  }

  async getModelCards(): Promise<PolicyModelCard[]> {
    await delay(150);
    return [
      {
        modelId: 'MDL-001', name: 'FraudDetectionV3.2', version: '3.2.1',
        description: 'Real-time fraud detection using behavioral analysis',
        limitations: ['Limited international pattern data'],
        dataUsed: ['Transaction history', 'Location data', 'Device fingerprints'],
        fairnessMetrics: { demographicParity: 0.98, equalOpportunity: 0.96 },
        lastAuditDate: '2026-02-01', policyBoundaries: ['No autonomous blocking above $5000'],
      },
    ];
  }

  async getAIConfig(): Promise<AIBehaviorConfig> {
    await delay(100);
    return {
      delegationLevel: 'suggest',
      riskThreshold: 0.9,
      notificationPreferences: { criticalAlerts: true, recommendations: true, weeklyDigest: true },
    };
  }

  async updateAIConfig(_config: Partial<AIBehaviorConfig>) { await delay(200); }

  async getIntegrations(): Promise<Integration[]> {
    await delay(150);
    return [
      { id: 'INT-001', name: 'Chase Bank', provider: 'Plaid', status: 'connected', connectedAt: '2026-01-15', scope: ['transactions', 'balances'], revocable: true },
    ];
  }

  async revokeIntegration(_id: string) { await delay(300); }

  async getDataRightsRequests(): Promise<DataRightsRequest[]> {
    await delay(100);
    return [
      { id: 'DR-001', type: 'export', status: 'completed', requestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), categories: ['transactions'], format: 'json' },
    ];
  }

  async requestDataExport(format: 'json' | 'csv' | 'pdf', categories: string[]): Promise<DataRightsRequest> {
    await delay(500);
    return { id: `DR-${Date.now()}`, type: 'export', status: 'processing', requestedAt: new Date().toISOString(), categories, format };
  }

  async requestDataDeletion() {
    await delay(1000);
    return { success: true, message: 'Data deletion request received. All data will be deleted within 30 days.' };
  }

  async getSupportCases(): Promise<SupportCase[]> {
    await delay(100);
    return [
      {
        id: 'SUP-001', title: 'Question about auto-save', description: 'How often does auto-save run?',
        status: 'resolved', priority: 'normal',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [{ timestamp: new Date().toISOString(), action: 'Resolved', actor: 'Support team' }],
      },
    ];
  }
}

// ─── HTTP stub (swap-ready) ──────────────────────────────────────────────────

export class HttpApiAdapter implements ApiAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(path: string, options?: RequestInit, retries = 3): Promise<T> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(`${this.baseUrl}${path}`, {
          headers: { 'Content-Type': 'application/json' },
          ...options,
        });
        if (!res.ok) {
          // Don't retry 4xx client errors
          if (res.status >= 400 && res.status < 500) {
            throw new Error(`API error: ${res.status}`);
          }
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      } catch (err) {
        if (attempt === retries) throw err;
        // Exponential backoff with jitter: 500ms, 1500ms, 3500ms
        const baseDelay = 500 * Math.pow(2, attempt);
        const jitter = Math.random() * 500;
        await new Promise((r) => setTimeout(r, baseDelay + jitter));
      }
    }
    throw new Error('Unreachable');
  }

  getDashboardSummary() { return this.fetch<{ trustScore: TrustScore; alertCount: number; actionCount: number }>('/api/v3/dashboard/summary'); }
  getAlerts() { return this.fetch<ProtectAlert[]>('/api/v3/alerts'); }
  getAlertById(id: string) { return this.fetch<ProtectAlert | undefined>(`/api/v3/alerts/${id}`); }
  async dismissAlert(id: string) { await this.fetch(`/api/v3/alerts/${id}/dismiss`, { method: 'POST' }); }
  getScenarios() { return this.fetch<ForecastScenario[]>('/api/v3/grow/scenarios'); }
  getRecommendations() { return this.fetch<GrowRecommendation[]>('/api/v3/grow/recommendations'); }
  getActions() { return this.fetch<ExecutableAction[]>('/api/v3/execute/actions'); }
  approveAction(id: string) { return this.fetch<{ success: boolean }>(`/api/v3/execute/actions/${id}/approve`, { method: 'POST' }); }
  revokeAction(id: string) { return this.fetch<{ success: boolean }>(`/api/v3/execute/actions/${id}/revoke`, { method: 'POST' }); }
  getAuditRecords(limit?: number) { return this.fetch<AuditRecord[]>(`/api/v3/govern/audit?limit=${limit ?? 50}`); }
  getAuditById(id: string) { return this.fetch<AuditRecord | undefined>(`/api/v3/govern/audit/${id}`); }
  getTrustScore() { return this.fetch<TrustScore>('/api/v3/govern/trust'); }
  getOversightCases() { return this.fetch<OversightCase[]>('/api/v3/govern/oversight'); }
  getModelCards() { return this.fetch<PolicyModelCard[]>('/api/v3/govern/models'); }
  getAIConfig() { return this.fetch<AIBehaviorConfig>('/api/v3/settings/ai'); }
  async updateAIConfig(config: Partial<AIBehaviorConfig>) { await this.fetch('/api/v3/settings/ai', { method: 'PATCH', body: JSON.stringify(config) }); }
  getIntegrations() { return this.fetch<Integration[]>('/api/v3/settings/integrations'); }
  async revokeIntegration(id: string) { await this.fetch(`/api/v3/settings/integrations/${id}`, { method: 'DELETE' }); }
  getDataRightsRequests() { return this.fetch<DataRightsRequest[]>('/api/v3/settings/rights'); }
  requestDataExport(format: string, categories: string[]) { return this.fetch<DataRightsRequest>('/api/v3/settings/rights/export', { method: 'POST', body: JSON.stringify({ format, categories }) }); }
  requestDataDeletion() { return this.fetch<{ success: boolean; message: string }>('/api/v3/settings/rights/delete', { method: 'POST' }); }
  getSupportCases() { return this.fetch<SupportCase[]>('/api/v3/support/cases'); }
}

// ─── Default adapter ─────────────────────────────────────────────────────────

export const apiAdapter: ApiAdapter = new MockApiAdapter();
