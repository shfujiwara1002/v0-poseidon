import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { DESIGN_SYSTEM_COMPONENT_REGISTRY } from '../component-registry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prototypeRoot = path.resolve(__dirname, '../../..');

describe('design system enforcement', () => {
  it('defines replacements for legacy/forbidden registry entries', () => {
    const entries = Object.values(DESIGN_SYSTEM_COMPONENT_REGISTRY);

    const invalidEntries = entries.filter(
      (entry) =>
        (entry.status === 'legacy' || entry.status === 'forbidden') &&
        (!entry.replacement || entry.replacement.trim().length === 0),
    );

    expect(invalidEntries).toEqual([]);
  });

  it('does not keep compat components in the active registry', () => {
    const entries = Object.values(DESIGN_SYSTEM_COMPONENT_REGISTRY);
    const compatEntries = entries.filter((entry) => entry.status === 'compat');
    expect(compatEntries).toEqual([]);
  });

  it('passes strict design-system gate for reachable pages and app surfaces', () => {
    const result = spawnSync('npm', ['run', 'check:design-system'], {
      cwd: prototypeRoot,
      encoding: 'utf8',
    });

    if (result.status !== 0) {
      throw new Error(
        [result.stdout, result.stderr].filter(Boolean).join('\n') || 'check:design-system failed',
      );
    }

    expect(result.status).toBe(0);
  });
});
