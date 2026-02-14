import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene5Wrapper } from "../components/Scene5Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE5_LINE1_DUR,
} from "../constants";

export const Scene5Line1: React.FC<{
    fadeIn?: boolean;
    fadeOut?: boolean;
    text: string;
    highlights: string[];
    color: string;
    bgImage: string;
    lotAlert: string;
}> = ({ fadeIn, fadeOut, text, highlights, color, bgImage, lotAlert }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(lotAlert);

    const spr = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });

    return (
        <Scene5Wrapper
            duration={SCENE5_LINE1_DUR}
            layout="split-right"
            bgImage={bgImage}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="w-full space-y-8 pl-12">
                    <div
                        className="bg-red-600/90 text-white px-8 py-4 rounded-2xl inline-block shadow-2xl border-4 border-white/30"
                        style={{ transform: `scale(${spr}) rotate(-2deg)` }}
                    >
                        <span className="text-4xl font-black uppercase tracking-tighter">Mistake #4</span>
                    </div>
                    <DocumentReveal
                        text={text}
                        className="text-8xl"
                        highlightWords={highlights}
                        highlightColor={color}
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
