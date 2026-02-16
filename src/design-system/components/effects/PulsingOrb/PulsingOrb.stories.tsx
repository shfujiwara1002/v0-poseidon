import type { Meta, StoryObj } from '@storybook/react'
import { PulsingOrb } from './PulsingOrb'

const meta: Meta<typeof PulsingOrb> = {
  title: 'Effects/PulsingOrb',
  component: PulsingOrb,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    size: { control: { type: 'range', min: 50, max: 300 } },
  },
}
export default meta
type Story = StoryObj<typeof PulsingOrb>

export const Default: Story = {
  decorators: [(Story) => <div style={{ position: 'relative', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Story /></div>],
  args: { engine: 'protect', size: 150 },
}
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, justifyContent: 'center', position: 'relative', height: 200, alignItems: 'center' }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <PulsingOrb key={e} engine={e} size={100} />
      ))}
    </div>
  ),
}
