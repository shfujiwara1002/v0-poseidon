import type { Meta, StoryObj } from '@storybook/react'
import { TypewriterText } from './TypewriterText'

const meta: Meta<typeof TypewriterText> = {
  title: 'AI/TypewriterText',
  component: TypewriterText,
  argTypes: {
    speed: { control: { type: 'range', min: 10, max: 100 } },
  },
}
export default meta
type Story = StoryObj<typeof TypewriterText>

export const Default: Story = { args: { text: 'AI analysis complete. Your portfolio shows strong growth potential with a 92% confidence score.' } }
export const Fast: Story = { args: { text: 'Quick analysis: All systems operational.', speed: 15 } }
export const Slow: Story = { args: { text: 'Carefully analyzing complex threat patterns...', speed: 80 } }
