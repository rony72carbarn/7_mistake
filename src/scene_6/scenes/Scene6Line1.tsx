import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE6_LINE1_DUR,
    IMG_SECURE_PAYMENT,
    WARNING_RED,
} from "../constants";

export const Scene6Line1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const badgeScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const imgSlide = spring({
        frame: frame - 10,
        fps,
        config: { damping: 20 },
    });

    const lineWidth = interpolate(frame, [20, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
    });

    const contentOpacity = interpolate(
        frame,
        [SCENE6_LINE1_DUR - 10, SCENE6_LINE1_DUR],
        [1, 0],
        { extrapolateLeft: "clamp" }
    );

    return (
        <Scene4Wrapper duration={SCENE6_LINE1_DUR} bgOpacity={0.06} fadeOut={false}>
            <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
                <div className="w-full max-w-7xl flex items-center gap-16">
                    <div
                        className="flex-1 relative overflow-hidden"
                        style={{
                            opacity: imgSlide,
                            transform: `translateX(${interpolate(imgSlide, [0, 1], [-100, 0])}px)`,
                        }}
                    >
                        <Img
                            src={IMG_SECURE_PAYMENT}
                            className="w-full h-auto rounded-3xl shadow-2xl object-cover border-4 border-white/20"
                            style={{ filter: "brightness(0.9)", maxHeight: "600px" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                                className="text-[12rem]"
                                style={{
                                    opacity: interpolate(frame, [15, 35], [0, 1], {
                                        extrapolateRight: "clamp",
                                    }),
                                }}
                            >
                                💸
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-8 pr-4">
                        <div
                            className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg"
                            style={{
                                transform: `scale(${interpolate(badgeScale, [0, 1], [0.5, 1])})`,
                                opacity: badgeScale,
                            }}
                        >
                            <span className="text-white text-4xl font-black tracking-wider uppercase">
                                Mistake #6
                            </span>
                        </div>

                        <div
                            className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                            style={{
                                transform: `scaleX(${lineWidth})`,
                                transformOrigin: "left",
                                maxWidth: "500px",
                            }}
                        />

                        <div className="overflow-hidden">
                            <DocumentReveal
                                text="Ensobi ey’omukaaga: Okusasula nga"
                                mode="word"
                                delay={15}
                                className="text-6xl font-black leading-tight"
                                highlightWords={["ey’omukaaga", "Okusasula"]}
                                highlightColor={WARNING_RED}
                            />
                            <DocumentReveal
                                text="tewali nkola etegeerekeka ate nga esobola okulondolwa."
                                mode="word"
                                delay={65}
                                className="text-5xl mt-4"
                                highlightWords={["etegeerekeka", "okulondolwa"]}
                                highlightColor={WARNING_RED}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
