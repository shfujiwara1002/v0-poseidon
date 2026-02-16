import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './SectionHeader'

const meta: Meta<typeof SectionHeader> = {
  title: 'Composition/SectionHeader',
  component: SectionHeader,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = { args: { title: 'Security Overview', subtitle: 'Real-time monitoring and alerts' } }
export const WithEngine: Story = { args: { title: 'Protect Dashboard', engine: 'protect', subtitle: 'Active shields' } }
export const WithAction: Story = {
  args: { title: 'Recent Activity', engine: 'govern', action: <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button> },
}
