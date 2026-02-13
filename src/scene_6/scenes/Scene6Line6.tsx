import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE6_LINE6_DUR,
    IMG_FORWARD_FAST,
    IMG_PROGRESS,
    SUCCESS_GREEN,
} from "../constants";

export const Scene6Line6: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideIn = spring({
        frame,
        fps,
        config: { damping: 20 },
    });

    const slideProgress = spring({
        frame: frame - 20,
        fps,
        config: { damping: 20 },
    });

    return (
        <Scene4Wrapper duration={SCENE6_LINE6_DUR} bgOpacity={0} fadeOut={false}>
            <div className="w-full h-full flex flex-col items-center justify-center p-12 gap-12">
                <div className="w-full max-w-7xl flex gap-12 items-center">
                    {/* Image Stack */}
                    <div className="flex-1 relative h-[600px]">
                        {/* First Image: Progress/Documentation */}
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                transform: `rotate(-4deg) scale(${interpolate(slideIn, [0, 1], [0.8, 1])}) translateY(${interpolate(slideIn, [0, 1], [50, 0])}px)`,
                                opacity: slideIn
                            }}
                        >
                            <Img
                                src={IMG_PROGRESS}
                                className="w-full h-auto rounded-[3rem] shadow-2xl border-8 border-white"
                            />
                        </div>

                        {/* Second Image: Forward Fast */}
                        <div
                            className="absolute inset-0 z-20"
                            style={{
                                transform: `rotate(4deg) scale(${interpolate(slideProgress, [0, 1], [0.8, 1.05])}) translateX(${interpolate(slideProgress, [0, 1], [100, 20])}px) translateY(${interpolate(slideProgress, [0, 1], [100, 20])}px)`,
                                opacity: slideProgress
                            }}
                        >
                            <Img
                                src={IMG_FORWARD_FAST}
                                className="w-full h-auto rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-8 border-white ring-4 ring-green-500/20"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div
                            className="bg-white/10 backdrop-blur-3xl p-12 rounded-[4rem] border-2 border-white/30 shadow-2xl space-y-10"
                            style={{ transform: `scale(${interpolate(slideIn, [0, 1], [0.9, 1])})`, opacity: slideIn }}
                        >
                            <DocumentReveal
                                text="mangu, nga ofuna ebiwandiiko"
                                mode="word"
                                delay={10}
                                className="text-5xl font-black leading-tight italic tracking-tighter text-blue-600"
                                highlightWords={["mangu", "ebiwandiiko"]}
                                highlightColor={SUCCESS_GREEN}
                            />
                            <div className="h-1 w-full bg-blue-500/10 rounded-full" />
                            <DocumentReveal
                                text="n’amawulire"
                                mode="word"
                                delay={50}
                                className="text-6xl font-bold text-slate-700"
                                highlightWords={["amawulire"]}
                                highlightColor={SUCCESS_GREEN}
                            />
                            <DocumentReveal
                                text="mu budde."
                                mode="word"
                                delay={90}
                                className="text-7xl font-black text-slate-900"
                                highlightWords={["budde"]}
                                highlightColor={SUCCESS_GREEN}
                            />
                        </div>

                        {/* Fast Forward Icon Overlay */}
                        <div
                            className="flex justify-end pr-12"
                            style={{ opacity: slideProgress, transform: `translateX(${interpolate(slideProgress, [0, 1], [50, 0])}px)` }}
                        >
                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-12 bg-green-500 rounded-lg skew-x-12"
                                        style={{ opacity: 1 - (i * 0.2) }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
