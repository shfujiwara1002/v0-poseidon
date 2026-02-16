import type { Meta, StoryObj } from '@storybook/react'
import { ConfidenceRing } from './ConfidenceRing'

const meta: Meta<typeof ConfidenceRing> = {
  title: 'AI/ConfidenceRing',
  component: ConfidenceRing,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    size: { control: { type: 'range', min: 32, max: 128 } },
  },
}
export default meta
type Story = StoryObj<typeof ConfidenceRing>

export const High: Story = { args: { value: 0.92, size: 80 } }
export const Medium: Story = { args: { value: 0.65, size: 80 } }
export const Low: Story = { args: { value: 0.3, size: 80 } }
export const Range: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {[0.95, 0.75, 0.5, 0.25].map((v) => (
        <ConfidenceRing key={v} value={v} size={72} />
      ))}
    </div>
  ),
}
