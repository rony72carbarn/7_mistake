import React from "react";
import {
    AbsoluteFill,
    Img,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene8Wrapper } from "../components/Scene8Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE8_LINE4_DUR,
    IMG_DASHBOARD,
    IMG_DOCUMENTS,
    IMG_READY_TO_SHIP,
    LOTTIE_DASHBOARD,
    LOTTIE_DOWNLOAD,
    LOTTIE_SUCCESS,
    TECH_BLUE,
    ACCENT_CYAN,
    GOLD,
    SUCCESS_GREEN,
    TEXT_WHITE,
    LOGO,
} from "../constants";

/**
 * Scene 8 Line 4: "zm, check the reports, review the photos, and choose the car
 *                   that fits your budget and your needs."
 * Feature showcase with animated cards, progress bars, and staggered reveals
 */
export const Scene8Line4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieDashboard = useLottie(LOTTIE_DASHBOARD);
    const lottieDownload = useLottie(LOTTIE_DOWNLOAD);
    const lottieSuccess = useLottie(LOTTIE_SUCCESS);

    const pulse = Math.sin(frame * 0.1) * 0.5 + 0.5;

    // === PHASE 1: Domain completion + Website URL (0-40 frames) ===
    const domainReveal = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 250 },
    });

    // === PHASE 2: Feature cards stagger in (40-140 frames) ===
    const features = [
        { label: "Weekenneenye Alipoota", icon: "reports", img: IMG_DOCUMENTS, color: TECH_BLUE, delay: 40 },
        { label: "Ebifaananyi Ebijjuvu", icon: "photos", img: IMG_DASHBOARD, color: ACCENT_CYAN, delay: 70 },
        { label: "Oloonde Mmotoka", icon: "choose", img: IMG_READY_TO_SHIP, color: SUCCESS_GREEN, delay: 100 },
    ];

    // === PHASE 3: Budget & needs text (140-200 frames) ===
    const budgetReveal = spring({
        frame: frame - 140,
        fps,
        config: { damping: 200 },
    });

    // === EXIT ===
    const exitFrame = SCENE8_LINE4_DUR - 10;
    const exitProgress = interpolate(frame, [exitFrame, SCENE8_LINE4_DUR], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

    return (
        <Scene8Wrapper duration={SCENE8_LINE4_DUR} bg="transparent" fadeIn={false} fadeOut={false}>
            {/* Dark backdrop */}
            <AbsoluteFill
                style={{
                    background: "linear-gradient(135deg, #0A0E27 0%, #0D1B3E 40%, #0A1628 100%)",
                    opacity: contentOpacity,
                }}
            />

            {/* Animated grid lines */}
            <AbsoluteFill className="pointer-events-none overflow-hidden" style={{ opacity: contentOpacity * 0.15 }}>
                {[...Array(8)].map((_, i) => {
                    const lineProgress = interpolate(frame, [i * 15, i * 15 + 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                    return (
                        <div
                            key={i}
                            className="absolute h-px"
                            style={{
                                top: `${12 + i * 12}%`,
                                left: 0,
                                right: 0,
                                background: `linear-gradient(90deg, transparent, ${TECH_BLUE}, transparent)`,
                                transform: `scaleX(${lineProgress})`,
                                opacity: 0.5,
                            }}
                        />
                    );
                })}
            </AbsoluteFill>

            <div className="w-full h-full flex flex-col items-center justify-center px-16 gap-8" style={{ opacity: contentOpacity }}>
                {/* Domain URL bar at top */}
                <div
                    className="flex items-center gap-4 px-8 py-4 rounded-2xl"
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        transform: `scale(${interpolate(domainReveal, [0, 1], [0.8, 1])}) translateY(${interpolate(domainReveal, [0, 1], [-30, 0])}px)`,
                        opacity: domainReveal,
                    }}
                >
                    <div className="w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: "0 0 8px rgba(52,199,89,0.5)" }} />
                    <span
                        className="text-4xl font-black tracking-tight"
                        style={{
                            background: `linear-gradient(90deg, ${GOLD}, ${ACCENT_CYAN})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        www.carbarn.ug
                    </span>
                    <Img src={LOGO} className="h-10 ml-4" style={{ opacity: 0.9 }} />
                </div>

                {/* Feature cards row */}
                <div className="flex gap-8 w-full max-w-6xl">
                    {features.map((feat, i) => {
                        const cardSpring = spring({
                            frame: frame - feat.delay,
                            fps,
                            config: { damping: 12, stiffness: 180 },
                        });

                        const cardHover = Math.sin(frame * 0.06 + i * 2) * 5;
                        const lottieForCard = i === 0 ? lottieDashboard : i === 1 ? lottieDownload : lottieSuccess;

                        return (
                            <div
                                key={i}
                                className="flex-1 rounded-2xl overflow-hidden relative"
                                style={{
                                    transform: `translateY(${interpolate(cardSpring, [0, 1], [80, cardHover])}px) scale(${interpolate(cardSpring, [0, 1], [0.7, 1])})`,
                                    opacity: cardSpring,
                                }}
                            >
                                {/* Card glow */}
                                <div
                                    className="absolute -inset-1 rounded-2xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${feat.color}40, transparent)`,
                                        filter: "blur(15px)",
                                        opacity: 0.5 + pulse * 0.2,
                                    }}
                                />

                                <div
                                    className="relative rounded-2xl overflow-hidden"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        border: `1px solid ${feat.color}30`,
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    {/* Card image */}
                                    <div className="relative h-44 overflow-hidden">
                                        <Img
                                            src={feat.img}
                                            className="w-full h-full object-cover"
                                            style={{
                                                transform: `scale(${1 + interpolate(frame, [feat.delay, feat.delay + 120], [0, 0.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(to top, rgba(10,14,39,0.9) 0%, transparent 60%)`,
                                            }}
                                        />

                                        {/* Lottie icon */}
                                        {lottieForCard && (
                                            <div
                                                className="absolute bottom-3 right-3"
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    opacity: interpolate(frame, [feat.delay + 20, feat.delay + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                                                }}
                                            >
                                                <Lottie animationData={lottieForCard} style={{ width: 50, height: 50 }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Card label */}
                                    <div className="p-5">
                                        <span
                                            className="text-2xl font-bold"
                                            style={{ color: feat.color }}
                                        >
                                            {feat.label}
                                        </span>

                                        {/* Animated progress bar */}
                                        <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${interpolate(frame, [feat.delay + 30, feat.delay + 80], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                                                    background: `linear-gradient(90deg, ${feat.color}, ${feat.color}80)`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom text: Budget & Needs */}
                <div
                    style={{
                        opacity: budgetReveal,
                        transform: `translateY(${interpolate(budgetReveal, [0, 1], [30, 0])}px)`,
                    }}
                >
                    <DocumentReveal
                        text="Ekola mu nsawo yo n’ebyo by’oyagala."
                        delay={145}
                        color={TEXT_WHITE}
                        className="text-4xl text-center"
                        highlightWords={["nsawo", "by’oyagala"]}
                        highlightColor={GOLD}
                    />
                </div>
            </div>
        </Scene8Wrapper>
    );
};
