import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene3Wrapper } from "../components/Scene3Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE3_LINE5_DUR,
    S3_IMG_04,
    LOT_ALERT,
    WARNING_RED,
} from "../constants";

export const Scene3Line5: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_ALERT);

    const spr = spring({ frame, fps, config: { stiffness: 150 } });

    return (
        <Scene3Wrapper
            duration={SCENE3_LINE5_DUR}
            layout="split-right"
            bgImage={S3_IMG_04}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="w-full space-y-8 pl-12" style={{ transform: `scale(${interpolate(spr, [0, 1], [0.95, 1])})`, opacity: spr }}>
                    <DocumentReveal
                        text="ওয়ার্নিং লাইট জ্বলছে?"
                        className="text-8xl italic"
                        highlightWords={["ওয়ার্নিং", "লাইট"]}
                        highlightColor={WARNING_RED}
                    />
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-red-600 rounded-full animate-ping absolute opacity-40" />
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center relative shadow-[0_0_40px_rgba(220,38,38,0.6)]">
                            <span className="text-white text-4xl transform -rotate-12">!</span>
                        </div>
                        <span className="text-red-500 font-black text-3xl italic tracking-tighter uppercase">Dash Check Required</span>
                    </div>
                </div>
            }
            rightContent={
                <div className="relative w-full h-[550px]" style={{ transform: `translateY(${interpolate(spr, [0, 1], [30, 0])}px)` }}>
                    <Img src={S3_IMG_04} className="w-full h-full object-cover rounded-[3rem] border-2 border-red-500/40 shadow-2xl" />
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
                    {lottieData && (
                        <div className="absolute bottom-6 right-6 w-32 h-32 drop-shadow-lg">
                            <Lottie animationData={lottieData} />
                        </div>
                    )}
                </div>
            }
        />
    );
};
