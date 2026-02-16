import type { Meta, StoryObj } from '@storybook/react'
import { GlassPanel } from './GlassPanel'

const meta: Meta<typeof GlassPanel> = {
  title: 'Effects/GlassPanel',
  component: GlassPanel,
  argTypes: {
    blur: { control: { type: 'range', min: 0, max: 24 } },
    opacity: { control: { type: 'range', min: 0, max: 0.5, step: 0.01 } },
  },
}
export default meta
type Story = StoryObj<typeof GlassPanel>

export const Default: Story = {
  args: { children: <div style={{ padding: 24 }}><h3 style={{ marginBottom: 8 }}>Glass Panel</h3><p style={{ opacity: 0.7 }}>Frosted glass container</p></div> },
}
export const Layers: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 300, background: 'linear-gradient(135deg, #1e3a5f, #0d1b2a)' }}>
      <GlassPanel className="absolute top-4 left-4 w-48 h-32 p-4">Layer 1</GlassPanel>
      <GlassPanel blur={16} className="absolute top-12 left-12 w-48 h-32 p-4">Layer 2</GlassPanel>
    </div>
  ),
}
