export interface CashFlowPrediction {
  date: Date;
  balance: number;
  lower: number; // confidence interval lower bound
  upper: number; // confidence interval upper bound
  confidence: number;
  income: number;
  expenses: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: Date;
  color: string;
  aiRecommendation: {
    monthlyContribution: number;
    achievable: boolean;
    alternativeScenarios: {
      scenario: string;
      monthlyContribution: number;
      savingsCut: number;
    }[];
  };
}

export interface IncomeStream {
  id: string;
  source: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  nextDate: Date;
  confidence: number;
}

export interface ExpenseCategory {
  id: string;
  category: string;
  amount: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  variance: number;
}

// Generate 30-day cash flow forecast
export function generateCashFlowForecast(days: number = 30): CashFlowPrediction[] {
  const predictions: CashFlowPrediction[] = [];
  let balance = 2400; // Starting balance
  const baseIncome = 4000;
  const baseExpenses = 2200;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    // Simulate income on 15th of month
    const income = date.getDate() === 15 ? baseIncome : 0;

    // Simulate daily expenses with variance
    const dailyExpense = (baseExpenses / 30) * (0.8 + Math.random() * 0.4);

    balance = balance + income - dailyExpense;

    // Calculate confidence band (wider as we go further into future)
    const uncertainty = Math.min(i * 20, 400);
    const lower = balance - uncertainty;
    const upper = balance + uncertainty;
    const confidence = Math.max(95 - i * 1.5, 70);

    predictions.push({
      date,
      balance: Math.round(balance),
      lower: Math.round(lower),
      upper: Math.round(upper),
      confidence: Math.round(confidence),
      income,
      expenses: Math.round(dailyExpense)
    });
  }

  return predictions;
}

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: 'goal-001',
    name: 'Emergency Fund (6 months)',
    target: 18000,
    current: 5200,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
    color: '#14B8A6',
    aiRecommendation: {
      monthlyContribution: 1067,
      achievable: true,
      alternativeScenarios: [
        {
          scenario: 'Cut expenses by 5%',
          monthlyContribution: 950,
          savingsCut: 110
        },
        {
          scenario: 'Add side income',
          monthlyContribution: 600,
          savingsCut: 0
        }
      ]
    }
  },
  {
    id: 'goal-002',
    name: 'New Car Purchase',
    target: 30000,
    current: 12000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 730), // 2 years
    color: '#8B5CF6',
    aiRecommendation: {
      monthlyContribution: 750,
      achievable: true,
      alternativeScenarios: [
        {
          scenario: 'Switch to used car ($20K)',
          monthlyContribution: 333,
          savingsCut: 0
        }
      ]
    }
  },
  {
    id: 'goal-003',
    name: 'Travel Fund',
    target: 5000,
    current: 1800,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180), // 6 months
    color: '#F59E0B',
    aiRecommendation: {
      monthlyContribution: 533,
      achievable: true,
      alternativeScenarios: []
    }
  }
];

export const mockIncomeStreams: IncomeStream[] = [
  {
    id: 'income-001',
    source: 'Salary (Tech Corp)',
    amount: 4000,
    frequency: 'monthly',
    nextDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    confidence: 99
  },
  {
    id: 'income-002',
    source: 'Freelance',
    amount: 800,
    frequency: 'monthly',
    nextDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    confidence: 75
  }
];

export const mockExpenseCategories: ExpenseCategory[] = [
  {
    id: 'exp-001',
    category: 'Rent',
    amount: 1500,
    trend: 'stable',
    variance: 0
  },
  {
    id: 'exp-002',
    category: 'Groceries',
    amount: 450,
    trend: 'increasing',
    variance: 0.2
  },
  {
    id: 'exp-003',
    category: 'Transportation',
    amount: 200,
    trend: 'stable',
    variance: 0.15
  },
  {
    id: 'exp-004',
    category: 'Entertainment',
    amount: 300,
    trend: 'increasing',
    variance: 0.35
  },
  {
    id: 'exp-005',
    category: 'Utilities',
    amount: 150,
    trend: 'stable',
    variance: 0.25
  }
];

export const mockGrowStats = {
  projectedSavings: 1240,
  goalsOnTrack: 2,
  totalGoals: 3,
  forecastAccuracy: 96
};

// Simulate scenario analysis
export interface ScenarioResult {
  scenario: string;
  impact: number;
  newBalance: number;
  explanation: string;
}

export function analyzeScenario(
  type: 'income_increase' | 'expense_decrease' | 'new_expense',
  percentage: number
): ScenarioResult {
  const baseBalance = 2400;
  const monthlyIncome = 4800;
  const monthlyExpense = 2200;

  let impact = 0;
  let explanation = '';

  switch (type) {
    case 'income_increase':
      impact = monthlyIncome * (percentage / 100);
      explanation = `A ${percentage}% income increase enables an additional $${Math.round(impact)}/month in savings`;
      break;
    case 'expense_decrease':
      impact = monthlyExpense * (percentage / 100);
      explanation = `Cutting expenses by ${percentage}% saves $${Math.round(impact)}/month`;
      break;
    case 'new_expense':
      impact = -(monthlyIncome * (percentage / 100));
      explanation = `A new expense reduces savings by $${Math.round(Math.abs(impact))}/month`;
      break;
  }

  const newBalance = baseBalance + impact * 6; // 6-month projection

  return {
    scenario: type.replace(/_/g, ' '),
    impact: Math.round(impact),
    newBalance: Math.round(newBalance),
    explanation
  };
}
