import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene3Wrapper } from "../components/Scene3Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE3_LINE1_DUR,
    S3_IMG_00,
    LOT_ALERT,
    WARNING_RED,
} from "../constants";

export const Scene3Line1: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_ALERT);

    const spr = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });

    return (
        <Scene3Wrapper
            duration={SCENE3_LINE1_DUR}
            layout="split-right"
            bgImage={S3_IMG_00}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="w-full space-y-8 pl-12">
                    <div
                        className="bg-red-600/90 text-white px-8 py-4 rounded-2xl inline-block shadow-2xl border-4 border-white/30"
                        style={{ transform: `scale(${spr}) rotate(-2deg)` }}
                    >
                        <span className="text-4xl font-black uppercase tracking-tighter">Mistake #2</span>
                    </div>
                    <DocumentReveal
                        text="শুধু বাইরের লুকস দেখে ফিদা হয়ে যাওয়া!"
                        className="text-8xl"
                        highlightWords={["বাইরের", "লুকস"]}
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
