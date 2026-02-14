import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene1Wrapper } from "../components/Scene1Wrapper";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE1_LINE5_DUR,
    S1_IMG_04,
    LOT_BADGE,
    LOT_HIGH_FIVE,
} from "../constants";

export const Scene1Line5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_HIGH_FIVE);
    const badgeData = useLottie(LOT_BADGE);

    const step2Frame = 45; // Kept as it's used by show2
    const step3Frame = 90;

    const show1 = spring({ frame, fps, config: { damping: 20 } });
    const show2 = spring({ frame: frame - step2Frame, fps, config: { damping: 20 } });
    const show3 = spring({ frame: frame - step3Frame, fps, config: { damping: 20 } });

    // Added slideUp for the new h2 animation
    const slideUp = spring({
        frame: frame - 10,
        fps,
        config: {
            damping: 200,
            stiffness: 100,
            mass: 0.5,
        },
    });

    const textFade = interpolate(frame, [10, 30], [0, 1]);

    return (
        <Scene1Wrapper duration={SCENE1_LINE5_DUR} bgImage={S1_IMG_04}>
            <div className="flex flex-col items-center justify-center w-full h-full gap-12">
                <div
                    className="text-center"
                    style={{
                        opacity: textFade,
                        transform: `translateY(${interpolate(slideUp, [0, 1], [50, 0])}px)`
                    }}
                >
                    <h2 className="text-6xl font-black text-white drop-shadow-2xl mb-4">
                        টপ ৭ মিস্টেক সল্যুশন
                    </h2>
                    <div className="bg-blue-600 text-white px-8 py-2 rounded-full text-4xl font-black inline-block shadow-xl">
                        With Carbarn
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-12 w-full px-12">
                    {/* Step 1: Solution */}
                    <div className="flex flex-col items-center gap-6 p-8 bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md" style={{ opacity: show1, transform: `scale(${show1})` }}>
                        <div className="w-32 h-32">
                            {badgeData && <Lottie animationData={badgeData} />}
                        </div>
                        <span className="text-3xl font-black text-blue-700">সিম্পল প্রসেস</span>
                    </div>

                    {/* Step 2: Simple */}
                    <div className="flex flex-col items-center gap-6 p-8 bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md" style={{ opacity: show2, transform: `scale(${show2})` }}>
                        <Img src={S1_IMG_04} className="w-48 rounded-lg shadow-sm" />
                        <span className="font-black text-2xl text-gray-800">Easy Steps</span>
                    </div>

                    {/* Step 3: Transparent */}
                    <div className="flex flex-col items-center gap-6 p-8 bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md" style={{ opacity: show3, transform: `scale(${show3})` }}>
                        <Img src={S1_IMG_04} className="w-48 rounded-lg shadow-sm" />
                        <span className="font-black text-2xl text-gray-800">Safe Choice</span>
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 w-40 h-40">
                    {lottieData && <Lottie animationData={lottieData} />}
                </div>
            </div>
        </Scene1Wrapper>
    );
};
