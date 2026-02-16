import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { label: 'Email', placeholder: 'you@example.com' } }
export const WithError: Story = { args: { label: 'Email', error: 'Invalid email address', placeholder: 'you@example.com' } }
export const WithHint: Story = { args: { label: 'Password', type: 'password', hint: 'At least 8 characters' } }
export const Disabled: Story = { args: { label: 'Locked', disabled: true, placeholder: 'Cannot edit' } }
