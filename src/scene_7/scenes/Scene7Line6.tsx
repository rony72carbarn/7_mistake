import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
    SCENE7_LINE6_DUR,
    IMG_ALWAYS_KNOW,
    LOTTIE_SUCCESS,
    SUCCESS_GREEN,
} from "../constants";

export const Scene7Line6: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOTTIE_SUCCESS);

    const reveal = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12 },
    });

    return (
        <Scene4Wrapper
            duration={SCENE7_LINE6_DUR}
            bg="transparent"
            bgImage={IMG_ALWAYS_KNOW}
            bgOpacity={0.08}
        >
            <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-12">
                <div
                    className="bg-white/15 backdrop-blur-xl p-16 rounded-[3rem] border-2 border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.3)] max-w-7xl text-center"
                    style={{ transform: `scale(${interpolate(reveal, [0, 1], [0.9, 1])})`, opacity: reveal }}
                >
                    <DocumentReveal
                        text="You always know where your vehicle is,"
                        mode="word"
                        delay={10}
                        className="text-7xl font-black mb-6"
                        highlightWords={["know", "vehicle"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                    <DocumentReveal
                        text="and what’s happening next."
                        mode="word"
                        delay={50}
                        className="text-5xl font-black text-slate-700"
                        highlightWords={["happening next"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                </div>

                <div
                    className="flex flex-col items-center justify-center mt-8"
                    style={{ transform: `translateY(${interpolate(reveal, [0, 1], [40, 0])}px)`, opacity: reveal }}
                >
                    <div style={{ width: 300, height: 300 }}>
                        {lottieData && <Lottie animationData={lottieData} />}
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
