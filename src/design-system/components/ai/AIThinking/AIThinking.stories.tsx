import type { Meta, StoryObj } from '@storybook/react'
import { AIThinking } from './AIThinking'

const meta: Meta<typeof AIThinking> = {
  title: 'AI/AIThinking',
  component: AIThinking,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof AIThinking>

export const Default: Story = { args: { label: 'Analyzing threats...' } }
export const WithEngine: Story = { args: { label: 'Processing data...', engine: 'grow' } }
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AIThinking label="Scanning network..." engine="protect" />
      <AIThinking label="Analyzing growth..." engine="grow" />
      <AIThinking label="Processing contracts..." engine="execute" />
      <AIThinking label="Auditing compliance..." engine="govern" />
    </div>
  ),
}
