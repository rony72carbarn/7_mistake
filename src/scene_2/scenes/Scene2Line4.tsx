import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene2Wrapper } from "../components/Scene2Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE2_LINE4_DUR,
    S2_IMG_03,
    LOT_CAR,
    TECH_BLUE
} from "../constants";

export const Scene2Line4: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_CAR);

    const slide = spring({ frame, fps, config: { damping: 15 } });

    return (
        <Scene2Wrapper
            duration={SCENE2_LINE4_DUR}
            layout="split-left"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div
                    className="w-full h-full relative group"
                    style={{ transform: `scale(${interpolate(slide, [0, 1], [0.8, 1])})`, opacity: slide }}
                >
                    <Img src={S2_IMG_03} className="w-full h-full object-cover rounded-[4rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] border-2 border-white/10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/80 rounded-[4rem]" />
                    {lottieData && (
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 drop-shadow-2xl">
                            <Lottie animationData={lottieData} />
                        </div>
                    )}
                </div>
            }
            rightContent={
                <div className="space-y-10 pl-12" style={{ transform: `translateX(${interpolate(slide, [0, 1], [40, 0])}px)`, opacity: slide }}>
                    <DocumentReveal
                        text="ভুল গাড়ির পেছনে টাইম ওয়েস্ট করার কোনো সিন নাই।"
                        className="text-5xl"
                        highlightWords={["টাইম", "ওয়েস্ট"]}
                        highlightColor={TECH_BLUE}
                    />
                    <div className="flex flex-col gap-4">
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                        </div>
                        <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-sm">Efficiency Multiplier: 10x</span>
                    </div>
                </div>
            }
        />
    );
};
