import React from 'react';
import { theme } from '../../shared/theme';

interface PhoneFrameProps {
  children: React.ReactNode;
  title?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, title }) => {
  return (
    <div
      style={{
        width: 420,
        height: 860,
        borderRadius: 42,
        border: '1px solid rgba(255,255,255,0.18)',
        background: [
          'radial-gradient(84% 46% at 0% 0%, rgba(86,190,255,0.18) 0%, transparent 70%)',
          'radial-gradient(88% 50% at 100% 0%, rgba(59,130,246,0.16) 0%, transparent 72%)',
          'linear-gradient(180deg, rgba(8,14,28,0.76), rgba(7,12,24,0.9))',
        ].join(', '),
        boxShadow: theme.glass.glassShadow,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 10,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <span>{title ?? 'Poseidon'}</span>
        <span style={{ opacity: 0.72, fontSize: 14 }}>09:24</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {['Landing', 'Dashboard', 'Protect', 'Grow', 'Govern'].map((item, idx) => (
          <div
            key={item}
            style={{
              minHeight: 30,
              borderRadius: 999,
              border: `1px solid ${idx === 1 ? '#7db8ff' : 'rgba(255,255,255,0.14)'}`,
              background: idx === 1 ? 'rgba(64,125,204,0.26)' : 'rgba(10,19,35,0.64)',
              color: idx === 1 ? '#f2f8ff' : 'rgba(216,228,246,0.78)',
              fontSize: 12,
              padding: '0 11px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>{children}</div>
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: 10,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: 6,
        }}
      >
        {['Core', 'Protect', 'Grow', 'Execute', 'Govern'].map((item, idx) => (
          <div
            key={item}
            style={{
              minHeight: 44,
              borderRadius: 10,
              border: `1px solid ${idx === 0 ? '#7db8ff' : 'rgba(255,255,255,0.14)'}`,
              background: idx === 0 ? 'rgba(64,125,204,0.24)' : 'rgba(8,16,31,0.72)',
              color: idx === 0 ? '#f3f8ff' : 'rgba(214,227,244,0.78)',
              fontSize: 10,
              display: 'grid',
              alignContent: 'center',
              justifyItems: 'center',
              letterSpacing: '0.02em',
              fontWeight: 600,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
