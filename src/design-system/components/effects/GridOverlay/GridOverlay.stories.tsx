import type { Meta, StoryObj } from '@storybook/react'
import { GridOverlay } from './GridOverlay'

const meta: Meta<typeof GridOverlay> = {
  title: 'Effects/GridOverlay',
  component: GridOverlay,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    cellSize: { control: { type: 'range', min: 10, max: 80 } },
    opacity: { control: { type: 'range', min: 0.01, max: 0.2, step: 0.01 } },
  },
}
export default meta
type Story = StoryObj<typeof GridOverlay>

export const Default: Story = {
  decorators: [(Story) => <div style={{ position: 'relative', height: 300 }}><Story /></div>],
  args: { engine: 'govern', cellSize: 40, opacity: 0.08 },
}
