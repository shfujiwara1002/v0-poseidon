import type { Meta, StoryObj } from '@storybook/react'
import { DSToast } from './Toast'

const meta: Meta<typeof DSToast> = {
  title: 'Composition/Toast',
  component: DSToast,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
}
export default meta
type Story = StoryObj<typeof DSToast>

export const Info: Story = { args: { variant: 'info', title: 'Update available', description: 'A new version is ready.' } }
export const Success: Story = { args: { variant: 'success', title: 'Saved', description: 'Changes saved successfully.' } }
export const Warning: Story = { args: { variant: 'warning', title: 'Warning', description: 'Rate limit approaching.' } }
export const Error: Story = { args: { variant: 'error', title: 'Error', description: 'Failed to connect to server.' } }
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DSToast variant="info" title="Info" description="Informational message" />
      <DSToast variant="success" title="Success" description="Operation completed" />
      <DSToast variant="warning" title="Warning" description="Potential issue" />
      <DSToast variant="error" title="Error" description="Something went wrong" />
    </div>
  ),
}
