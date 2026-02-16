import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = { args: { orientation: 'horizontal' } }
export const Vertical: Story = {
  decorators: [(Story) => <div style={{ display: 'flex', height: 100, alignItems: 'stretch' }}><Story /></div>],
  args: { orientation: 'vertical' },
}
