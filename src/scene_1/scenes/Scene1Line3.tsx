import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene1Wrapper } from "../components/Scene1Wrapper";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE1_LINE3_DUR,
    S1_IMG_02,
    LOT_ALERT,
} from "../constants";

export const Scene1Line3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_ALERT);

    const textSlide = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12 },
    });

    return (
        <Scene1Wrapper duration={SCENE1_LINE3_DUR} bgImage={S1_IMG_02}>
            <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-12">
                <div
                    className="flex flex-col gap-8 text-center"
                    style={{
                        transform: `translateY(${interpolate(textSlide, [0, 1], [50, 0])}px)`,
                        opacity: textSlide
                    }}
                >
                    <h2 className="text-7xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                        প্যারা শুরু <span className="text-red-500">আগেই!</span>
                    </h2>
                    <div className="w-80 h-80 self-center drop-shadow-2xl bg-white/10 rounded-full p-4 backdrop-blur-sm">
                        {lottieData && <Lottie animationData={lottieData} />}
                    </div>
                </div>
            </div>
        </Scene1Wrapper>
    );
};
