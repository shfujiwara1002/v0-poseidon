import type { Meta, StoryObj } from '@storybook/react'
import { IconContainer } from './IconContainer'

const meta: Meta<typeof IconContainer> = {
  title: 'Composition/IconContainer',
  component: IconContainer,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    glow: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof IconContainer>

export const Default: Story = { args: { children: '🛡️', engine: 'protect' } }
export const WithGlow: Story = { args: { children: '🛡️', engine: 'protect', glow: true } }
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <IconContainer key={e} engine={e} glow>{e[0].toUpperCase()}</IconContainer>
      ))}
    </div>
  ),
}
