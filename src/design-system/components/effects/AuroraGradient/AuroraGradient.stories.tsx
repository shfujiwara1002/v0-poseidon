import type { Meta, StoryObj } from '@storybook/react'
import { AuroraGradient } from './AuroraGradient'

const meta: Meta<typeof AuroraGradient> = {
  title: 'Effects/AuroraGradient',
  component: AuroraGradient,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    intensity: { control: 'select', options: ['subtle', 'medium', 'vivid'] },
  },
}
export default meta
type Story = StoryObj<typeof AuroraGradient>

export const Default: Story = {
  decorators: [(Story) => <div style={{ position: 'relative', height: 300 }}><Story /></div>],
  args: { engine: 'grow', intensity: 'medium' },
}
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <div key={e} style={{ position: 'relative', height: 150, borderRadius: 8, overflow: 'hidden' }}>
          <AuroraGradient engine={e} intensity="vivid" />
          <span style={{ position: 'relative', padding: 16, display: 'block' }}>{e}</span>
        </div>
      ))}
    </div>
  ),
}
