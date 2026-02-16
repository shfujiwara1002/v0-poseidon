import React from 'react';
import { SlideFrame } from './shared/SlideFrame';
import { copy } from './shared/copy';
import { theme } from './shared/theme';
import { Tier3Background } from './shared/visuals/tier3/Tier3Background';
import { GlassCard } from './shared/GlassCard';
import { ComparisonTable, type ExtendedComparisonRow } from './shared/ComparisonTable';
import { backgroundPresets } from './shared/backgroundPresets';
import { SlideHeader } from './shared/SlideHeader';
import { slideLayouts } from './shared/slideLayouts';
import { authorityDarkGlassStyle } from './shared/authorityDarkGlassStyle';

interface Slide05DifferentiationProps {
    debug?: boolean;
    debugGrid?: boolean;
    debugIds?: boolean;
}

export const Slide05Differentiation: React.FC<Slide05DifferentiationProps> = ({ debug = false, debugGrid, debugIds }) => {
    const layout = slideLayouts.slide05;

    return (
        <SlideFrame debug={debug} debugGrid={debugGrid} debugIds={debugIds}>
            <Tier3Background layers={backgroundPresets.differentiationGold} />

            {/* -- HEADER -- */}
            <SlideHeader
                badge={copy.slide05.badge}
                title={copy.slide05.title}
                subtitle={copy.slide05.subtitle}
                subtitleHighlight={copy.slide05.subtitleHighlight}
                debugId="slide05.header"
                debugBadgeId="slide05.header.badge"
                debugTitleId="slide05.header.title"
                debugSubtitleId="slide05.header.subtitle"
            />

            {/* -- CONTENT: Vertical Stack -- */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.space6,
                flex: 1,
            }} data-debug-id="slide05.body">
                <div style={{ display: 'flex', alignItems: 'center', gap: layout.legendGap }} data-debug-id="slide05.legend">
                    <span style={{ color: theme.accent.amber, fontSize: theme.typographyScale.label }}>★</span>
                    <span style={{
                        fontFamily: theme.typography.fontUi,
                        fontSize: theme.typographyScale.footnote,
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: 700,
                    }}>
                        {copy.slide05.legend.uniqueLabel}
                    </span>
                </div>

                <GlassCard
                    tone="dark"
                    liquidGlass="off"
                    style={{ padding: 0, overflow: 'hidden', flex: 1, ...authorityDarkGlassStyle }}
                    debugId="slide05.table"
                >
                    <ComparisonTable
                        headers={copy.slide05.table.headers}
                        rows={copy.slide05.table.rows as ReadonlyArray<ExtendedComparisonRow>}
                        highlightPoseidonColumn={false}
                        debugIdPrefix="slide05.table.row"
                    />
                </GlassCard>
            </div>
        </SlideFrame>
    );
};
