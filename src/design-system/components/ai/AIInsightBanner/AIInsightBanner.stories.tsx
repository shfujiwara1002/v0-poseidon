import type { Meta, StoryObj } from '@storybook/react'
import { AIInsightBanner } from './AIInsightBanner'

const meta: Meta<typeof AIInsightBanner> = {
  title: 'AI/AIInsightBanner',
  component: AIInsightBanner,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    confidence: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
}
export default meta
type Story = StoryObj<typeof AIInsightBanner>

export const Default: Story = {
  args: { title: 'AI Insight', engine: 'grow', confidence: 0.92, children: 'Revenue is projected to increase by 15% based on current growth patterns.' },
}
export const LowConfidence: Story = {
  args: { title: 'Anomaly Detected', engine: 'protect', confidence: 0.45, children: 'Unusual login pattern detected from new location.' },
}
