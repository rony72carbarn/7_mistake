import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene2Wrapper } from "../components/Scene2Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import {
    SCENE2_LINE2_DUR,
    S2_IMG_01,
    TECH_BLUE
} from "../constants";

export const Scene2Line2: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const textPop = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, stiffness: 200 }
    });

    const imgFloat = interpolate(frame, [0, SCENE2_LINE2_DUR], [0, -30]);

    return (
        <Scene2Wrapper
            duration={SCENE2_LINE2_DUR}
            bgImage={S2_IMG_01}
            layout="split-left"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div
                    className="relative w-full h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
                    style={{ transform: `translateY(${imgFloat}px) scale(1.05)` }}
                >
                    <Img src={S2_IMG_01} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
                        <h3 className="text-white text-4xl font-black mb-2">৫ বছরের নিয়ম</h3>
                        <p className="text-slate-300 text-xl font-bold uppercase tracking-widest">Strict Import Policy</p>
                    </div>
                </div>
            }
            rightContent={
                <div className="space-y-10 px-12" style={{ transform: `scale(${interpolate(textPop, [0, 1], [0.9, 1])})`, opacity: textPop }}>
                    <DocumentReveal
                        text="গাড়ি মাস্ট রাইট-হ্যান্ড ড্রাইভ (RHD) হতে হবে"
                        delay={15}
                        className="text-6xl italic"
                        highlightWords={["RHD", "মাস্ট"]}
                        highlightColor={TECH_BLUE}
                    />
                    <div className="h-1.5 w-48 bg-blue-500 rounded-full" />
                    <p className="text-white/60 text-2xl font-light">
                        Compliance is non-negotiable for Bangladesh customs.
                    </p>
                </div>
            }
        />
    );
};
