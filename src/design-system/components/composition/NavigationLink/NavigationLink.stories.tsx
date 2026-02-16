import type { Meta, StoryObj } from '@storybook/react'
import { NavigationLink } from './NavigationLink'

const meta: Meta<typeof NavigationLink> = {
  title: 'Composition/NavigationLink',
  component: NavigationLink,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    active: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof NavigationLink>

export const Default: Story = { args: { href: '#', children: 'Dashboard', engine: 'protect' } }
export const Active: Story = { args: { href: '#', children: 'Protect', engine: 'protect', active: true } }
export const Navigation: Story = {
  render: () => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 220 }}>
      <NavigationLink href="#" engine="protect" active icon={<span>🛡️</span>}>Protect</NavigationLink>
      <NavigationLink href="#" engine="grow" icon={<span>📈</span>}>Grow</NavigationLink>
      <NavigationLink href="#" engine="execute" icon={<span>📋</span>}>Execute</NavigationLink>
      <NavigationLink href="#" engine="govern" icon={<span>⚖️</span>}>Govern</NavigationLink>
    </nav>
  ),
}
