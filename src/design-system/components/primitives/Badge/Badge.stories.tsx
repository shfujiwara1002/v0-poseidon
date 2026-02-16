import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info', 'engine'] },
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    glow: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Default' } }
export const Success: Story = { args: { variant: 'success', children: 'Active' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Critical' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="engine" engine="protect">Protect</Badge>
    </div>
  ),
}

export const EngineGlow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <Badge key={e} variant="engine" engine={e} glow>{e}</Badge>
      ))}
    </div>
  ),
}
