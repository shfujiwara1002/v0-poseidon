/**
 * Icon Sample Sheet — Visual comparison of all SlideIcon variants, render modes,
 * container shapes, and glow colors using the "open-banking" (bank) icon.
 */
import React, { CSSProperties } from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { SlideIcon, IconGlowColor } from './shared/SlideIcon';
import { theme } from './shared/theme';

const BG = 'rgba(6,14,24,1)';
const LABEL: CSSProperties = {
  fontFamily: theme.typography.fontMono,
  fontSize: 14,
  color: 'rgba(255,255,255,0.6)',
  textAlign: 'center',
  marginTop: 6,
};
const SECTION_TITLE: CSSProperties = {
  fontFamily: theme.typography.fontHeader,
  fontSize: 24,
  fontWeight: 700,
  color: 'rgba(255,255,255,0.9)',
  marginBottom: 12,
};
const ROW: CSSProperties = {
  display: 'flex',
  gap: 32,
  alignItems: 'flex-end',
  flexWrap: 'wrap',
};
const CELL: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 100,
};

const ICON = 'open-banking'; // Material Symbols: account_balance
const SIZE = 64;

export const IconSampleSheet: React.FC = () => (
  <SlideFrame>
    <div style={{ padding: '40px 60px', display: 'flex', flexDirection: 'column', gap: 28, background: BG, flex: 1 }}>
      {/* Title */}
      <div style={{ fontFamily: theme.typography.fontHeader, fontSize: 36, fontWeight: 700, color: 'white', textShadow: theme.textCrisp }}>
        Icon Style Sample Sheet — Bank (account_balance)
      </div>

      {/* Row 1: Variants × Render Modes */}
      <div>
        <div style={SECTION_TITLE}>1. Variant × Render Mode (squircle, teal, size=64)</div>
        <div style={ROW}>
          {(['simple', 'signal', 'glass'] as const).flatMap((variant) =>
            (['mask', 'native'] as const).map((renderMode) => (
              <div key={`${variant}-${renderMode}`} style={CELL}>
                <SlideIcon name={ICON} size={SIZE} variant={variant} renderMode={renderMode} glowColor="teal" containerShape="squircle" />
                <div style={LABEL}>{variant}<br />{renderMode}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Row 2: Container Shape comparison */}
      <div>
        <div style={SECTION_TITLE}>2. Container Shape — glass + mask</div>
        <div style={ROW}>
          {(['squircle', 'circle'] as const).map((shape) => (
            <div key={shape} style={CELL}>
              <SlideIcon name={ICON} size={SIZE} variant="glass" renderMode="mask" glowColor="teal" containerShape={shape} />
              <div style={LABEL}>{shape}</div>
            </div>
          ))}
          {(['squircle', 'circle'] as const).map((shape) => (
            <div key={`signal-${shape}`} style={CELL}>
              <SlideIcon name={ICON} size={SIZE} variant="signal" renderMode="mask" glowColor="teal" containerShape={shape} />
              <div style={LABEL}>signal / {shape}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Glow Colors */}
      <div>
        <div style={SECTION_TITLE}>3. Glow Colors — glass + mask + squircle</div>
        <div style={ROW}>
          {(['cyan', 'teal', 'violet', 'amber', 'blue', 'gold', 'red', 'white'] as IconGlowColor[]).map((color) => (
            <div key={color} style={CELL}>
              <SlideIcon name={ICON} size={SIZE} variant="glass" renderMode="mask" glowColor={color} containerShape="squircle" />
              <div style={LABEL}>{color}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Sizes */}
      <div>
        <div style={SECTION_TITLE}>4. Sizes — glass + mask + teal</div>
        <div style={ROW}>
          {[24, 32, 48, 64, 72, 96].map((s) => (
            <div key={s} style={CELL}>
              <SlideIcon name={ICON} size={s} variant="glass" renderMode="mask" glowColor="teal" containerShape="squircle" />
              <div style={LABEL}>{s}px</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 5: Native shield SVG (with gradients/filters) */}
      <div>
        <div style={SECTION_TITLE}>5. Native SVG (shield — has gradients/glow filters)</div>
        <div style={ROW}>
          {(['simple', 'signal', 'glass'] as const).map((variant) => (
            <div key={variant} style={CELL}>
              <SlideIcon name="shield" size={SIZE} variant={variant} renderMode="native" glowColor="teal" containerShape="squircle" />
              <div style={LABEL}>{variant} / native</div>
            </div>
          ))}
          {(['simple', 'signal', 'glass'] as const).map((variant) => (
            <div key={`${variant}-mask`} style={CELL}>
              <SlideIcon name="shield" size={SIZE} variant={variant} renderMode="mask" glowColor="teal" containerShape="squircle" />
              <div style={LABEL}>{variant} / mask</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideFrame>
);
