import React from 'react';
import { theme } from './theme';

export interface ExtendedComparisonRow {
  id?: string;
  feature: string;
  traditional: string;
  triton: string;
  kind: 'base' | 'unique';
}

interface ComparisonTableProps {
  headers: readonly [string, string, string];
  rows: ReadonlyArray<ExtendedComparisonRow>;
  style?: React.CSSProperties;
  showLegend?: boolean;
  highlightPoseidonColumn?: boolean;
  debugIdPrefix?: string;
}

const isCheck = (value: string) => value.trim().startsWith('✓');
const isStar = (value: string) => value.trim().startsWith('★');
const isDash = (value: string) => value.trim() === '—';

const renderValueText = (value: string, isPoseidon: boolean) => {
  let color = 'rgba(255,255,255,0.78)';
  let textShadow = 'none';
  let fontWeight = 600;

  if (isCheck(value)) {
    color = '#9fe7d9';
    textShadow = '0 0 4px rgba(159,231,217,0.22)';
    fontWeight = 700;
  } else if (isStar(value)) {
    color = theme.accent.amber;
    textShadow = '0 0 4px rgba(245,158,11,0.35)';
    fontWeight = 700;
  } else if (isDash(value)) {
    color = 'rgba(255,255,255,0.45)';
    fontWeight = 500;
  } else if (value === 'Limited') {
    color = 'rgba(255,255,255,0.68)';
    fontWeight = 600;
  } else if (isPoseidon) {
    color = 'rgba(255,255,255,0.88)';
    fontWeight = 700;
  }

  return (
    <span
      style={{
        fontFamily: theme.typography.fontUi,
        fontSize: 24,
        color,
        fontWeight,
        textShadow,
        lineHeight: 1.35,
        fontVariantNumeric: theme.typography.numericVariant,
        fontFeatureSettings: theme.typography.numericFeatureSettings,
      }}
    >
      {value}
    </span>
  );
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  headers,
  rows,
  style,
  highlightPoseidonColumn = true,
  debugIdPrefix,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 0.85fr 0.85fr',
          gap: 12,
          padding: '22px 30px',
          borderBottom: `1px solid ${theme.glass.glassBorderSubtle}`,
          background: 'rgba(3,8,20,0.62)',
        }}
      >
        <span style={{ fontFamily: theme.typography.fontUi, fontSize: 28, fontWeight: 700, color: 'white' }}>
          {headers[0]}
        </span>
        <span style={{ textAlign: 'center', fontFamily: theme.typography.fontUi, fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.62)', fontVariantNumeric: theme.typography.numericVariant, fontFeatureSettings: theme.typography.numericFeatureSettings }}>
          {headers[1]}
        </span>
        <span style={{ textAlign: 'center', fontFamily: theme.typography.fontUi, fontSize: 28, fontWeight: 700, color: theme.accent.cyan, fontVariantNumeric: theme.typography.numericVariant, fontFeatureSettings: theme.typography.numericFeatureSettings }}>
          {headers[2]}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {rows.map((row, index) => (
          <div
            key={row.id ?? row.feature}
            data-debug-id={debugIdPrefix && row.id ? `${debugIdPrefix}.${row.id}` : undefined}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1.6fr 0.85fr 0.85fr',
              gap: 12,
              padding: '20px 30px',
              borderTop: index === 0 ? 'none' : `1px solid ${theme.glass.glassBorderSubtle}`,
              background: index % 2 === 0 ? 'rgba(4,12,26,0.56)' : 'rgba(6,16,32,0.46)',
              boxShadow: row.kind === 'unique' ? 'inset 0 0 20px rgba(245,158,11,0.08), 0 0 12px rgba(245,158,11,0.12)' : 'none',
            }}
          >
            {row.kind === 'unique' && (
              <div
                style={{
                  position: 'absolute',
                  left: 16,
                  top: 14,
                  bottom: 14,
                  width: 4,
                  borderRadius: 999,
                  background: 'linear-gradient(180deg, rgba(245,158,11,0.92), rgba(245,158,11,0.5))',
                  boxShadow: '0 0 6px rgba(245,158,11,0.32)',
                }}
              />
            )}

            <div
              style={{
                paddingLeft: row.kind === 'unique' ? 18 : 0,
                display: 'flex',
                alignItems: 'center',
                fontFamily: theme.typography.fontUi,
                fontSize: 24,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.35,
              }}
            >
              {row.feature}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {renderValueText(row.traditional, false)}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                background: highlightPoseidonColumn ? 'linear-gradient(120deg, rgba(245,158,11,0.12), rgba(234,179,8,0.08))' : 'transparent',
                boxShadow: highlightPoseidonColumn ? 'inset 0 0 0 1px rgba(245,158,11,0.16)' : 'none',
              }}
            >
              {renderValueText(row.triton, true)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
