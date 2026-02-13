import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE6_LINE3_DUR,
    IMG_CREDIT_CARD,
    TECH_BLUE,
} from "../constants";

export const Scene6Line3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideUp = spring({
        frame,
        fps,
        config: { damping: 20 },
    });

    const contentOpacity = interpolate(
        frame,
        [SCENE6_LINE3_DUR - 10, SCENE6_LINE3_DUR],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );

    return (
        <Scene4Wrapper duration={SCENE6_LINE3_DUR} bgOpacity={0} fadeOut={false}>
            <div className="w-full h-full flex items-center justify-center p-12" style={{ opacity: contentOpacity }}>
                <div className="w-full max-w-7xl flex gap-12 items-stretch h-[600px]">
                    {/* Left side: Image focus */}
                    <div
                        className="flex-1 relative overflow-hidden rounded-[4rem] border-8 border-white shadow-[0_50px_100px_rgba(0,82,255,0.3)]"
                        style={{ transform: `scale(${interpolate(slideUp, [0, 1], [0.95, 1])})`, opacity: slideUp }}
                    >
                        <Img
                            src={IMG_CREDIT_CARD}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Right side: Modern Text Cards */}
                    <div className="flex-1 flex flex-col gap-6 justify-center">
                        <div
                            className="bg-white/15 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/30 shadow-2xl"
                            style={{ transform: `translateX(${interpolate(slideUp, [0, 1], [100, 0])}px)`, opacity: slideUp }}
                        >
                            <DocumentReveal
                                text="oba 'credit card'—"
                                mode="word"
                                delay={10}
                                className="text-5xl font-black text-blue-600 drop-shadow-sm"
                                highlightWords={["oba", "card"]}
                                highlightColor={TECH_BLUE}
                            />
                        </div>

                        <div
                            className="bg-blue-600/10 backdrop-blur-2xl p-10 rounded-[3rem] border border-blue-500/20 shadow-xl flex-1 flex flex-col justify-center"
                            style={{ transform: `translateX(${interpolate(slideUp, [0, 1], [150, 0])}px)`, opacity: slideUp }}
                        >
                            <DocumentReveal
                                text="era buli kimu kiba kyeyoleka"
                                mode="word"
                                delay={40}
                                className="text-4xl font-bold text-slate-700"
                                highlightWords={["buli", "kimu", "kyeyoleka"]}
                                highlightColor={TECH_BLUE}
                            />
                            <DocumentReveal
                                text="okuva ku ntandikwa."
                                mode="word"
                                delay={75}
                                className="text-5xl font-black mt-4 leading-tight"
                                highlightWords={["ntandikwa"]}
                                highlightColor={TECH_BLUE}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
