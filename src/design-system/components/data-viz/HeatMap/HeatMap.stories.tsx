import type { Meta, StoryObj } from '@storybook/react'
import { HeatMap } from './HeatMap'

const meta: Meta<typeof HeatMap> = {
  title: 'DataViz/HeatMap',
  component: HeatMap,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    columns: { control: { type: 'range', min: 3, max: 12 } },
  },
}
export default meta
type Story = StoryObj<typeof HeatMap>

const generateData = () => Array.from({ length: 35 }, () => Math.random())

export const Default: Story = { args: { data: generateData(), columns: 7, engine: 'protect' } }
export const ActivityGrid: Story = {
  args: { data: generateData(), columns: 7, engine: 'grow', cellSize: 18, gap: 3 },
}
