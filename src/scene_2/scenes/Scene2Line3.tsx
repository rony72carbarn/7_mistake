import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene2Wrapper } from "../components/Scene2Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE2_LINE3_DUR,
    S2_IMG_02,
    S2_IMG_03,
    S2_IMG_04,
    LOT_GDPR,
    SUCCESS_GREEN
} from "../constants";

export const Scene2Line3: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_GDPR);

    const contentSpring = spring({ frame, fps, config: { damping: 12 } });

    return (
        <Scene2Wrapper
            duration={SCENE2_LINE3_DUR}
            layout="split-right"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12" style={{ transform: `translateX(${interpolate(contentSpring, [0, 1], [-40, 0])}px)`, opacity: contentSpring }}>
                    <DocumentReveal
                        text="১০০% লিগ্যাল গাড়ির নিশ্চয়তা"
                        className="text-8xl"
                        highlightWords={["১০০%"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                    <div className="flex items-center gap-10">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                            {lottieData && <Lottie animationData={lottieData} style={{ width: 120, height: 120 }} />}
                        </div>
                        <div className="space-y-2">
                            <span className="text-white text-3xl font-black block leading-none">Verified Results</span>
                            <span className="text-green-400 text-xl font-bold uppercase tracking-wider italic">Certified by Carbarn</span>
                        </div>
                    </div>
                </div>
            }
            rightContent={<TripleImageGrid images={[S2_IMG_02, S2_IMG_03, S2_IMG_04]} delay={20} />}
        />
    );
};
