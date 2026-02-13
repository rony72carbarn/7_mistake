import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE7_LINE1_DUR,
    IMG_MISTAKE_INTRO,
    WARNING_RED,
} from "../constants";

export const Scene7Line1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const badgeScale = spring({
        frame: frame - 0,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const imgSlide = spring({
        frame: frame - 5,
        fps,
        config: { damping: 200 },
    });

    const lineWidth = interpolate(
        frame,
        [10, 30],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
        }
    );

    const exitFrame = SCENE7_LINE1_DUR - 10;
    const exitProgress = interpolate(frame, [exitFrame, SCENE7_LINE1_DUR], [0, 1], { extrapolateLeft: "clamp" });

    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

    return (
        <Scene4Wrapper
            duration={SCENE7_LINE1_DUR}
            bg="transparent"
            bgImage={IMG_MISTAKE_INTRO}
            bgOpacity={0.08}
            fadeOut={false}
        >
            <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
                <div className="w-full max-w-7xl flex items-center gap-12">
                    <div
                        className="flex-1 relative overflow-hidden"
                        style={{
                            opacity: imgSlide,
                            transform: `translateX(${interpolate(imgSlide, [0, 1], [-80, 0])}px)`,
                        }}
                    >
                        <Img
                            src={IMG_MISTAKE_INTRO}
                            className="w-full h-auto rounded-3xl shadow-2xl object-contain border-4 border-white/20"
                            style={{ filter: "brightness(0.9)", maxHeight: "600px" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                                className="text-9xl"
                                style={{
                                    opacity: interpolate(frame, [15, 35], [0, 1], {
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                ❌
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 pr-4">
                        <div
                            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"
                            style={{
                                transform: `scale(${interpolate(badgeScale, [0, 1], [0.5, 1])})`,
                                opacity: badgeScale,
                            }}
                        >
                            <span className="text-white text-3xl font-black tracking-wider">
                                MISTAKE #7
                            </span>
                        </div>

                        <div
                            className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                            style={{
                                transform: `scaleX(${lineWidth})`,
                                transformOrigin: "left",
                                maxWidth: "400px",
                            }}
                        />

                        <div className="overflow-hidden">
                            <DocumentReveal
                                text="Mhosho yechinomwe:"
                                mode="word"
                                delay={10}
                                className="text-6xl"
                                highlightWords={["Mhosho", "yechinomwe"]}
                                highlightColor={WARNING_RED}
                            />
                            <DocumentReveal
                                text="Kutenga usina kutevera"
                                mode="word"
                                delay={40}
                                className="text-5xl mt-4"
                                highlightWords={["kutevera"]}
                                highlightColor={WARNING_RED}
                            />
                            <DocumentReveal
                                text="(tracking),"
                                mode="word"
                                delay={70}
                                className="text-5xl"
                                highlightWords={["tracking"]}
                                highlightColor={WARNING_RED}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
