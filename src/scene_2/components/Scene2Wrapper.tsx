import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { GRID_COLOR, TECH_BLUE } from "../constants";
import { FloatingParticles } from "./FloatingParticles";

const PremiumGrid: React.FC = () => {
    const frame = useCurrentFrame();
    const offset = interpolate(frame, [0, 1600], [0, 250], { extrapolateRight: "extend" });

    return (
        <AbsoluteFill className="pointer-events-none overflow-hidden">
            <div
                className="absolute inset-[-200px]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, ${GRID_COLOR} 2px, transparent 2px),
            linear-gradient(to bottom, ${GRID_COLOR} 2px, transparent 2px)
          `,
                    backgroundSize: "80px 80px",
                    transform: `translate(${-offset % 80}px, ${-offset % 80}px) rotate(-2deg)`,
                    opacity: 0.6,
                }}
            />
            <div className="absolute inset-0 flex flex-wrap justify-around opacity-40">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="w-[40vw] h-[40vw] rounded-full blur-[180px]"
                        style={{
                            backgroundColor: i % 2 === 0 ? TECH_BLUE : "#4F46E5",
                            transform: `translate(${Math.sin(frame / 150 + i) * 120}px, ${Math.cos(frame / 180 + i) * 120}px)`,
                            opacity: 0.4,
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};

export const Scene2Wrapper: React.FC<{
    children?: React.ReactNode;
    duration: number;
    bgImage?: string;
    bgOpacity?: number;
    layout?: "full" | "split-left" | "split-right";
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    fadeIn?: boolean;
    fadeOut?: boolean;
}> = ({
    children,
    duration,
    bgImage,
    bgOpacity = 0.5,
    layout = "full",
    leftContent,
    rightContent,
    fadeIn = true,
    fadeOut = true,
}) => {
        const frame = useCurrentFrame();
        const { fps } = useVideoConfig();
        const opacity = interpolate(
            frame,
            [0, 15, duration - 15, duration],
            [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const layoutSpring = spring({ frame, fps, config: { damping: 20 } });

        return (
            <AbsoluteFill style={{ backgroundColor: "#020617", opacity }}>
                {bgImage && (
                    <AbsoluteFill className="pointer-events-none overflow-hidden">
                        <Img
                            src={bgImage}
                            className="w-full h-full object-cover"
                            style={{
                                opacity: bgOpacity,
                                transform: `scale(${interpolate(frame, [0, duration], [1.1, 1.25])})`,
                                filter: "blur(4px) brightness(0.4)",
                            }}
                        />
                    </AbsoluteFill>
                )}

                <PremiumGrid />
                <FloatingParticles />

                {layout === "full" ? (
                    <AbsoluteFill className="flex items-center justify-center px-16 z-20">
                        {children}
                    </AbsoluteFill>
                ) : (
                    <AbsoluteFill className="flex flex-row z-20">
                        <div
                            className="flex-1 flex items-center justify-center p-12 overflow-hidden"
                            style={{
                                transform: `translateX(${interpolate(layoutSpring, [0, 1], [-50, 0])}px)`,
                                opacity: layoutSpring
                            }}
                        >
                            {layout === "split-left" ? leftContent : rightContent}
                        </div>
                        <div
                            className="flex-1 flex items-center justify-center p-12 overflow-hidden bg-slate-900/40 backdrop-blur-md border-l border-white/10"
                            style={{
                                transform: `translateX(${interpolate(layoutSpring, [0, 1], [50, 0])}px)`,
                                opacity: layoutSpring
                            }}
                        >
                            {layout === "split-left" ? rightContent : leftContent}
                        </div>
                    </AbsoluteFill>
                )}

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.8)] z-30" />
            </AbsoluteFill>
        );
    };
