import React, { useEffect } from 'react';

const GRID_SIZE = 40;

const debugCss = `
[data-debug-id] {
  outline: 1px dashed rgba(0, 240, 255, 0.45);
  outline-offset: 2px;
  position: relative;
}
[data-debug-id]::after {
  content: attr(data-debug-id);
  position: absolute;
  top: -14px;
  left: 0;
  padding: 2px 4px;
  font-size: 10px;
  line-height: 1;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: rgba(0, 240, 255, 0.9);
  background: rgba(2, 6, 14, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.35);
  border-radius: 4px;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
}
`;

const sizeCss = `
[data-debug-size]::before {
  content: attr(data-debug-size);
  position: absolute;
  bottom: -14px;
  right: 0;
  padding: 2px 4px;
  font-size: 10px;
  line-height: 1;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: rgba(255, 180, 50, 0.95);
  background: rgba(2, 6, 14, 0.8);
  border: 1px solid rgba(255, 180, 50, 0.4);
  border-radius: 4px;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
}
`;

/** Measures all data-debug-id elements and injects data-debug-size attributes */
const DebugSizeMeasurer: React.FC = () => {
  useEffect(() => {
    const measure = () => {
      const elements = document.querySelectorAll<HTMLElement>('[data-debug-id]');
      elements.forEach((el) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        el.setAttribute('data-debug-size', `${w}×${h}`);
      });
    };
    // Measure after layout settles
    const raf = requestAnimationFrame(() => {
      measure();
      // Second pass after fonts/images load
      setTimeout(measure, 100);
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return <style>{sizeCss}</style>;
};

const overflowCss = `
[data-debug-overflow="true"] {
  outline: 2px dashed rgba(239, 68, 68, 0.85) !important;
  outline-offset: -2px;
}
`;

/** Detects data-debug-id elements that overflow their parent bounds */
const DebugOverflowChecker: React.FC = () => {
  useEffect(() => {
    const check = () => {
      const elements = document.querySelectorAll<HTMLElement>('[data-debug-id]');
      elements.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const elRect = el.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const isClipped =
          elRect.right > parentRect.right + 1 ||
          elRect.bottom > parentRect.bottom + 1 ||
          elRect.left < parentRect.left - 1 ||
          elRect.top < parentRect.top - 1;
        if (isClipped) {
          el.setAttribute('data-debug-overflow', 'true');
        } else {
          el.removeAttribute('data-debug-overflow');
        }
      });
    };
    const raf = requestAnimationFrame(() => {
      check();
      setTimeout(check, 100);
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  return <style>{overflowCss}</style>;
};

interface SlideDebugProps {
  showGrid?: boolean;
  showIds?: boolean;
  showSizes?: boolean;
  showOverflow?: boolean;
}

export const SlideDebug: React.FC<SlideDebugProps> = ({ showGrid = false, showIds = false, showSizes = false, showOverflow = false }) => {
  return (
    <>
      {showIds && <style>{debugCss}</style>}
      {showSizes && <DebugSizeMeasurer />}
      {showOverflow && <DebugOverflowChecker />}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </>
  );
};
