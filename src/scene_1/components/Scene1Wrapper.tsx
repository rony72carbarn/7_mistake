import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { GRID_COLOR, TECH_BLUE } from "../constants";
import { FloatingParticles } from "./FloatingParticles";

/**
 * Premium Grid Background Animation
 * Animated grid with parallax motion and glowing orbs
 */
const PremiumGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const offset = interpolate(frame, [0, 1600], [0, 250], { extrapolateRight: "extend" });

    return (
        <AbsoluteFill className="pointer-events-none overflow-hidden">
            {/* Animated grid pattern */}
            <div
                className="absolute inset-[-200px]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, ${GRID_COLOR} 1px, transparent 1px),
            linear-gradient(to bottom, ${GRID_COLOR} 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                    transform: `translate(${-offset % 60}px, ${-offset % 60}px) rotate(-1deg)`,
                    opacity: 0.8,
                }}
            />
            {/* Glowing orbs with wave motion */}
            <div className="absolute inset-0 flex flex-wrap justify-around opacity-30">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-[30vw] h-[30vw] rounded-full blur-[150px]"
                        style={{
                            backgroundColor: TECH_BLUE,
                            transform: `translate(${Math.sin(frame / 200 + i) * 80}px, ${Math.cos(frame / 250 + i) * 80}px)`,
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};

/**
 * Scene 1 Wrapper Component
 * Provides consistent scene framing with fade transitions and animated background
 *
 * @param children - Scene content to render
 * @param duration - Total duration of the scene in frames
 * @param bg - Background color (default: #E9F3FF)
 * @param bgImage - Optional background image with low opacity
 * @param bgOpacity - Opacity of background image (default: 0.15)
 */
export const Scene1Wrapper: React.FC<{
    children: React.ReactNode;
    duration: number;
    bg?: string;
    bgImage?: string;
    bgOpacity?: number;
    fadeIn?: boolean;
    fadeOut?: boolean;
}> = ({
    children,
    duration,
    bg = "#E9F3FF",
    bgImage,
    bgOpacity = 0.10,
    fadeIn = true,
    fadeOut = true,
}) => {
        const frame = useCurrentFrame();

        // Controlled fade in/out to allow seamless scene connection
        const maxFade = Math.floor((duration - 1) / 2);
        const fadeTime = Math.min(12, maxFade);

        const shouldInterpolate = duration >= 3;

        const opacity = shouldInterpolate
            ? interpolate(
                frame,
                [0, fadeTime, duration - fadeTime, duration],
                [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1],
                {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                }
            )
            : 1;

        // Background image gentle zoom/pan animation
        const bgScale = interpolate(frame, [0, duration], [1, 1.1], {
            extrapolateRight: "clamp",
        });

        return (
            <AbsoluteFill style={{ backgroundColor: bg, opacity }}>
                {/* Optional background image with increased prominence */}
                {bgImage && (
                    <AbsoluteFill className="pointer-events-none overflow-hidden">
                        <Img
                            src={bgImage}
                            className="w-full h-full object-cover"
                            style={{
                                opacity: bgOpacity * 4, // Increased from 0.1 to ~0.4
                                transform: `scale(${bgScale})`,
                                filter: "blur(1px)", // Reduced blur
                            }}
                        />
                        {/* Subtle dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/20" />
                    </AbsoluteFill>
                )}

                <PremiumGrid />
                <FloatingParticles />
                <div className="relative z-10 w-full h-full flex items-center justify-center px-8">
                    {children}
                </div>
            </AbsoluteFill>
        );
    };
