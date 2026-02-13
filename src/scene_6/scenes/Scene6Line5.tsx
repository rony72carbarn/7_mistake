import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE6_LINE5_DUR,
    IMG_CONFIRMATION,
    TECH_BLUE,
} from "../constants";

export const Scene6Line5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideUp = spring({
        frame,
        fps,
        config: { damping: 20 },
    });

    const contentOpacity = interpolate(
        frame,
        [SCENE6_LINE5_DUR - 10, SCENE6_LINE5_DUR],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );

    return (
        <Scene4Wrapper duration={SCENE6_LINE5_DUR} bgOpacity={0} fadeOut={false}>
            <div className="w-full h-full flex items-center justify-center p-12" style={{ opacity: contentOpacity }}>
                <div className="w-full max-w-7xl flex gap-16 items-center">
                    {/* Hero Image with 3D feel */}
                    <div
                        className="flex-1 relative"
                        style={{
                            transform: `perspective(1000px) rotateY(${interpolate(slideUp, [0, 1], [-15, 0])}deg) translateY(${interpolate(slideUp, [0, 1], [100, 0])}px)`,
                            opacity: slideUp
                        }}
                    >
                        <div className="relative group">
                            <Img
                                src={IMG_CONFIRMATION}
                                className="w-full h-auto rounded-[4rem] shadow-[0_60px_150px_rgba(0,0,0,0.5)] border-8 border-white ring-4 ring-blue-500/20"
                            />
                            {/* Animated Success Badge */}
                            <div
                                className="absolute -top-12 -right-12 bg-green-500 rounded-full p-10 shadow-[0_20px_60px_rgba(34,197,94,0.4)] scale-110 border-4 border-white"
                                style={{
                                    transform: `scale(${interpolate(frame, [20, 40], [0, 1.2], { extrapolateRight: "clamp" })}) rotate(${interpolate(frame, [20, 40], [-45, 0])}deg)`,
                                }}
                            >
                                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-12">
                        <div
                            className="bg-white/10 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/20 shadow-2xl space-y-10"
                            style={{ transform: `translateX(${interpolate(slideUp, [0, 1], [100, 0])}px)`, opacity: slideUp }}
                        >
                            <DocumentReveal
                                text="Bw’omala okusasula,"
                                mode="word"
                                delay={10}
                                className="text-4xl font-bold text-slate-700"
                                highlightWords={["Bw’omala", "okusasula"]}
                                highlightColor={TECH_BLUE}
                            />
                            <DocumentReveal
                                text="osindika obukakufu,"
                                mode="word"
                                delay={45}
                                className="text-6xl font-black text-blue-700 leading-tight"
                                highlightWords={["osindika", "obukakufu"]}
                                highlightColor={TECH_BLUE}
                            />
                            <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-30" />
                            <DocumentReveal
                                text="'order' n’etambula..."
                                mode="word"
                                delay={90}
                                className="text-5xl font-bold italic text-blue-600/60"
                                highlightWords={["order", "etambula"]}
                                highlightColor={TECH_BLUE}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
