import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BottomSheet } from './BottomSheet'

const meta: Meta<typeof BottomSheet> = {
  title: 'Composition/BottomSheet',
  component: BottomSheet,
}
export default meta
type Story = StoryObj<typeof BottomSheet>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Open Sheet</button>
        <BottomSheet open={open} onOpenChange={setOpen} title="Options">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Edit', 'Share', 'Delete'].map((a) => (
              <button key={a} onClick={() => setOpen(false)} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left' }}>{a}</button>
            ))}
          </div>
        </BottomSheet>
      </>
    )
  },
}
