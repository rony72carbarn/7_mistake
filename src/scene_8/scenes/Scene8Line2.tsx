import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import {
    SCENE8_LINE2_DUR,
    ACCENT_CYAN,
    GOLD,
} from "../constants";

/**
 * Scene 8 Line 2: "carbarn."
 * Ultra-short domain reveal with explosive scale + glow burst
 */
export const Scene8Line2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Fast punchy entrance
    const textBounce = spring({
        frame,
        fps,
        config: { damping: 8, stiffness: 300 },
    });

    const glowBurst = spring({
        frame: frame - 2,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const pulse = Math.sin(frame * 0.3) * 0.5 + 0.5;

    // Exit
    const exitProgress = interpolate(frame, [SCENE8_LINE2_DUR - 5, SCENE8_LINE2_DUR], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

    return (
        <Scene4Wrapper duration={SCENE8_LINE2_DUR} bg="transparent" fadeIn={false} fadeOut={false}>
            {/* Dark backdrop continuation */}
            <AbsoluteFill
                style={{
                    background: "linear-gradient(135deg, #0A0E27 0%, #0D1B3E 40%, #0A1628 100%)",
                    opacity: contentOpacity,
                }}
            />

            {/* Radial glow burst */}
            <AbsoluteFill className="pointer-events-none" style={{ opacity: contentOpacity }}>
                <div
                    className="absolute rounded-full"
                    style={{
                        left: "50%",
                        top: "50%",
                        width: 600,
                        height: 600,
                        transform: `translate(-50%, -50%) scale(${glowBurst})`,
                        background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)`,
                        filter: "blur(40px)",
                    }}
                />
            </AbsoluteFill>

            {/* Domain text - big centered punch */}
            <div
                className="w-full h-full flex items-center justify-center"
                style={{ opacity: contentOpacity }}
            >
                <div
                    className="text-center"
                    style={{
                        transform: `scale(${interpolate(textBounce, [0, 1], [0.3, 1])})`,
                        opacity: textBounce,
                    }}
                >
                    <span
                        className="text-9xl font-black tracking-tight"
                        style={{
                            background: `linear-gradient(135deg, ${GOLD}, ${ACCENT_CYAN})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: `drop-shadow(0 0 ${20 + pulse * 15}px rgba(255, 184, 0, 0.4))`,
                        }}
                    >
                        carbarn.
                    </span>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
