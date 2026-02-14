import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene3Wrapper } from "../components/Scene3Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import {
    SCENE3_LINE6_DUR,
    S3_IMG_05,
    TECH_BLUE,
} from "../constants";

export const Scene3Line6: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({ frame, fps, config: { damping: 15 } });

    return (
        <Scene3Wrapper
            duration={SCENE3_LINE6_DUR}
            layout="split-left"
            bgImage={S3_IMG_05}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div
                        className="w-[500px] h-[500px] rounded-full overflow-hidden border-[12px] border-white/5 shadow-2xl relative"
                        style={{ transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])})` }}
                    >
                        <Img src={S3_IMG_05} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
                        <div className="absolute bottom-16 left-0 right-0 py-4 bg-blue-600/80 backdrop-blur-md text-center border-y border-white/20">
                            <span className="text-white font-black text-2xl tracking-widest uppercase italic">Zoom Inspection</span>
                        </div>
                    </div>
                </div>
            }
            rightContent={
                <div className="space-y-12 px-12" style={{ transform: `translateX(${interpolate(spr, [0, 1], [40, 0])}px)`, opacity: spr }}>
                    <DocumentReveal
                        text="ইন্টেরিয়রে স্ক্র্যাচ? সবকিছু আপনার সামনে।"
                        className="text-7xl font-serif italic"
                        highlightWords={["ইন্টেরিয়রে", "স্ক্র্যাচ"]}
                        highlightColor={TECH_BLUE}
                    />
                    <div className="flex flex-col gap-4">
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[95%] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                        </div>
                        <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm">Transparency Index: 95%</span>
                    </div>
                </div>
            }
        />
    );
};
