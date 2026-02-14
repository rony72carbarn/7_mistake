import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene1Wrapper } from "../components/Scene1Wrapper";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE1_LINE2_DUR,
    S1_IMG_01,
    LOT_COMPLAIN,
} from "../constants";

export const Scene1Line2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_COMPLAIN);

    const textPop = spring({
        frame: frame - 15,
        fps,
        config: { stiffness: 150, damping: 10 },
    });

    return (
        <Scene1Wrapper duration={SCENE1_LINE2_DUR} bgImage={S1_IMG_01}>
            <div className="flex flex-col items-center justify-center w-full max-w-6xl gap-16 text-center">
                <div className="flex flex-col gap-10 items-center">
                    <div
                        style={{
                            transform: `scale(${textPop})`,
                            opacity: interpolate(frame, [15, 30], [0, 1])
                        }}
                    >
                        <h2 className="text-7xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                            জাপান গাড়ি <span className="text-blue-500">ইমপোর্ট?</span>
                        </h2>
                    </div>
                    <div className="w-96 h-96 drop-shadow-2xl">
                        {lottieData && <Lottie animationData={lottieData} />}
                    </div>
                </div>
            </div>
        </Scene1Wrapper>
    );
};
