import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from './StatCard'

const meta: Meta<typeof StatCard> = {
  title: 'Composition/StatCard',
  component: StatCard,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    change: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof StatCard>

export const Default: Story = { args: { title: 'Revenue', value: '$12,400', engine: 'grow' } }
export const WithChange: Story = { args: { title: 'Active Threats', value: '3', change: -25, engine: 'protect' } }
export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <StatCard title="Threats Blocked" value="1,247" change={-12} engine="protect" icon={<span>🛡️</span>} />
      <StatCard title="Revenue" value="$84.2k" change={8.5} engine="grow" icon={<span>📈</span>} />
      <StatCard title="Contracts" value="142" change={3} engine="execute" icon={<span>📋</span>} />
      <StatCard title="Compliance" value="98.5%" change={0.5} engine="govern" icon={<span>⚖️</span>} />
    </div>
  ),
}
