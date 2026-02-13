import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE6_LINE2_DUR,
    IMG_BANK_TRANSFER,
    TECH_BLUE,
    LOGO,
} from "../constants";

export const Scene6Line2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideIn = spring({
        frame,
        fps,
        config: { damping: 20 },
    });

    const contentOpacity = interpolate(
        frame,
        [SCENE6_LINE2_DUR - 10, SCENE6_LINE2_DUR],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );

    return (
        <Scene4Wrapper duration={SCENE6_LINE2_DUR} bgOpacity={0} fadeOut={false}>
            <div className="w-full h-full flex items-center justify-center p-12" style={{ opacity: contentOpacity }}>
                <div className="w-full max-w-7xl flex flex-col items-center gap-12">
                    {/* Hero Image Section */}
                    <div
                        className="relative w-full max-h-[500px] overflow-hidden rounded-[4rem] border-8 border-white/30 shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
                        style={{
                            transform: `scale(${interpolate(slideIn, [0, 1], [0.8, 1])})`,
                            opacity: slideIn,
                        }}
                    >
                        <Img
                            src={IMG_BANK_TRANSFER}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Content Section */}
                    <div
                        className="w-full bg-white/10 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/20 shadow-2xl flex items-center gap-12"
                        style={{
                            transform: `translateY(${interpolate(slideIn, [0, 1], [50, 0])}px)`,
                            opacity: slideIn,
                        }}
                    >
                        <Img src={LOGO} className="h-40 drop-shadow-2xl" />
                        <div className="h-32 w-2 bg-blue-500 rounded-full opacity-50" />
                        <div className="flex-1 space-y-6">
                            <DocumentReveal
                                text="Carbarn ekuwa enkola z’okusasula"
                                mode="word"
                                delay={10}
                                className="text-4xl font-black text-white"
                                highlightWords={["Carbarn", "enkola", "okusasula"]}
                                highlightColor={TECH_BLUE}
                            />
                            <div className="flex items-center gap-6">
                                <DocumentReveal
                                    text="ezikuuma ssente zo nga 'bank transfer'"
                                    mode="word"
                                    delay={45}
                                    className="text-4xl font-bold text-white/80"
                                    highlightWords={["ezikuuma", "ssente", "transfer"]}
                                    highlightColor={TECH_BLUE}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
