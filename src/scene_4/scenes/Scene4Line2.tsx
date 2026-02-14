import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import {
    SCENE4_LINE2_DUR,
    S4_IMG_01,
    WARNING_ORANGE,
} from "../constants";

export const Scene4Line2: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({ frame, fps, config: { damping: 12 } });

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE2_DUR}
            layout="split-left"
            bgImage={S4_IMG_01}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="relative w-full h-full p-8">
                    <div
                        className="w-full h-full rounded-[4rem] overflow-hidden border-4 border-white/20 shadow-2xl relative"
                        style={{ transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])}) rotate(1deg)` }}
                    >
                        <Img src={S4_IMG_01} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12">
                            <span className="text-orange-400 text-3xl font-black italic block mb-2 tracking-tighter uppercase">Auction Grade 4.5</span>
                            <span className="text-white text-5xl font-black leading-none">Not Always Perfect</span>
                        </div>
                    </div>
                </div>
            }
            rightContent={
                <div className="space-y-12 px-12" style={{ opacity: spr, transform: `translateX(${interpolate(spr, [0, 1], [100, 0])}px)` }}>
                    <DocumentReveal
                        text="গাড়ি অকশন গ্রেড ৪.৫ হলেও টায়ার আর ব্রেক প্যাডের অবস্থা খারাপ থাকতে পারে।"
                        className="text-7xl leading-tight"
                        highlightWords={["টায়ার", "ব্রেক", "প্যাডের"]}
                        highlightColor={WARNING_ORANGE}
                    />
                    <div className="h-1 w-32 bg-orange-500 rounded-full" />
                    <p className="text-white/60 text-2xl font-medium tracking-wide leading-relaxed">
                        Hidden wear and tear can hide behind a high auction grade.
                    </p>
                </div>
            }
        />
    );
};
