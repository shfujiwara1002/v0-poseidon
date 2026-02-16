import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { theme } from '../theme';

interface PulsingButtonProps {
    children: React.ReactNode;
    color?: string;
    delay?: number;
    pulseFrequency?: number;
    style?: React.CSSProperties;
}

/**
 * CTA button with pulsing animation for drawing attention.
 */
export const PulsingButton: React.FC<PulsingButtonProps> = ({
    children,
    color = theme.accent.cyan,
    delay = 0,
    pulseFrequency = 18,
    style,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 10, stiffness: 100 },
    });

    // Pulse animation
    const pulse = Math.sin((frame - delay) / pulseFrequency * Math.PI * 2) * 0.05 + 1;
    const glowPulse = Math.sin((frame - delay) / pulseFrequency * Math.PI * 2) * 0.3 + 0.7;

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 32px',
                background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
                borderRadius: 12,
                fontFamily: theme.typography.fontUi,
                fontSize: 16,
                fontWeight: 600,
                color: '#000',
                opacity: reveal,
                transform: `scale(${pulse * reveal})`,
                boxShadow: `
                    0 0 ${30 * glowPulse}px ${color}66,
                    0 0 ${60 * glowPulse}px ${color}33,
                    0 4px 20px rgba(0,0,0,0.3)
                `,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

interface ShakeElementProps {
    children: React.ReactNode;
    active?: boolean;
    intensity?: number;
    frequency?: number;
}

/**
 * Element that shakes when active (for warnings/alerts).
 */
export const ShakeElement: React.FC<ShakeElementProps> = ({
    children,
    active = true,
    intensity = 3,
    frequency = 8,
}) => {
    const frame = useCurrentFrame();

    if (!active) {
        return <>{children}</>;
    }

    const shakeX = Math.sin(frame / frequency * Math.PI * 2) * intensity;
    const shakeY = Math.cos(frame / frequency * Math.PI * 3) * intensity * 0.5;
    const rotation = Math.sin(frame / frequency * Math.PI * 2) * intensity * 0.3;

    return (
        <div
            style={{
                transform: `translate(${shakeX}px, ${shakeY}px) rotate(${rotation}deg)`,
            }}
        >
            {children}
        </div>
    );
};

interface BlinkingBadgeProps {
    children: React.ReactNode;
    color?: string;
    delay?: number;
    blinkFrequency?: number;
}

/**
 * Badge that blinks for urgent alerts.
 * Blink effect is subtle to avoid eye strain.
 */
export const BlinkingBadge: React.FC<BlinkingBadgeProps> = ({
    children,
    color = theme.accent.red,
    delay = 0,
    blinkFrequency = 45, // Much slower blink (was 15)
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 10, stiffness: 120 },
    });

    // Subtle blink effect - reduced intensity (0.15 instead of 0.3)
    const blink = Math.sin((frame - delay) / blinkFrequency * Math.PI * 2) * 0.15 + 0.85;

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                background: `${color}15`, // Reduced from 25
                border: `1px solid ${color}88`, // Reduced opacity
                borderRadius: 6,
                fontFamily: theme.typography.fontUi,
                fontSize: 12,
                fontWeight: 700,
                color: color,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: reveal,
                boxShadow: `0 0 ${8 * blink}px ${color}33`, // Reduced glow
            }}
        >
            {/* Subtle indicator dot */}
            <div
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: color,
                    opacity: blink,
                    boxShadow: `0 0 4px ${color}66`, // Reduced glow
                }}
            />
            {children}
        </div>
    );
};

interface AnimatedEnginePillProps {
    engine: 'Protect' | 'Grow' | 'Execute' | 'Govern';
    delay?: number;
    active?: boolean;
}

/**
 * Engine indicator pill with animated activation.
 */
export const AnimatedEnginePill: React.FC<AnimatedEnginePillProps> = ({
    engine,
    delay = 0,
    active = true,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 150 },
    });

    const colors: Record<string, string> = {
        Protect: theme.accent.red,
        Grow: theme.accent.violet,
        Execute: theme.accent.cyan,
        Govern: theme.accent.amber,
    };

    const icons: Record<string, string> = {
        Protect: '🛡️',
        Grow: '📈',
        Execute: '⚡',
        Govern: '⚖️',
    };

    const color = colors[engine];
    // Subtle pulse - reduced intensity
    const pulseIntensity = active ? Math.sin((frame - delay) / 30 * Math.PI * 2) * 0.15 + 0.85 : 0.5;

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                background: active ? `${color}25` : 'rgba(255,255,255,0.08)',
                border: `1px solid ${active ? color : 'rgba(255,255,255,0.2)'}`,
                borderRadius: 999,
                fontFamily: theme.typography.fontUi,
                fontSize: 13,
                fontWeight: 600,
                color: active ? color : 'rgba(255,255,255,0.5)',
                opacity: reveal,
                transform: `scale(${interpolate(reveal, [0, 1], [0.8, 1])})`,
                boxShadow: active ? `0 0 ${15 * pulseIntensity}px ${color}44` : 'none',
            }}
        >
            <span>{icons[engine]}</span>
            <span>{engine}</span>
        </div>
    );
};

interface AnimatedCardRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    style?: React.CSSProperties;
}

/**
 * Card that reveals with slide + fade animation.
 */
export const AnimatedCardReveal: React.FC<AnimatedCardRevealProps> = ({
    children,
    delay = 0,
    direction = 'up',
    style,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const reveal = spring({
        frame: frame - delay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const getTransform = () => {
        const distance = interpolate(reveal, [0, 1], [40, 0]);
        switch (direction) {
            case 'up':
                return `translateY(${distance}px)`;
            case 'down':
                return `translateY(${-distance}px)`;
            case 'left':
                return `translateX(${distance}px)`;
            case 'right':
                return `translateX(${-distance}px)`;
        }
    };

    return (
        <div
            style={{
                opacity: reveal,
                transform: `${getTransform()} scale(${interpolate(reveal, [0, 1], [0.95, 1])})`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

interface TypewriterTextLiveProps {
    text: string;
    delay?: number;
    speed?: number;
    cursor?: boolean;
    cursorColor?: string;
    style?: React.CSSProperties;
}

/**
 * Text that types itself character by character.
 */
export const TypewriterTextLive: React.FC<TypewriterTextLiveProps> = ({
    text,
    delay = 0,
    speed = 2,
    cursor = true,
    cursorColor = theme.accent.cyan,
    style,
}) => {
    const frame = useCurrentFrame();

    const effectiveFrame = Math.max(0, frame - delay);
    const visibleChars = Math.min(Math.floor(effectiveFrame / speed), text.length);
    const displayText = text.slice(0, visibleChars);

    // Cursor blink
    const cursorVisible = Math.floor(frame / 15) % 2 === 0;

    return (
        <span style={style}>
            {displayText}
            {cursor && visibleChars < text.length && (
                <span
                    style={{
                        color: cursorColor,
                        opacity: cursorVisible ? 1 : 0,
                        marginLeft: 2,
                    }}
                >
                    |
                </span>
            )}
        </span>
    );
};

interface ScaleInElementProps {
    children: React.ReactNode;
    delay?: number;
    style?: React.CSSProperties;
}

/**
 * Element that scales in with bounce.
 */
export const ScaleInElement: React.FC<ScaleInElementProps> = ({
    children,
    delay = 0,
    style,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - delay,
        fps,
        config: { damping: 8, stiffness: 150 },
    });

    return (
        <div
            style={{
                transform: `scale(${scale})`,
                opacity: interpolate(scale, [0, 0.5, 1], [0, 1, 1]),
                ...style,
            }}
        >
            {children}
        </div>
    );
};
