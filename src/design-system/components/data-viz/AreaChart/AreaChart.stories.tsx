import type { Meta, StoryObj } from '@storybook/react'
import { DSAreaChart } from './AreaChart'

const meta: Meta<typeof DSAreaChart> = {
  title: 'DataViz/AreaChart',
  component: DSAreaChart,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof DSAreaChart>

const sampleData = [
  { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
]

export const Default: Story = {
  args: { data: sampleData, dataKey: 'value', xAxisKey: 'name', engine: 'grow', height: 300 },
}
