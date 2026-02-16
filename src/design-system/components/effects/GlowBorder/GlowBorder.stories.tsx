import type { Meta, StoryObj } from '@storybook/react'
import { GlowBorder } from './GlowBorder'

const meta: Meta<typeof GlowBorder> = {
  title: 'Effects/GlowBorder',
  component: GlowBorder,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    intensity: { control: 'select', options: ['subtle', 'medium', 'vivid'] },
  },
}
export default meta
type Story = StoryObj<typeof GlowBorder>

export const Default: Story = {
  args: { engine: 'protect', children: <div style={{ padding: 24 }}>Glowing content</div> },
}
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <GlowBorder key={e} engine={e} intensity="medium">
          <div style={{ padding: 24, textAlign: 'center' }}>{e}</div>
        </GlowBorder>
      ))}
    </div>
  ),
}
