import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene3Wrapper } from "../components/Scene3Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import {
    SCENE3_LINE4_DUR,
    S3_IMG_03,
    WARNING_RED,
} from "../constants";

export const Scene3Line4: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({ frame, fps, config: { damping: 12 } });

    return (
        <Scene3Wrapper
            duration={SCENE3_LINE4_DUR}
            layout="split-left"
            bgImage={S3_IMG_03}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="relative w-full h-full p-12">
                    <div
                        className="w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[-20px_20px_60px_rgba(0,0,0,0.6)] relative"
                        style={{ transform: `scale(${interpolate(spr, [0, 1], [0.9, 1])})` }}
                    >
                        <Img src={S3_IMG_03} className="w-full h-full object-cover" />
                        <div className="absolute top-10 right-10 flex gap-4">
                            <div className="bg-red-600 px-6 py-3 rounded-full text-white font-black text-xl shadow-2xl animate-pulse">RUST DETECTED</div>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(153,27,27,0.4)_100%)]" />
                    </div>
                </div>
            }
            rightContent={
                <div className="space-y-12 px-12" style={{ transform: `translateX(${interpolate(spr, [0, 1], [40, 0])}px)`, opacity: spr }}>
                    <DocumentReveal
                        text="আন্ডারক্যারেজে রাস্ট (মরিচা) আছে? অরিজিনাল জাপানিজ অকশন শিট চেক করুন।"
                        className="text-6xl"
                        highlightWords={["রাস্ট", "(মরিচা)", "অকশন"]}
                        highlightColor={WARNING_RED}
                    />
                    <div className="p-8 bg-red-900/20 border border-red-500/30 rounded-[2rem] backdrop-blur-xl">
                        <span className="text-red-400 font-black block mb-2 uppercase tracking-tighter">Critical Risk</span>
                        <p className="text-white/70 text-xl font-medium">Structural integrity is our first priority. We scan every inch.</p>
                    </div>
                </div>
            }
        />
    );
};
