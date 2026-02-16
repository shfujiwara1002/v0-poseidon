import type { Meta, StoryObj } from '@storybook/react'
import { DetailRow } from './DetailRow'

const meta: Meta<typeof DetailRow> = {
  title: 'Composition/DetailRow',
  component: DetailRow,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof DetailRow>

export const Default: Story = { args: { label: 'Status', value: 'Active' } }
export const WithEngine: Story = { args: { label: 'Threat Level', value: 'Low', engine: 'protect' } }
export const WithIcon: Story = { args: { label: 'Revenue', value: '$12,400', engine: 'grow', icon: <span>💰</span> } }
export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
      <DetailRow label="Status" value="Active" engine="protect" />
      <DetailRow label="Growth" value="+15.2%" engine="grow" />
      <DetailRow label="Contracts" value="24 pending" engine="execute" />
      <DetailRow label="Compliance" value="98%" engine="govern" />
    </div>
  ),
}
