/**
 * Chat Service
 * Replaces hardcoded keyword matching from AIChatbot.tsx
 * Provides structured chat responses with parsed intent
 */

import { parseQuery, formatResponse, ParsedIntent, QueryResponse } from './nlQueryEngine';

export interface ChatResponse {
  text: string;
  responseType: 'text' | 'chart' | 'table' | 'number';
  data?: any;
  suggestions?: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  labelEn: string;
  query: string;
  icon: string;
}

/**
 * Chat Service Class
 * Singleton providing chat processing, quick actions, and suggestions
 */
class ChatService {
  private readonly responseDelay = () => 500 + Math.random() * 1000;

  /**
   * Process user message and return structured response
   */
  async processMessage(message: string): Promise<ChatResponse> {
    // Simulate network delay
    await this.delay(this.responseDelay());

    // Parse the query
    const intent: ParsedIntent = parseQuery(message);

    // Generate response based on intent
    const response: QueryResponse = formatResponse(intent);

    return {
      text: response.text,
      responseType: response.responseType,
      data: response.data,
      suggestions: response.suggestions
    };
  }

  /**
   * Get quick action chips (both Japanese and English)
   * Total of 9 quick actions covering all engines
   */
  getQuickActions(): QuickAction[] {
    return [
      {
        id: 'check-balance',
        label: 'Check Balance',
        labelEn: 'Check Balance',
        query: 'What is my current balance?',
        icon: 'savings'
      },
      {
        id: 'spending-summary',
        label: 'Spending Summary',
        labelEn: 'Spending Summary',
        query: 'Show me my spending this month',
        icon: 'chart'
      },
      {
        id: 'view-trends',
        label: 'View Trends',
        labelEn: 'View Trends',
        query: 'Show me spending trends over the last 3 months',
        icon: 'trend'
      },
      {
        id: 'pending-actions',
        label: 'Pending Actions',
        labelEn: 'Pending Actions',
        query: 'What actions are waiting for my approval?',
        icon: '⏳'
      },
      {
        id: 'fraud-alerts',
        label: 'Fraud Alerts',
        labelEn: 'Fraud Alerts',
        query: 'Are there any suspicious transactions?',
        icon: 'security'
      },
      {
        id: 'savings-goals',
        label: 'Savings Goals',
        labelEn: 'Savings Goals',
        query: 'How am I doing with my savings goals?',
        icon: 'goal'
      },
      {
        id: 'check-subscriptions',
        label: 'Check Subscriptions',
        labelEn: 'Check Subscriptions',
        query: 'Show me my subscriptions and unused services',
        icon: 'transfer'
      },
      {
        id: 'monthly-comparison',
        label: 'Month Comparison',
        labelEn: 'Month Comparison',
        query: 'Compare this month to last month',
        icon: 'forecast'
      },
      {
        id: 'food-spending',
        label: 'Food Spending',
        labelEn: 'Food Spending',
        query: 'How much did I spend on food this month?',
        icon: '🍽️'
      }
    ];
  }

  /**
   * Get contextual follow-up suggestions based on current context
   */
  getSuggestions(context: string): string[] {
    const lowerContext = context.toLowerCase();

    // Balance context - EXECUTE engine
    if (lowerContext.includes('balance')) {
      return [
        'Show me recent transactions',
        'Compare to last month',
        'Set up auto-save',
        'Show account history',
        'View savings account details'
      ];
    }

    // Spending context - GOVERN engine
    if (lowerContext.includes('spend')) {
      return [
        'Compare to last month',
        'Show spending trends',
        'Set a spending budget',
        'Analyze by category',
        'Check subscription costs'
      ];
    }

    // Trend context
    if (lowerContext.includes('trend')) {
      return [
        'Compare year-over-year',
        'Identify seasonal patterns',
        'Set saving targets',
        'Export as report',
        'Show income trends'
      ];
    }

    // Action context - GROW & GOVERN engines
    if (lowerContext.includes('action')) {
      return [
        'Approve all high priority',
        'Review each one',
        'Create custom actions',
        'Set auto-approval rules',
        'View pending approvals'
      ];
    }

    // Fraud/Protection context - PROTECT engine
    if (lowerContext.includes('fraud') || lowerContext.includes('suspicious')) {
      return [
        'View all active alerts',
        'Adjust fraud sensitivity',
        'Report false positive',
        'Check PROTECT engine status',
        'Review security coverage'
      ];
    }

    // Savings goals context - GROW engine
    if (lowerContext.includes('saving') || lowerContext.includes('goal')) {
      return [
        'Adjust monthly contribution',
        'Add a new savings goal',
        'View contribution history',
        'Update goal targets',
        'Check auto-save status'
      ];
    }

    // Subscription context - GOVERN engine
    if (lowerContext.includes('subscription') || lowerContext.includes('subscrib')) {
      return [
        'Cancel unused services',
        'Review underused subscriptions',
        'Calculate potential savings',
        'Set usage reminders',
        'View billing history'
      ];
    }

    // Comparison context
    if (lowerContext.includes('compare')) {
      return [
        'Show year-over-year comparison',
        'Analyze category changes',
        'Set spending goals',
        'View top spending changes',
        'Check trend analysis'
      ];
    }

    // Default suggestions
    return [
      'Show my balance',
      'How much did I spend?',
      'Compare this month',
      'Check my savings progress',
      'Show suspicious activity',
      'What is pending?'
    ];
  }

  /**
   * Helper: Sleep for specified duration
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const chatService = new ChatService();

// Export class for testing
export { ChatService };
