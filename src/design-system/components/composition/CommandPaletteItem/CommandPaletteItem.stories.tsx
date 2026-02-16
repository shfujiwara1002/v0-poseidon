import type { Meta, StoryObj } from '@storybook/react'
import { CommandPaletteItem } from './CommandPaletteItem'

const meta: Meta<typeof CommandPaletteItem> = {
  title: 'Composition/CommandPaletteItem',
  component: CommandPaletteItem,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    active: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof CommandPaletteItem>

export const Default: Story = { args: { label: 'Go to Dashboard', shortcut: '⌘D' } }
export const Active: Story = { args: { label: 'Search threats', shortcut: '⌘K', engine: 'protect', active: true } }
export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 4 }}>
      <CommandPaletteItem label="Go to Protect" shortcut="⌘1" engine="protect" active />
      <CommandPaletteItem label="Go to Grow" shortcut="⌘2" engine="grow" />
      <CommandPaletteItem label="Go to Execute" shortcut="⌘3" engine="execute" />
      <CommandPaletteItem label="Go to Govern" shortcut="⌘4" engine="govern" />
    </div>
  ),
}
