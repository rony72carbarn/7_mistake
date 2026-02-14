import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene1Wrapper } from "../components/Scene1Wrapper";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE1_LINE1_DUR,
    S1_IMG_00,
    LOT_CAR,
    TECH_BLUE,
} from "../constants";

export const Scene1Line1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_CAR);

    const slideUp = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

    const textPop = spring({
        frame: frame - 10,
        fps,
        config: { stiffness: 200, damping: 12 },
    });

    return (
        <Scene1Wrapper duration={SCENE1_LINE1_DUR} bgImage={S1_IMG_00}>
            <div className="flex flex-col items-center justify-center w-full h-full gap-12">
                <div
                    className="relative z-20"
                    style={{
                        transform: `scale(${textPop})`,
                        opacity: fadeIn,
                    }}
                >
                    <h1
                        className="text-8xl font-black text-center drop-shadow-[0_5px_15px_rgba(255,255,255,0.4)] text-white"
                        style={{
                            color: TECH_BLUE,
                            WebkitTextStroke: "2px white",
                        }}
                    >
                        হোয়াটস আপ গাইজ!
                    </h1>
                </div>

                <div className="relative">
                    <div
                        className="w-96 h-96"
                        style={{
                            transform: `translateY(${interpolate(slideUp, [0, 1], [100, 0])}px)`,
                        }}
                    >
                        {lottieData && <Lottie animationData={lottieData} />}
                    </div>
                </div>
            </div>
        </Scene1Wrapper>
    );
};
