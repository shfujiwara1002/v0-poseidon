import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const WithFallback: Story = { args: { fallback: 'JD', size: 'md' } }
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar fallback="S" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
    </div>
  ),
}
export const EngineRing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <Avatar key={e} fallback={e[0].toUpperCase()} engine={e} />
      ))}
    </div>
  ),
}
