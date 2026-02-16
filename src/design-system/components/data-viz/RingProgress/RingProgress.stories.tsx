import type { Meta, StoryObj } from '@storybook/react'
import { RingProgress } from './RingProgress'

const meta: Meta<typeof RingProgress> = {
  title: 'DataViz/RingProgress',
  component: RingProgress,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    size: { control: { type: 'range', min: 60, max: 200 } },
  },
}
export default meta
type Story = StoryObj<typeof RingProgress>

export const Default: Story = { args: { value: 75, label: 'Score', engine: 'protect' } }
export const WithSublabel: Story = { args: { value: 92, label: 'Compliance', sublabel: 'Above target', engine: 'govern', size: 140 } }
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e, i) => (
        <RingProgress key={e} value={70 + i * 8} label={e} engine={e} size={100} />
      ))}
    </div>
  ),
}
