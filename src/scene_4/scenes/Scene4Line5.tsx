import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE4_LINE5_DUR,
    S4_IMG_06,
    S4_IMG_05,
    S4_IMG_01,
    LOT_CHECK,
    SUCCESS_GREEN,
} from "../constants";

export const Scene4Line5: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_CHECK);

    const spr = spring({ frame, fps, config: { damping: 10, stiffness: 120 } });

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE5_DUR}
            layout="split-right"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12 pl-12" style={{ transform: `scale(${spr})`, opacity: spr }}>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 drop-shadow-2xl">
                            {lottieData && <Lottie animationData={lottieData} />}
                        </div>
                        <span className="text-white text-3xl font-black italic tracking-tighter uppercase border-b-4 border-green-500 pb-2">Smart Decision</span>
                    </div>
                    <DocumentReveal
                        text="পেমেন্ট করার আগেই আপনি একটা স্মার্ট ডিসিশন নিতে পারবেন, এক্সট্রা খরচের কোনো সারপ্রাইজ থাকবে না।"
                        className="text-6xl italic leading-tight"
                        highlightWords={["স্মার্ট", "ডিসিশন", "সারপ্রাইজ"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                    <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl">
                        <p className="text-white/60 text-xl font-bold leading-relaxed uppercase tracking-widest italic">
                            No hidden costs. Total control over your investment.
                        </p>
                    </div>
                </div>
            }
            rightContent={<TripleImageGrid images={[S4_IMG_06, S4_IMG_05, S4_IMG_01]} delay={15} />}
        />
    );
};
