import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'select', options: ['line', 'circle', 'rect'] },
  },
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Line: Story = { args: { variant: 'line' } }
export const Circle: Story = { args: { variant: 'circle', width: '48px', height: '48px' } }
export const Rect: Story = { args: { variant: 'rect', width: '200px', height: '120px' } }
export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Skeleton variant="rect" height="160px" />
      <Skeleton variant="line" />
      <Skeleton variant="line" width="60%" />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Skeleton variant="circle" width="32px" height="32px" />
        <Skeleton variant="line" width="120px" />
      </div>
    </div>
  ),
}
