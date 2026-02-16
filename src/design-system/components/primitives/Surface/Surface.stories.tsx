import type { Meta, StoryObj } from '@storybook/react'
import { Surface } from './Surface'

const meta: Meta<typeof Surface> = {
  title: 'Primitives/Surface',
  component: Surface,
  argTypes: {
    variant: { control: 'select', options: ['glass', 'elevated', 'inset', 'transparent'] },
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    glow: { control: 'boolean' },
    interactive: { control: 'boolean' },
  },
  parameters: {
    docs: { description: { component: 'Card/container with glass-morphism, elevation, and effect preset support.' } },
  },
}

export default meta
type Story = StoryObj<typeof Surface>

export const Glass: Story = {
  args: {
    variant: 'glass',
    padding: 'md',
    children: <div><h3 style={{ marginBottom: 8, fontWeight: 600 }}>Glass Surface</h3><p style={{ opacity: 0.7 }}>Responds to the effect preset toolbar above.</p></div>,
  },
}

export const Elevated: Story = {
  args: { variant: 'elevated', padding: 'md', children: <p>Elevated surface with solid background and shadow.</p> },
}

export const WithEngine: Story = {
  args: { variant: 'glass', engine: 'protect', glow: true, padding: 'lg', children: <p>Protect engine with glow</p> },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {(['glass', 'elevated', 'inset', 'transparent'] as const).map((v) => (
        <Surface key={v} variant={v} padding="md">
          <p style={{ fontWeight: 500 }}>{v}</p>
        </Surface>
      ))}
    </div>
  ),
}

export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <Surface key={e} variant="glass" engine={e} glow padding="md">
          <p style={{ fontWeight: 500 }}>{e}</p>
        </Surface>
      ))}
    </div>
  ),
}
