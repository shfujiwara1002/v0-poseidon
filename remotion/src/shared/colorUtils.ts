type Rgb = { r: number; g: number; b: number; a: number };

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const parseHexColor = (value: string): Rgb | null => {
  const hex = value.trim().replace('#', '');
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    return null;
  }

  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: 1,
    };
  }

  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }

  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }

  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }

  return null;
};

const parseRgbColor = (value: string): Rgb | null => {
  const match = value
    .trim()
    .match(/^rgba?\(\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*[,/]\s*([\d.]+))?\s*\)$/i);

  if (!match) {
    return null;
  }

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const a = match[4] !== undefined ? Number(match[4]) : 1;

  if ([r, g, b].some((channel) => Number.isNaN(channel) || channel < 0 || channel > 255)) {
    return null;
  }
  if (Number.isNaN(a)) {
    return null;
  }

  return { r, g, b, a: clamp01(a) };
};

const parseColor = (value: string): Rgb | null => {
  if (value.startsWith('#')) {
    return parseHexColor(value);
  }
  if (value.startsWith('rgb')) {
    return parseRgbColor(value);
  }
  return null;
};

export const withAlpha = (color: string, alpha: number): string => {
  const parsed = parseColor(color);
  if (!parsed) {
    return color;
  }
  return `rgba(${parsed.r},${parsed.g},${parsed.b},${clamp01(alpha)})`;
};

export const buildMicroGlow = (color: string): string => {
  return `0 0 6px ${withAlpha(color, 0.55)}, 0 0 12px ${withAlpha(color, 0.35)}`;
};
