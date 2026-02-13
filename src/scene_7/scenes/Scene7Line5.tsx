import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
    SCENE7_LINE5_DUR,
    IMG_ALWAYS_KNOW,
    LOTTIE_SUCCESS,
    TECH_BLUE,
    LOGO,
} from "../constants";

export const Scene7Line5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOTTIE_SUCCESS);

    const slideIn = spring({
        frame: frame - 5,
        fps,
        config: { damping: 12 },
    });

    const exitFrame = SCENE7_LINE5_DUR - 15;
    const exitProgress = interpolate(frame, [exitFrame, SCENE7_LINE5_DUR], [0, 1], { extrapolateLeft: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0.8]);

    return (
        <Scene4Wrapper
            duration={SCENE7_LINE5_DUR}
            bg="transparent"
            bgImage={IMG_ALWAYS_KNOW}
            bgOpacity={0.06}
            fadeOut={false}
        >
            <div className="w-full h-full flex items-center justify-center p-8" style={{ opacity: contentOpacity }}>
                <div className="max-w-6xl w-full flex items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <DocumentReveal
                            text="Unogara uchiziva kuti"
                            mode="word"
                            delay={10}
                            className="text-7xl font-black"
                            highlightWords={["Unogara", "uchiziva"]}
                            highlightColor={TECH_BLUE}
                        />
                        <DocumentReveal
                            text="motokari yako iri kupi"
                            mode="word"
                            delay={35}
                            className="text-6xl font-bold"
                            highlightWords={["motokari", "kupi"]}
                            highlightColor={TECH_BLUE}
                        />
                        <DocumentReveal
                            text="uye chiri kutevera chii."
                            mode="word"
                            delay={60}
                            className="text-6xl font-bold"
                            highlightWords={["kutevera"]}
                            highlightColor={TECH_BLUE}
                        />
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-8">
                        {lottieData && (
                            <div
                                style={{
                                    width: 350,
                                    height: 350,
                                    opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }),
                                    transform: `scale(${interpolate(frame, [40, 60], [0.8, 1], { extrapolateRight: "clamp" })})`
                                }}
                            >
                                <Lottie animationData={lottieData} />
                            </div>
                        )}
                        <div
                            style={{
                                opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
                                transform: `scale(${interpolate(slideIn, [0, 1], [0.9, 1])})`
                            }}
                        >
                            <Img src={LOGO} className="h-32 shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
