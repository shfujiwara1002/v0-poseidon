import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { GlassCard } from './GlassCard';
import { theme } from './theme';

type QrDockCardProps = {
  url: string;
  label?: string;
  title?: string;
  size?: 'default' | 'compact';
  cardStyle?: React.CSSProperties;
  tone?: 'default' | 'dark';
  liquidGlass?: boolean | 'off' | 'subtle' | 'standard' | 'premium';
  glassQuality?: 'baseline' | 'premium';
  debugId?: string;
};

export const QrDockCard: React.FC<QrDockCardProps> = ({
  url,
  label = 'LIVE DEMO',
  title = 'Scan to open demo UI',
  size = 'default',
  cardStyle,
  tone = 'default',
  liquidGlass = 'subtle',
  glassQuality = 'baseline',
  debugId,
}) => {
  const isCompact = size === 'compact';
  const qrBox = isCompact ? 168 : 210;
  const qrImage = isCompact ? 146 : 186;
  const width = isCompact ? 820 : 980;
  const paddingX = isCompact ? 20 : 26;
  const paddingY = isCompact ? 18 : 22;
  const textColumnWidth = isCompact ? 460 : 620;
  const titleSize = isCompact ? 30 : 36;
  const urlSize = isCompact ? 20 : 22;
  const labelSize = isCompact ? 12 : theme.typographyScale.badge;
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const options = useMemo(
    () => ({
      errorCorrectionLevel: 'M' as const,
      margin: 1,
      width: qrImage,
      color: {
        dark: '#0a1120',
        light: '#f8fbff',
      },
    }),
    [qrImage],
  );

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, options)
      .then((dataUrl: string) => {
        if (active) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (active) {
          setQrDataUrl(null);
        }
      });
    return () => {
      active = false;
    };
  }, [url, options]);

  return (
    <GlassCard
      debugId={debugId}
      tone={tone}
      liquidGlass={liquidGlass}
      glassQuality={glassQuality}
      style={{
        width,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${paddingY}px ${paddingX}px`,
        borderRadius: 20,
        ...cardStyle,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: isCompact ? 26 : 34 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isCompact ? 8 : 10,
            textAlign: 'left',
            alignItems: 'flex-start',
            width: textColumnWidth,
          }}
        >
          <div
            style={{
              fontFamily: theme.typography.fontMono,
              fontSize: labelSize,
              color: 'rgba(255,255,255,0.62)',
              letterSpacing: '0.2em',
              fontVariantNumeric: theme.typography.numericVariant,
              fontFeatureSettings: theme.typography.numericFeatureSettings,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: theme.typography.fontHeader,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.08,
              color: theme.accent.teal,
              textShadow: `${theme.textCrisp}, ${theme.neon.teal.sharper}`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: theme.typography.fontUi,
              fontSize: urlSize,
              color: 'rgba(255,255,255,0.86)',
              fontVariantNumeric: theme.typography.numericVariant,
              fontFeatureSettings: theme.typography.numericFeatureSettings,
              textAlign: 'left',
              width: '100%',
            }}
          >
            {url}
          </div>
        </div>

        <div
          style={{
            width: qrBox,
            height: qrBox,
            borderRadius: 18,
            border: `1px solid ${theme.glass.glassBorder}`,
            background: 'rgba(6,12,24,0.82)',
            boxShadow: 'inset 0 0 24px rgba(0,240,255,0.1), 0 0 24px rgba(0,240,255,0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Demo QR code" style={{ width: qrImage, height: qrImage, borderRadius: 10 }} />
          ) : (
            <div
              style={{
                width: qrImage,
                height: qrImage,
                borderRadius: 10,
                border: '1px dashed rgba(255,255,255,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: theme.typography.fontMono,
                fontSize: isCompact ? 14 : 16,
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.75)',
                padding: 12,
              }}
            >
              {url}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
