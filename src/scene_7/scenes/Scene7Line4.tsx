import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE7_LINE4_DUR,
    IMG_READY_TO_SHIP,
    IMG_SHIPPED,
    IMG_ARRIVED,
    TECH_BLUE,
    WARNING_RED,
} from "../constants";

export const Scene7Line4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideIn = spring({
        frame: frame - 5,
        fps,
        config: { damping: 14, stiffness: 180 },
    });

    const exitFrame = SCENE7_LINE4_DUR - 12;
    const exitProgress = interpolate(frame, [exitFrame, SCENE7_LINE4_DUR], [0, 1], { extrapolateLeft: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

    return (
        <Scene4Wrapper
            duration={SCENE7_LINE4_DUR}
            bg="transparent"
            bgImage={IMG_READY_TO_SHIP}
            bgOpacity={0.05}
            fadeOut={false}
        >
            <div
                className="w-full h-full flex flex-col items-center justify-center p-8 gap-12"
                style={{ opacity: contentOpacity }}
            >
                <div className="flex flex-col items-center gap-6">
                    <DocumentReveal
                        text="ako, nekutevera nhanho imwe neimwe:"
                        mode="word"
                        delay={10}
                        className="text-6xl text-slate-800 font-bold text-center"
                        highlightWords={["nhanho", "imwe", "neimwe"]}
                        highlightColor={WARNING_RED}
                    />
                    <DocumentReveal
                        text='"Ready to Ship," "Shipped," kusvika pa "Arrived."'
                        mode="word"
                        delay={40}
                        className="text-4xl font-black text-slate-800 italic text-center"
                        highlightWords={["Ready", "Shipped", "Arrived"]}
                        highlightColor={TECH_BLUE}
                    />
                </div>

                {/* Shipping Stages Grid */}
                <div
                    className="grid grid-cols-3 gap-8 max-w-6xl w-full"
                    style={{
                        opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }),
                        transform: `translateY(${interpolate(frame, [60, 80], [40, 0], { extrapolateRight: "clamp" })}px)`,
                    }}
                >
                    {/* Stage 1: Ready to Ship */}
                    <div className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-500/30 shadow-xl">
                        <Img src={IMG_READY_TO_SHIP} className="w-full h-48 object-cover rounded-xl shadow-lg" />
                        <div className="text-3xl font-bold text-blue-600">Ready to Ship</div>
                    </div>

                    {/* Stage 2: Shipped */}
                    <div className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-orange-500/30 shadow-xl">
                        <Img src={IMG_SHIPPED} className="w-full h-48 object-cover rounded-xl shadow-lg" />
                        <div className="text-3xl font-bold text-orange-600">Shipped</div>
                    </div>

                    {/* Stage 3: Arrived */}
                    <div className="flex flex-col items-center gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/30 shadow-xl">
                        <Img src={IMG_ARRIVED} className="w-full h-48 object-cover rounded-xl shadow-lg" />
                        <div className="text-3xl font-bold text-green-600">Arrived</div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
