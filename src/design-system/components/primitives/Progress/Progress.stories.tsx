import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  argTypes: {
    variant: { control: 'select', options: ['linear', 'circular'] },
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    showLabel: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Progress>

export const Linear: Story = { args: { value: 65, showLabel: true } }
export const Circular: Story = { args: { variant: 'circular', value: 75, showLabel: true } }
export const EngineColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <Progress key={e} value={70} engine={e} showLabel />
      ))}
    </div>
  ),
}
