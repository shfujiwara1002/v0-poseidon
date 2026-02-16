import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Primitives/ScrollArea',
  component: ScrollArea,
  argTypes: {
    maxHeight: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  args: {
    maxHeight: '200px',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ padding: '8px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.05)' }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
}
