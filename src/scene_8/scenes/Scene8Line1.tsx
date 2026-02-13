import React from "react";
import {
    AbsoluteFill,
    Img,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Easing,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
    SCENE8_LINE1_DUR,
    IMG_DASHBOARD,
    LOTTIE_CAR,
    TECH_BLUE,
    ACCENT_CYAN,
    TEXT_WHITE,
    GOLD,
    LOGO,
} from "../constants";

/**
 * Scene 8 Line 1: "To browse available cars right now, visit www."
 * Motion graphics style: Energetic intro with pulsing rings, sliding panels, and glowing URL
 */
export const Scene8Line1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOTTIE_CAR);

    // === ENTRANCE ANIMATIONS ===
    const heroScale = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 180 },
    });

    const panelSlide = spring({
        frame: frame - 8,
        fps,
        config: { damping: 15, stiffness: 200 },
    });

    const textReveal = spring({
        frame: frame - 15,
        fps,
        config: { damping: 200 },
    });

    const urlGlow = spring({
        frame: frame - 40,
        fps,
        config: { damping: 10, stiffness: 150 },
    });

    // === CONTINUOUS MOTION ===
    const pulse = Math.sin(frame * 0.15) * 0.5 + 0.5;
    const ringRotation = interpolate(frame, [0, SCENE8_LINE1_DUR], [0, 180]);

    // === EXIT ===
    const exitFrame = SCENE8_LINE1_DUR - 8;
    const exitProgress = interpolate(frame, [exitFrame, SCENE8_LINE1_DUR], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const contentScale = interpolate(exitProgress, [0, 1], [1, 0.95]);

    return (
        <Scene4Wrapper duration={SCENE8_LINE1_DUR} bg="transparent" fadeOut={false}>
            {/* Dark premium gradient backdrop */}
            <AbsoluteFill
                style={{
                    background: "linear-gradient(135deg, #0A0E27 0%, #0D1B3E 40%, #0A1628 100%)",
                    opacity: contentOpacity,
                }}
            />

            {/* Animated concentric rings */}
            <AbsoluteFill className="pointer-events-none" style={{ opacity: contentOpacity }}>
                {[0, 1, 2].map((i) => {
                    const ringScale = spring({
                        frame: frame - i * 8,
                        fps,
                        config: { damping: 20, stiffness: 100 },
                    });
                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: "50%",
                                top: "50%",
                                width: 400 + i * 200,
                                height: 400 + i * 200,
                                borderRadius: "50%",
                                border: `2px solid rgba(0, 82, 255, ${0.15 - i * 0.04})`,
                                transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${ringRotation + i * 30}deg)`,
                                opacity: 0.6 - i * 0.15,
                            }}
                        />
                    );
                })}
            </AbsoluteFill>

            {/* Floating light orbs */}
            <AbsoluteFill className="pointer-events-none" style={{ opacity: contentOpacity * 0.6 }}>
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: 60 + i * 20,
                            height: 60 + i * 20,
                            background: `radial-gradient(circle, ${i % 2 === 0 ? ACCENT_CYAN : TECH_BLUE} 0%, transparent 70%)`,
                            left: `${20 + i * 20}%`,
                            top: `${30 + Math.sin(frame * 0.05 + i * 2) * 15}%`,
                            filter: "blur(20px)",
                            opacity: 0.4 + pulse * 0.3,
                        }}
                    />
                ))}
            </AbsoluteFill>

            {/* Main content */}
            <div
                className="w-full h-full flex items-center justify-center px-16"
                style={{ opacity: contentOpacity, transform: `scale(${contentScale})` }}
            >
                <div className="w-full max-w-7xl flex items-center gap-16">
                    {/* Left: Dashboard image with glow frame */}
                    <div
                        className="flex-1 relative"
                        style={{
                            opacity: panelSlide,
                            transform: `translateX(${interpolate(panelSlide, [0, 1], [-120, 0])}px) perspective(1000px) rotateY(${interpolate(panelSlide, [0, 1], [15, 0])}deg)`,
                        }}
                    >
                        {/* Glow behind image */}
                        <div
                            className="absolute -inset-4 rounded-3xl"
                            style={{
                                background: `linear-gradient(135deg, ${TECH_BLUE}, ${ACCENT_CYAN})`,
                                filter: "blur(30px)",
                                opacity: 0.3 + pulse * 0.15,
                            }}
                        />
                        <Img
                            src={IMG_DASHBOARD}
                            className="w-full rounded-2xl relative z-10"
                            style={{
                                boxShadow: `0 20px 60px rgba(0, 82, 255, 0.3), 0 0 ${20 + pulse * 10}px rgba(0, 212, 255, 0.2)`,
                            }}
                        />

                        {/* Lottie car icon overlay */}
                        {lottieData && (
                            <div
                                className="absolute -bottom-6 -right-6 z-20 bg-white rounded-2xl p-3 shadow-2xl"
                                style={{
                                    transform: `scale(${interpolate(heroScale, [0, 1], [0, 1])})`,
                                    opacity: heroScale,
                                }}
                            >
                                <Lottie
                                    animationData={lottieData}
                                    style={{ width: 80, height: 80 }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Right: Text content */}
                    <div
                        className="flex-1 space-y-8"
                        style={{
                            opacity: textReveal,
                            transform: `translateY(${interpolate(textReveal, [0, 1], [40, 0])}px)`,
                        }}
                    >
                        {/* Logo */}
                        <div
                            style={{
                                opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                                transform: `translateY(${interpolate(frame, [5, 20], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                            }}
                        >
                            <Img src={LOGO} className="h-16" />
                        </div>

                        <DocumentReveal
                            text="Okulaba mmotoka eziriyo kati,"
                            mode="word"
                            delay={15}
                            color={TEXT_WHITE}
                            className="text-5xl"
                            highlightWords={["Okulaba", "mmotoka"]}
                            highlightColor={ACCENT_CYAN}
                        />

                        {/* Animated "visit www." with glow */}
                        <div
                            style={{
                                opacity: urlGlow,
                                transform: `scale(${interpolate(urlGlow, [0, 1], [0.8, 1])})`,
                            }}
                        >
                            <span
                                className="text-6xl font-black tracking-tight"
                                style={{
                                    color: GOLD,
                                    textShadow: `0 0 ${15 + pulse * 10}px rgba(255, 184, 0, 0.5)`,
                                }}
                            >
                                genda ku www.
                            </span>
                        </div>

                        {/* Animated underline */}
                        <div
                            className="h-1 rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${TECH_BLUE}, ${ACCENT_CYAN}, ${GOLD})`,
                                transform: `scaleX(${interpolate(frame, [50, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) })})`,
                                transformOrigin: "left",
                            }}
                        />
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
