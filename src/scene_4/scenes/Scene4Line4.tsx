import React from "react";
import { Img, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import {
    SCENE4_LINE4_DUR,
    S4_IMG_05,
    TECH_BLUE,
} from "../constants";

export const Scene4Line4: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({ frame, fps, config: { damping: 12 } });

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE4_DUR}
            layout="split-left"
            bgImage={S4_IMG_05}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="relative w-full h-full p-12">
                    <div
                        className="w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[-20px_20px_60px_rgba(0,0,0,0.6)] relative"
                        style={{ transform: `scale(${interpolate(spr, [0, 1], [0.9, 1])})` }}
                    >
                        <Img src={S4_IMG_05} className="w-full h-full object-cover" />
                        <div className="absolute top-10 right-10 flex gap-4">
                            <div className="bg-blue-600 px-6 py-3 rounded-full text-white font-black text-xl shadow-2xl animate-pulse">DETAILED REPORT</div>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(59,130,246,0.3)_100%)]" />
                    </div>
                </div>
            }
            rightContent={
                <div className="space-y-12 px-12" style={{ transform: `translateX(${interpolate(spr, [0, 1], [40, 0])}px)`, opacity: spr }}>
                    <DocumentReveal
                        text="কারবার্নের ডিটেইলড ছবি আর রিপোর্ট দেখে আপনি আগেই বুঝতে পারবেন কোন পার্টসগুলোর কী অবস্থা।"
                        className="text-6xl"
                        highlightWords={["ডিটেইলড", "ছবি", "রিপোর্ট"]}
                        highlightColor={TECH_BLUE}
                    />
                    <div className="p-8 bg-blue-900/20 border border-blue-500/30 rounded-[2rem] backdrop-blur-xl">
                        <span className="text-blue-400 font-black block mb-2 uppercase tracking-tighter">Full Transparency</span>
                        <p className="text-white/70 text-xl font-medium">No hidden surprises. We show you the exact condition of every part.</p>
                    </div>
                </div>
            }
        />
    );
};
