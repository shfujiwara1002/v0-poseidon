import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { theme } from '../theme';

interface TypewriterRowProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    style?: React.CSSProperties;
}

/**
 * Row that appears with typewriter effect.
 */
export const TypewriterRow: React.FC<TypewriterRowProps> = ({
    children,
    delay = 0,
    duration = 20,
    style,
}) => {
    const frame = useCurrentFrame();

    const reveal = interpolate(
        frame - delay,
        [0, duration * 0.3],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const slideIn = interpolate(
        frame - delay,
        [0, duration],
        [-10, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    if (frame < delay) return null;

    return (
        <div
            style={{
                opacity: reveal,
                transform: `translateX(${slideIn}px)`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

interface AnimatedListProps {
    items: React.ReactNode[];
    delay?: number;
    stagger?: number;
    style?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    direction?: 'down' | 'up' | 'left' | 'right';
}

/**
 * List with staggered item animations.
 */
export const AnimatedList: React.FC<AnimatedListProps> = ({
    items,
    delay = 0,
    stagger = 8,
    style,
    itemStyle,
    direction = 'down',
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const getTransform = (reveal: number) => {
        const distance = interpolate(reveal, [0, 1], [20, 0]);
        switch (direction) {
            case 'down':
                return `translateY(${-distance}px)`;
            case 'up':
                return `translateY(${distance}px)`;
            case 'left':
                return `translateX(${distance}px)`;
            case 'right':
                return `translateX(${-distance}px)`;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
            {items.map((item, i) => {
                const itemDelay = delay + i * stagger;
                const reveal = spring({
                    frame: frame - itemDelay,
                    fps,
                    config: { damping: 12, stiffness: 120 },
                });

                return (
                    <div
                        key={i}
                        style={{
                            opacity: reveal,
                            transform: getTransform(reveal),
                            ...itemStyle,
                        }}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

interface AnimatedTableRowProps {
    cells: React.ReactNode[];
    gridTemplate: string;
    delay?: number;
    style?: React.CSSProperties;
}

/**
 * Animated table row that slides in with cell stagger.
 */
export const AnimatedTableRow: React.FC<AnimatedTableRowProps> = ({
    cells,
    gridTemplate,
    delay = 0,
    style,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const rowReveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    if (frame < delay) return null;

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: gridTemplate,
                gap: 12,
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                opacity: rowReveal,
                transform: `translateX(${interpolate(rowReveal, [0, 1], [-20, 0])}px)`,
                ...style,
            }}
        >
            {cells.map((cell, i) => {
                const cellReveal = spring({
                    frame: frame - delay - i * 3,
                    fps,
                    config: { damping: 15, stiffness: 150 },
                });

                return (
                    <div key={i} style={{ opacity: cellReveal }}>
                        {cell}
                    </div>
                );
            })}
        </div>
    );
};

interface AnimatedAuditLogProps {
    entries: ReadonlyArray<{
        id: string;
        engine: 'Protect' | 'Grow' | 'Execute' | 'Govern';
        action: string;
        time: string;
        status: string;
    }>;
    delay?: number;
    stagger?: number;
}

/**
 * Animated audit log table with staggered row entries.
 */
export const AnimatedAuditLog: React.FC<AnimatedAuditLogProps> = ({
    entries,
    delay = 0,
    stagger = 12,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const engineColors: Record<string, string> = {
        Protect: theme.accent.red,
        Grow: theme.accent.violet,
        Execute: theme.accent.cyan,
        Govern: theme.accent.amber,
    };

    return (
        <div style={{ fontFamily: theme.typography.fontUi }}>
            {/* Header */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 1.2fr 90px 90px',
                    gap: 12,
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    paddingBottom: 8,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <div>Audit ID</div>
                <div>Engine</div>
                <div>Action</div>
                <div>Time</div>
                <div>Status</div>
            </div>

            {/* Rows */}
            {entries.map((entry, i) => {
                const rowDelay = delay + i * stagger;
                const reveal = spring({
                    frame: frame - rowDelay,
                    fps,
                    config: { damping: 12, stiffness: 100 },
                });

                if (frame < rowDelay) return null;

                const color = engineColors[entry.engine] ?? theme.accent.cyan;

                return (
                    <div
                        key={entry.id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 1fr 1.2fr 90px 90px',
                            gap: 12,
                            alignItems: 'center',
                            padding: '10px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            fontSize: 13,
                            opacity: reveal,
                            transform: `translateX(${interpolate(reveal, [0, 1], [-30, 0])}px)`,
                        }}
                    >
                        <div style={{ color: 'rgba(255,255,255,0.7)' }}>{entry.id}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    boxShadow: `0 0 8px ${color}`,
                                }}
                            />
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{entry.engine}</span>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.6)' }}>{entry.action}</div>
                        <div style={{ color: 'rgba(255,255,255,0.6)' }}>{entry.time}</div>
                        <div
                            style={{
                                color:
                                    entry.status === 'Open'
                                        ? theme.accent.amber
                                        : entry.status === 'Approved'
                                        ? theme.accent.teal
                                        : 'rgba(255,255,255,0.75)',
                            }}
                        >
                            {entry.status}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface ActivityFeedItemProps {
    time: string;
    message: string;
    color?: string;
    delay?: number;
}

/**
 * Single activity feed item with animation.
 */
export const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
    time,
    message,
    color = theme.accent.cyan,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 120 },
    });

    if (frame < delay) return null;

    return (
        <div
            style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                opacity: reveal,
                transform: `translateY(${interpolate(reveal, [0, 1], [10, 0])}px)`,
                fontFamily: theme.typography.fontUi,
            }}
        >
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginTop: 5,
                    boxShadow: `0 0 8px ${color}`,
                    flexShrink: 0,
                }}
            />
            <div>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{time}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 8, fontSize: 14 }}>{message}</span>
            </div>
        </div>
    );
};
