/** Canvas constants — single source of truth for 1920×1080 pitch deck layout */
export const CANVAS = {
  width: 1920,
  height: 1080,
  marginX: 140,
  marginY: 100,
  footerHeight: 60, // footer bar (30px bottom offset + 30px height)
} as const;

/** Available content area in pixels (after margins) */
export const CONTENT_AREA = {
  width: CANVAS.width - 2 * CANVAS.marginX, // 1640
  height: CANVAS.height - 2 * CANVAS.marginY, // 880
  heightWithFooter:
    CANVAS.height - 2 * CANVAS.marginY - CANVAS.footerHeight, // 820
} as const;

/**
 * Distribute total space among sections with flex ratios and fixed sizes.
 * Returns array of pixel heights for each section.
 *
 * @example
 *   allocateFlexSpace(820, [
 *     { fixed: 180 },       // header → 180px
 *     { flex: 1.4 },        // top cards → 334px
 *     { fixed: 60 },        // timeline → 60px
 *     { flex: 1.1 },        // bottom cards → 246px
 *   ])
 *   // → [180, 334, 60, 246]
 */
export function allocateFlexSpace(
  total: number,
  sections: ({ flex: number } | { fixed: number })[],
): number[] {
  const fixedTotal = sections.reduce(
    (sum, s) => sum + ('fixed' in s ? s.fixed : 0),
    0,
  );
  const flexTotal = sections.reduce(
    (sum, s) => sum + ('flex' in s ? s.flex : 0),
    0,
  );
  const remaining = total - fixedTotal;
  return sections.map((s) =>
    'fixed' in s ? s.fixed : Math.round((s.flex / flexTotal) * remaining),
  );
}
