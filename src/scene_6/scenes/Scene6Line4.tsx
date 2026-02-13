import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE6_LINE4_DUR,
    IMG_BANK_TRANSFER,
    TECH_BLUE,
} from "../constants";

export const Scene6Line4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { damping: 15 },
    });

    const contentOpacity = interpolate(
        frame,
        [SCENE6_LINE4_DUR - 10, SCENE6_LINE4_DUR],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );

    return (
        <Scene4Wrapper duration={SCENE6_LINE4_DUR} bgOpacity={0} fadeOut={false}>
            <div className="w-full h-full flex flex-col items-center justify-center p-12 gap-12" style={{ opacity: contentOpacity }}>
                {/* Hero Image Section with Traceability Overlay */}
                <div
                    className="relative w-full max-w-6xl h-[550px] overflow-hidden rounded-[5rem] border-8 border-white shadow-[0_60px_120px_rgba(0,0,0,0.5)]"
                    style={{ transform: `scale(${interpolate(scale, [0, 1], [0.85, 1])})`, opacity: scale }}
                >
                    <Img
                        src={IMG_BANK_TRANSFER}
                        className="w-full h-full object-cover"
                    />

                    {/* Traceability Scanning Effect */}
                    <div
                        className="absolute inset-0 bg-blue-500/10 pointer-events-none overflow-hidden"
                    >
                        <div
                            className="absolute top-0 left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_20px_#60A5FA] z-20"
                            style={{
                                transform: `translateY(${interpolate(frame % 90, [0, 90], [-100, 600])}px)`,
                            }}
                        />
                    </div>

                    {/* Verification Badge */}
                    <div
                        className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-xl px-10 py-6 rounded-3xl border-2 border-green-500/50 shadow-2xl flex items-center gap-6"
                        style={{ transform: `translateX(${interpolate(scale, [0, 1], [200, 0])}px)`, opacity: scale }}
                    >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-3xl font-black text-slate-800 uppercase tracking-widest">Traceable</span>
                    </div>
                </div>

                {/* Content Section */}
                <div
                    className="w-full max-w-5xl flex items-center gap-12 bg-slate-900/10 backdrop-blur-xl p-10 rounded-4xl border border-white/20 shadow-xl"
                    style={{ transform: `translateY(${interpolate(scale, [0, 1], [50, 0])}px)`, opacity: scale }}
                >
                    <div className="flex-1 space-y-4">
                        <DocumentReveal
                            text="Bw’oloonda okusasula ng’oyita"
                            mode="word"
                            delay={10}
                            className="text-4xl font-bold text-slate-700"
                            highlightWords={["Bw’oloonda", "banka"]}
                            highlightColor={TECH_BLUE}
                        />
                        <DocumentReveal
                            text="mu banka, kiba kyangu, kigenda butereevu."
                            mode="word"
                            delay={70}
                            className="text-4xl font-black leading-tight"
                            highlightWords={["kyangu", "butereevu"]}
                            highlightColor={TECH_BLUE}
                        />
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
