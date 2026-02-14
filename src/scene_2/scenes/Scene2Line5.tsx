import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene2Wrapper } from "../components/Scene2Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE2_LINE5_DUR,
    S2_IMG_04,
    LOT_SEARCH,
    TECH_BLUE
} from "../constants";

export const Scene2Line5: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_SEARCH);

    const pop = spring({ frame, fps, config: { stiffness: 150 } });

    return (
        <Scene2Wrapper
            duration={SCENE2_LINE5_DUR}
            layout="split-right"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12 pr-12" style={{ transform: `scale(${interpolate(pop, [0, 1], [0.95, 1])})`, opacity: pop }}>
                    <DocumentReveal
                        text="সব আপনার চোখের সামনে।"
                        className="text-7xl font-serif italic"
                        highlightWords={["সব"]}
                        highlightColor={TECH_BLUE}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {["মডেল", "ইয়ার", "মাইলেজ", "অকশন গ্রেড"].map((filter, i) => (
                            <div
                                key={i}
                                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group overflow-hidden"
                                style={{
                                    transform: `translateY(${interpolate(frame - 30 - i * 5, [0, 15], [30, 0], { extrapolateLeft: "clamp" })}px)`,
                                    opacity: interpolate(frame - 30 - i * 5, [0, 15], [0, 1], { extrapolateLeft: "clamp" })
                                }}
                            >
                                <span className="text-white text-xl font-bold">{filter}</span>
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            rightContent={
                <div
                    className="w-full h-full relative"
                    style={{ transform: `rotate(${-2 + Math.sin(frame / 30) * 1}deg)` }}
                >
                    <Img src={S2_IMG_04} className="w-full h-auto rounded-[3rem] shadow-2xl border-2 border-white/20" />
                    {lottieData && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-60 mix-blend-screen">
                            <Lottie animationData={lottieData} />
                        </div>
                    )}
                </div>
            }
        />
    );
};
