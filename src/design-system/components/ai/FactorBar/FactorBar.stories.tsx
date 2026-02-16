import type { Meta, StoryObj } from '@storybook/react'
import { FactorBar } from './FactorBar'

const meta: Meta<typeof FactorBar> = {
  title: 'AI/FactorBar',
  component: FactorBar,
  argTypes: {
    value: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  },
}
export default meta
type Story = StoryObj<typeof FactorBar>

export const Positive: Story = { args: { label: 'Income Level', value: 0.45 } }
export const Negative: Story = { args: { label: 'Transaction Frequency', value: -0.32 } }
export const SHAPExplainer: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 500 }}>
      <FactorBar label="Income Level" value={0.45} />
      <FactorBar label="Account Age" value={0.22} />
      <FactorBar label="Location Risk" value={-0.38} />
      <FactorBar label="Transaction Volume" value={-0.15} />
      <FactorBar label="Credit Score" value={0.67} />
    </div>
  ),
}
