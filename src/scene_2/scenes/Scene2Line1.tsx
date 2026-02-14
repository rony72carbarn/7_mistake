import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene2Wrapper } from "../components/Scene2Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE2_LINE1_DUR,
    S2_IMG_00,
    S2_IMG_01,
    S2_IMG_02,
    LOT_ALERT,
    WARNING_RED,
} from "../constants";

export const Scene2Line1: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_ALERT);

    const badgeScale = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 200 },
    });

    return (
        <Scene2Wrapper
            duration={SCENE2_LINE1_DUR}
            layout="split-right"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="w-full space-y-8 pl-12">
                    <div
                        className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl shadow-[0_20px_50px_rgba(220,38,38,0.5)]"
                        style={{
                            transform: `scale(${badgeScale}) rotate(-2deg)`,
                            opacity: badgeScale,
                        }}
                    >
                        <span className="text-white text-4xl font-black tracking-tighter">MISTAKE #1</span>
                    </div>

                    <div className="space-y-4">
                        <DocumentReveal
                            text="ইমপোর্ট রুলস না জানা"
                            delay={20}
                            className="text-8xl leading-[0.9]"
                            highlightWords={["রুলস"]}
                            highlightColor={WARNING_RED}
                        />
                        <p className="text-slate-400 text-2xl font-medium tracking-wide">
                            The biggest mistake starts before you buy.
                        </p>
                    </div>

                    {lottieData && (
                        <div className="bg-white/5 p-4 rounded-2xl w-32 h-32 backdrop-blur-sm border border-white/10 shadow-inner">
                            <Lottie animationData={lottieData} />
                        </div>
                    )}
                </div>
            }
            rightContent={<TripleImageGrid images={[S2_IMG_00, S2_IMG_01, S2_IMG_02]} delay={10} />}
        />
    );
};
