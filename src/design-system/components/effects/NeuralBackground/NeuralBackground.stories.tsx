import type { Meta, StoryObj } from '@storybook/react'
import { NeuralBackground } from './NeuralBackground'

const meta: Meta<typeof NeuralBackground> = {
  title: 'Effects/NeuralBackground',
  component: NeuralBackground,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    nodeCount: { control: { type: 'range', min: 10, max: 60 } },
    connectionDistance: { control: { type: 'range', min: 50, max: 200 } },
  },
}
export default meta
type Story = StoryObj<typeof NeuralBackground>

export const Default: Story = {
  decorators: [(Story) => <div style={{ position: 'relative', height: 300 }}><Story /></div>],
  args: { engine: 'grow', nodeCount: 30 },
}
