import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene3Wrapper } from "../components/Scene3Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE3_LINE7_DUR,
    S3_IMG_06,
    S3_IMG_01,
    S3_IMG_04,
    LOT_BADGE,
    SUCCESS_GREEN,
} from "../constants";

export const Scene3Line7: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_BADGE);

    const spr = spring({ frame, fps, config: { damping: 10, stiffness: 120 } });

    return (
        <Scene3Wrapper
            duration={SCENE3_LINE7_DUR}
            layout="split-right"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12 pl-12" style={{ transform: `scale(${spr})`, opacity: spr }}>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 drop-shadow-2xl">
                            {lottieData && <Lottie animationData={lottieData} />}
                        </div>
                        <span className="text-white text-3xl font-black italic tracking-tighter uppercase border-b-4 border-green-500 pb-2">Verified Result</span>
                    </div>
                    <DocumentReveal
                        text="সবকিছু হাই-রেজোলিউশন ছবিসহ আপনার সামনে থাকবে। দিস ইজ রিয়েল ট্রান্সপারেন্সি!"
                        className="text-6xl italic leading-tight"
                        highlightWords={["হাই-রেজোলিউশন", "ট্রান্সপারেন্সি"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                    <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl">
                        <p className="text-white/60 text-xl font-bold leading-relaxed uppercase tracking-widest italic">
                            Experience the future of car importing with total peace of mind.
                        </p>
                    </div>
                </div>
            }
            rightContent={<TripleImageGrid images={[S3_IMG_06, S3_IMG_01, S3_IMG_04]} delay={15} />}
        />
    );
};
