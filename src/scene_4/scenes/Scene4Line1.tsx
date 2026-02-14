import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE4_LINE1_DUR,
    S4_IMG_00,
    LOT_ALERT,
    WARNING_RED,
} from "../constants";

export const Scene4Line1: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_ALERT);

    const spr = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE1_DUR}
            layout="split-right"
            bgImage={S4_IMG_00}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="w-full space-y-8 pl-12">
                    <div
                        className="bg-red-600/90 text-white px-8 py-4 rounded-2xl inline-block shadow-2xl border-4 border-white/30"
                        style={{ transform: `scale(${spr}) rotate(-2deg)` }}
                    >
                        <span className="text-4xl font-black uppercase tracking-tighter">Mistake #3</span>
                    </div>
                    <DocumentReveal
                        text="মিস্টেক নাম্বার থ্রি: হিডেন ওয়্যার অ্যান্ড টিয়ার ইগনোর করা।"
                        className="text-8xl"
                        highlightWords={["থ্রি", "হিডেন", "ওয়্যার"]}
                        highlightColor={WARNING_RED}
                    />
                </div>
            }
            rightContent={
                <div className="relative w-full h-[600px] flex items-center justify-center">
                    <div className="w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl absolute opacity-30 animate-pulse" />
                    <div className="w-[450px] h-[450px]" style={{ transform: `scale(${spr})` }}>
                        {lottieData && <Lottie animationData={lottieData} />}
                    </div>
                </div>
            }
        />
    );
};
