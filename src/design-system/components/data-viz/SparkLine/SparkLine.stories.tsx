import type { Meta, StoryObj } from '@storybook/react'
import { SparkLine } from './SparkLine'

const meta: Meta<typeof SparkLine> = {
  title: 'DataViz/SparkLine',
  component: SparkLine,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof SparkLine>

export const Default: Story = { args: { data: [10, 25, 15, 30, 22, 35, 28, 40] } }
export const WithArea: Story = { args: { data: [10, 25, 15, 30, 22, 35, 28, 40], area: true, engine: 'grow' } }
export const AllEngines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['protect', 'grow', 'execute', 'govern'] as const).map((e) => (
        <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 60, opacity: 0.6 }}>{e}</span>
          <SparkLine data={[10, 25, 15, 30, 22, 35, 28, 40]} engine={e} width={200} height={40} />
        </div>
      ))}
    </div>
  ),
}
