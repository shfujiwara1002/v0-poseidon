import React from 'react';
import { theme } from '../theme';

interface DeviceFrameProps {
    device?: 'iphone' | 'macbook' | 'browser';
    children?: React.ReactNode;
    screenshot?: string;
    reflection?: boolean;
    toolbar?: boolean;
    perspective?: boolean;
    style?: React.CSSProperties;
}

/**
 * Premium device mockups for product showcases.
 * Uses CSS transforms and glass effects to create a high-end feel.
 */
export const DeviceFrame: React.FC<DeviceFrameProps> = ({
    device = 'iphone',
    children,
    screenshot,
    reflection = true,
    toolbar = false,
    perspective = false,
    style,
}) => {
    const isIphone = device === 'iphone';
    const isMacbook = device === 'macbook';

    const frameStyle: React.CSSProperties = isIphone
        ? {
            width: 380,
            height: 780,
            borderRadius: 50,
            padding: 12,
            background: 'linear-gradient(180deg, rgba(14,18,28,0.96) 0%, rgba(8,12,20,0.98) 100%)',
            border: '2px solid rgba(255,255,255,0.16)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 10px 24px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12)',
            position: 'relative',
        }
        : {
            width: 1000,
            height: 600,
            borderRadius: 20,
            padding: 10,
            background: 'linear-gradient(180deg, rgba(14,18,28,0.96) 0%, rgba(8,12,20,0.98) 100%)',
            border: '1px solid rgba(255,255,255,0.16)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.86), 0 10px 28px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.14)',
            position: 'relative',
        };

    const frameContent = (
        <div style={{ ...frameStyle, ...style }}>
            {/* Notch / Dynamic Island */}
            {isIphone && (
                <div
                    style={{
                        position: 'absolute',
                        top: 25,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 110,
                        height: 30,
                        background: '#000',
                        borderRadius: 15,
                        zIndex: 10,
                    }}
                />
            )}

            {/* Screen Content */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: screenshot ? `url(${screenshot}) center/cover no-repeat` : '#000',
                    borderRadius: isIphone ? 40 : 10,
                    overflow: 'hidden',
                    position: 'relative',
                    border: `1px solid ${theme.glassPremium.innerPanelBorder}`,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* macOS Toolbar */}
                {toolbar && isMacbook && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 36,
                            padding: '0 14px',
                            background: 'rgba(14,18,28,0.90)',
                            borderBottom: `1px solid ${theme.glassPremium.innerPanelBorder}`,
                            flexShrink: 0,
                            zIndex: 6,
                        }}
                    >
                        {/* Traffic lights */}
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57', boxShadow: '0 0 4px rgba(255,95,87,0.4)' }} />
                            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E', boxShadow: '0 0 4px rgba(255,189,46,0.4)' }} />
                            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840', boxShadow: '0 0 4px rgba(40,200,64,0.4)' }} />
                        </div>
                        {/* Address bar */}
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '0 40px',
                            }}
                        >
                            <div
                                style={{
                                    background: theme.glassPremium.innerPanelBg,
                                    border: `1px solid ${theme.glassPremium.innerPanelBorder}`,
                                    borderRadius: 6,
                                    padding: '4px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                }}
                            >
                                {/* Lock icon */}
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                                    <rect x="0.5" y="5" width="9" height="6.5" rx="1.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                                    <path d="M2.5 5V3.5a2.5 2.5 0 015 0V5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
                                </svg>
                                <span
                                    style={{
                                        fontFamily: theme.typography.fontMono,
                                        fontSize: 13,
                                        color: 'rgba(255,255,255,0.40)',
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    https://poseidon-mit.com
                                </span>
                            </div>
                        </div>
                        {/* Spacer to balance traffic lights */}
                        <div style={{ width: 51 }} />
                    </div>
                )}

                {/* Screen body */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    {children}
                </div>

                {/* Reflection Overlay */}
                {reflection && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 40%, rgba(255,255,255,0.04) 100%)',
                            pointerEvents: 'none',
                            zIndex: 5,
                        }}
                    />
                )}

                {/* Inner Glow */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* Macbook Base Mockup */}
            {isMacbook && (
                <>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -24,
                            left: '-5%',
                            width: '110%',
                            height: 24,
                            background: 'linear-gradient(to bottom, rgba(18,24,36,0.95), rgba(6,10,18,0.98))',
                            borderRadius: '0 0 10px 10px',
                            border: `1px solid ${theme.glassPremium.innerPanelBorder}`,
                            borderTop: 'none',
                        }}
                    />
                    {/* Hinge notch */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: -4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 80,
                            height: 5,
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: '0 0 4px 4px',
                            zIndex: 2,
                        }}
                    />
                </>
            )}
        </div>
    );

    if (perspective) {
        return (
            <div style={{ perspective: 1800, transformStyle: 'preserve-3d' }}>
                <div style={{ transform: 'rotateY(-2deg) rotateX(1deg)', transformStyle: 'preserve-3d' }}>
                    {frameContent}
                </div>
            </div>
        );
    }

    return frameContent;
};
