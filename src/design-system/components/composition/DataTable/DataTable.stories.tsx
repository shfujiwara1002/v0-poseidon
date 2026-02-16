import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'

const meta: Meta<typeof DataTable> = {
  title: 'Composition/DataTable',
  component: DataTable,
  argTypes: {
    engine: { control: 'select', options: [undefined, 'protect', 'grow', 'execute', 'govern'] },
  },
}
export default meta
type Story = StoryObj<typeof DataTable>

const sampleColumns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status' },
  { key: 'value', header: 'Value', sortable: true },
]
const sampleRows = [
  { name: 'Firewall Alpha', status: 'Active', value: '99.9%' },
  { name: 'VPN Gateway', status: 'Active', value: '98.2%' },
  { name: 'IDS Sensor', status: 'Warning', value: '87.5%' },
  { name: 'Auth Service', status: 'Active', value: '100%' },
]

export const Default: Story = { args: { columns: sampleColumns, rows: sampleRows, engine: 'protect' } }
