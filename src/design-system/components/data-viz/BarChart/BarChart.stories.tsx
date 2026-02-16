import type { Meta, StoryObj } from '@storybook/react'
import { DSBarChart } from './BarChart'

const meta: Meta<typeof DSBarChart> = {
  title: 'DataViz/BarChart',
  component: DSBarChart,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
  },
}
export default meta
type Story = StoryObj<typeof DSBarChart>

const sampleData = [
  { name: 'Q1', value: 400 }, { name: 'Q2', value: 300 }, { name: 'Q3', value: 600 }, { name: 'Q4', value: 800 },
]

export const Vertical: Story = {
  args: { data: sampleData, dataKey: 'value', xAxisKey: 'name', engine: 'execute', height: 300 },
}
export const Horizontal: Story = {
  args: { data: sampleData, dataKey: 'value', xAxisKey: 'name', engine: 'govern', layout: 'horizontal', height: 300 },
}
