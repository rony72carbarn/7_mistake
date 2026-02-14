import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene5Wrapper } from "../components/Scene5Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE5_LINE5_DUR,
    S5_IMG_05,
    S5_IMG_04,
    S5_IMG_03,
    LOT_CHECK,
    SUCCESS_GREEN,
} from "../constants";

export const Scene5Line5: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_CHECK);

    const spr = spring({ frame, fps, config: { damping: 10, stiffness: 120 } });

    return (
        <Scene5Wrapper
            duration={SCENE5_LINE5_DUR}
            layout="split-right"
            bgImage={S5_IMG_05}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12 pl-12" style={{ transform: `scale(${spr})`, opacity: spr }}>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 drop-shadow-2xl">
                            {lottieData && <Lottie animationData={lottieData} />}
                        </div>
                        <span className="text-white text-3xl font-black italic tracking-tighter uppercase border-b-4 border-green-500 pb-2 text-green-400">Perfect Clearance</span>
                    </div>
                    <DocumentReveal
                        text="ক্লিয়ারেন্সের সময় সিঅ্যান্ডএফ এজেন্টকে নিয়ে কোনো 'প্যারা' খেতে হবে না।"
                        className="text-6xl italic leading-tight"
                        highlightWords={["সিঅ্যান্ডএফ", "প্যারা", "এজেন্টকে"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                    <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl">
                        <p className="text-white/60 text-xl font-bold leading-relaxed uppercase tracking-widest italic">
                            No hidden hassles. Total control over your documentation.
                        </p>
                    </div>
                </div>
            }
            rightContent={
                <div className="w-full h-full p-4">
                    <TripleImageGrid
                        images={[S5_IMG_05, S5_IMG_04, S5_IMG_03]}
                        interval={15}
                    />
                </div>
            }
        />
    );
};
