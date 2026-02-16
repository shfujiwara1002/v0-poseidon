import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = { args: { label: 'Enable notifications' } }
export const Checked: Story = { args: { label: 'Dark mode', checked: true } }
export const WithEngine: Story = { args: { label: 'Protect shield', checked: true, engine: 'protect' } }
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <Toggle key={e} label={e} checked engine={e} onChange={() => {}} />
      ))}
    </div>
  ),
}
