/**
 * Slide Theme Color — 1つのカラーキーからバッジ・タイトルneon・サブタイトル・背景色を一括生成
 */
import { withAlpha } from './colorUtils';
import { theme } from './theme';
import type { Tier3Layer } from './backgroundPresets.v4';

// ── カラーキー: theme.neon のキーと一致 + ニュートラル ──
export type SlideColorKey = 'cyan' | 'teal' | 'violet' | 'blue' | 'amber' | 'red' | 'white' | 'gray';

// ── アクセント色ルックアップ (theme.accent + ニュートラル) ──
const ACCENT: Record<SlideColorKey, string> = {
  cyan: theme.accent.cyan,
  teal: theme.accent.teal,
  violet: theme.accent.violet,
  blue: theme.accent.blue,
  amber: theme.accent.amber,
  red: theme.accent.red,
  white: '#CBD5E1',
  gray: '#64748B',
};

// ── ネオンsharperルックアップ ──
const NEON_SHARPER: Record<SlideColorKey, string> = {
  cyan: theme.neon.cyan.sharper,
  teal: theme.neon.teal.sharper,
  violet: theme.neon.violet.sharper,
  blue: theme.neon.blue.sharper,
  amber: theme.neon.amber.sharper,
  red: theme.neon.red.sharper,
  white: '0 0 10px rgba(255,255,255,0.55), 0 0 24px rgba(255,255,255,0.28)',
  gray: '0 0 10px rgba(100,116,139,0.50), 0 0 24px rgba(100,116,139,0.25)',
};

// ── バッジテーマ (SlideHeader の badgeTheme prop と同じ形) ──
export interface BadgeTheme {
  background: string;
  border: string;
  color: string;
  boxShadow: string;
  textShadow: string;
}

export interface SlideHeaderColors {
  badgeTheme: BadgeTheme;
  titleTextShadow: string;
  subtitleHighlightColor: string;
  subtitleHighlightShadow: string;
  accentColor: string;
  glowKey: SlideColorKey;
}

// バッジのテキスト色 (各カラーの薄いティント)
const BADGE_TEXT_COLOR: Record<SlideColorKey, string> = {
  cyan: '#e6fbff',
  teal: '#e0faf6',
  violet: '#efe7ff',
  blue: '#e8f2ff',
  amber: '#fff5e0',
  red: '#ffe5e5',
  white: '#f1f5f9',
  gray: '#e2e8f0',
};

/**
 * カラーキー1つからヘッダー系の全色プロパティを生成
 */
export function getSlideHeaderColors(colorKey: SlideColorKey): SlideHeaderColors {
  const accent = ACCENT[colorKey];
  const neon = NEON_SHARPER[colorKey];

  return {
    badgeTheme: {
      background: withAlpha(accent, 0.16),
      border: `1px solid ${withAlpha(accent, 0.58)}`,
      color: BADGE_TEXT_COLOR[colorKey],
      boxShadow: `0 0 12px ${withAlpha(accent, 0.25)}, 0 0 28px ${withAlpha(accent, 0.17)}, inset 0 0 12px ${withAlpha(accent, 0.10)}`,
      textShadow: `0 0 8px ${withAlpha(accent, 0.24)}`,
    },
    titleTextShadow: `${theme.textCrisp}, ${neon}`,
    subtitleHighlightColor: accent,
    subtitleHighlightShadow: `${theme.textCrisp}, ${neon}`,
    accentColor: accent,
    glowKey: colorKey,
  };
}

/**
 * 既存の背景プリセットのレイヤー色を差し替え + opacity強化
 */
export function recolorBackgroundLayers(
  baseLayers: ReadonlyArray<Tier3Layer>,
  options: {
    primary: SlideColorKey;
    secondary?: SlideColorKey;
    intensityMultiplier?: number;
  },
): Tier3Layer[] {
  const primaryAccent = ACCENT[options.primary];
  const secondaryAccent = options.secondary
    ? ACCENT[options.secondary]
    : primaryAccent;
  const multiplier = options.intensityMultiplier ?? 1.0;

  return baseLayers.map((layer, index) => ({
    ...layer,
    color: index % 2 === 0 ? primaryAccent : secondaryAccent,
    opacity: Math.min(0.6, layer.opacity * multiplier),
  }));
}
