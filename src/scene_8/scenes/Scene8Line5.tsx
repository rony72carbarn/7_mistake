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
    SCENE8_LINE5_DUR,
    IMG_SHIPPED,
    IMG_ARRIVED,
    LOTTIE_SHIPPING,
    LOTTIE_SUCCESS,
    LOTTIE_TROPHY,
    LOTTIE_THUMBS_UP,
    TECH_BLUE,
    ACCENT_CYAN,
    GOLD,
    SUCCESS_GREEN,
    TEXT_WHITE,
    LOGO,
} from "../constants";

/**
 * Scene 8 Line 5: "And if you have questions, contact Carbarn Zambia — and we'll
 *                   guide you step by step, from Japan to Zambia."
 * Combined contact CTA + journey finale (longer duration: 235 frames)
 */
export const Scene8Line5: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieShipping = useLottie(LOTTIE_SHIPPING);
    const lottieSuccess = useLottie(LOTTIE_SUCCESS);
    const lottieTrophy = useLottie(LOTTIE_TROPHY);
    const lottieThumbsUp = useLottie(LOTTIE_THUMBS_UP);

    const pulse = Math.sin(frame * 0.12) * 0.5 + 0.5;

    // === PHASE 1: Contact CTA (0-100 frames) ===
    const logoReveal = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 150 },
    });

    const contactBadge = spring({
        frame: frame - 25,
        fps,
        config: { damping: 8, stiffness: 200 },
    });

    // Spinning ring behind logo
    const ringRotation = interpolate(frame, [0, SCENE8_LINE5_DUR], [0, 360]);

    // === PHASE 2: Journey path (80-180 frames) ===
    const pathDraw = interpolate(frame, [80, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad),
    });

    const japanReveal = spring({
        frame: frame - 75,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    const shipMove = interpolate(frame, [90, 160], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad),
    });

    const zambiaReveal = spring({
        frame: frame - 140,
        fps,
        config: { damping: 12, stiffness: 200 },
    });

    // === PHASE 3: Final logo + trophy (180+) ===
    const finalLogoScale = spring({
        frame: frame - 175,
        fps,
        config: { damping: 10, stiffness: 150 },
    });

    const trophyReveal = spring({
        frame: frame - 190,
        fps,
        config: { damping: 8, stiffness: 180 },
    });

    // === EXIT ===
    const exitFrame = SCENE8_LINE5_DUR - 15;
    const exitProgress = interpolate(frame, [exitFrame, SCENE8_LINE5_DUR], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

    // Phase transitions: contact fades as journey appears
    const contactOpacity = interpolate(frame, [90, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const journeyOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <Scene4Wrapper duration={SCENE8_LINE5_DUR} bg="transparent" fadeIn={false} fadeOut={false}>
            {/* Deep navy gradient */}
            <AbsoluteFill
                style={{
                    background: "linear-gradient(180deg, #0A0E27 0%, #0B1A40 40%, #0D2355 70%, #050810 100%)",
                    opacity: contentOpacity,
                }}
            />

            {/* Particle field */}
            <AbsoluteFill className="pointer-events-none" style={{ opacity: contentOpacity * 0.35 }}>
                {[...Array(25)].map((_, i) => {
                    const particleY = (frame * (0.3 + i * 0.04) + i * 40) % 120 - 10;
                    const particleOpacity = interpolate(particleY, [-10, 10, 100, 120], [0, 0.5, 0.5, 0]);
                    return (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 2 + (i % 3) * 2,
                                height: 2 + (i % 3) * 2,
                                left: `${(i * 37 + 5) % 100}%`,
                                top: `${particleY}%`,
                                backgroundColor: i % 3 === 0 ? ACCENT_CYAN : i % 3 === 1 ? GOLD : TEXT_WHITE,
                                opacity: particleOpacity,
                                boxShadow: `0 0 4px ${i % 2 === 0 ? ACCENT_CYAN : GOLD}`,
                            }}
                        />
                    );
                })}
            </AbsoluteFill>

            <div className="w-full h-full flex flex-col items-center justify-center px-16 gap-5" style={{ opacity: contentOpacity }}>

                {/* PHASE 1: Contact CTA section */}
                <div
                    className="flex flex-col items-center gap-5"
                    style={{ opacity: contactOpacity }}
                >
                    {/* Logo with spinning ring */}
                    <div
                        className="relative"
                        style={{
                            transform: `scale(${interpolate(logoReveal, [0, 1], [0.3, 1])})`,
                            opacity: logoReveal,
                        }}
                    >
                        <div
                            className="absolute -inset-6 rounded-full"
                            style={{
                                border: `3px solid transparent`,
                                borderTopColor: ACCENT_CYAN,
                                borderRightColor: GOLD,
                                transform: `rotate(${ringRotation}deg)`,
                                opacity: 0.6,
                            }}
                        />
                        <div
                            className="absolute -inset-3 rounded-full"
                            style={{
                                background: `radial-gradient(circle, rgba(0,82,255,0.2) 0%, transparent 70%)`,
                                filter: "blur(12px)",
                                opacity: 0.5 + pulse * 0.3,
                            }}
                        />
                        <Img
                            src={LOGO}
                            className="relative z-10"
                            style={{
                                height: 80,
                                filter: `drop-shadow(0 0 15px rgba(0,82,255,0.4))`,
                            }}
                        />
                    </div>

                    {/* Contact badge */}
                    <div
                        className="flex items-center gap-5 px-8 py-4 rounded-2xl"
                        style={{
                            background: `linear-gradient(135deg, ${TECH_BLUE}20, ${ACCENT_CYAN}10)`,
                            border: `2px solid ${TECH_BLUE}40`,
                            backdropFilter: "blur(20px)",
                            transform: `scale(${interpolate(contactBadge, [0, 1], [0.5, 1])})`,
                            opacity: contactBadge,
                            boxShadow: `0 0 ${25 + pulse * 10}px rgba(0,82,255,0.2)`,
                        }}
                    >
                        {lottieThumbsUp && (
                            <div style={{ width: 55, height: 55 }}>
                                <Lottie animationData={lottieThumbsUp} style={{ width: 55, height: 55 }} />
                            </div>
                        )}
                        <span
                            className="text-4xl font-black"
                            style={{
                                background: `linear-gradient(90deg, ${GOLD}, ${TEXT_WHITE})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Kubira Carbarn Uganda
                        </span>
                    </div>
                </div>

                {/* PHASE 2: Journey text + visualization */}
                <div
                    className="w-full flex flex-col items-center gap-4"
                    style={{ opacity: journeyOpacity }}
                >
                    <DocumentReveal
                        text="Tujja kukukulembera mutendera ku mutendera, okuva e Japan paka ku 'address' yo e Uganda."
                        mode="word"
                        delay={75}
                        color={TEXT_WHITE}
                        className="text-4xl text-center"
                        highlightWords={["kukukulembera", "mutendera", "Japan", "Uganda"]}
                        highlightColor={ACCENT_CYAN}
                    />

                    {/* Journey visualization */}
                    <div className="w-full max-w-4xl relative" style={{ height: 160 }}>
                        {/* Journey line */}
                        <div
                            className="absolute top-1/2 h-1 rounded-full"
                            style={{
                                left: "10%",
                                right: "10%",
                                transform: "translateY(-50%)",
                                background: `linear-gradient(90deg, ${TECH_BLUE}, ${ACCENT_CYAN}, ${GOLD}, ${SUCCESS_GREEN})`,
                                transformOrigin: "left",
                                clipPath: `inset(0 ${(1 - pathDraw) * 100}% 0 0)`,
                            }}
                        />

                        {/* Animated dots */}
                        {[0, 0.25, 0.5, 0.75, 1].map((pos, i) => {
                            const dotVisible = pathDraw > pos;
                            const dotSpring = spring({
                                frame: frame - (80 + pos * 70),
                                fps,
                                config: { damping: 8, stiffness: 200 },
                            });
                            return (
                                <div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${10 + pos * 80}%`,
                                        top: "50%",
                                        width: 14,
                                        height: 14,
                                        transform: `translate(-50%, -50%) scale(${dotVisible ? dotSpring : 0})`,
                                        background: i === 4 ? SUCCESS_GREEN : ACCENT_CYAN,
                                        boxShadow: `0 0 10px ${i === 4 ? SUCCESS_GREEN : ACCENT_CYAN}`,
                                    }}
                                />
                            );
                        })}

                        {/* Japan label */}
                        <div
                            className="absolute flex flex-col items-center"
                            style={{
                                left: "10%",
                                top: "5%",
                                transform: `translate(-50%, 0) scale(${interpolate(japanReveal, [0, 1], [0.5, 1])})`,
                                opacity: japanReveal,
                            }}
                        >
                            <Img
                                src={IMG_SHIPPED}
                                className="w-16 h-16 rounded-xl object-cover mb-1"
                                style={{ boxShadow: `0 0 15px rgba(0,82,255,0.3)` }}
                            />
                            <span className="text-xl font-black" style={{ color: ACCENT_CYAN }}>Japan</span>
                        </div>

                        {/* Ship moving */}
                        {lottieShipping && (
                            <div
                                className="absolute"
                                style={{
                                    left: `${10 + shipMove * 80}%`,
                                    top: "50%",
                                    width: 50,
                                    height: 50,
                                    transform: `translate(-50%, -80%)`,
                                    opacity: interpolate(frame, [90, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                                }}
                            >
                                <Lottie animationData={lottieShipping} style={{ width: 50, height: 50 }} />
                            </div>
                        )}

                        {/* Zambia label */}
                        <div
                            className="absolute flex flex-col items-center"
                            style={{
                                right: "10%",
                                top: "5%",
                                transform: `translate(50%, 0) scale(${interpolate(zambiaReveal, [0, 1], [0.5, 1])})`,
                                opacity: zambiaReveal,
                            }}
                        >
                            <Img
                                src={IMG_ARRIVED}
                                className="w-16 h-16 rounded-xl object-cover mb-1"
                                style={{ boxShadow: `0 0 15px rgba(0,200,83,0.3)` }}
                            />
                            <span className="text-xl font-black" style={{ color: SUCCESS_GREEN }}>Uganda</span>
                        </div>
                    </div>
                </div>

                {/* PHASE 3: Final logo + trophy */}
                <div className="flex items-center gap-6">
                    <div
                        style={{
                            transform: `scale(${interpolate(finalLogoScale, [0, 1], [0.3, 1])})`,
                            opacity: finalLogoScale,
                        }}
                    >
                        <Img
                            src={LOGO}
                            style={{
                                height: 70,
                                filter: `drop-shadow(0 0 ${12 + pulse * 8}px rgba(0,82,255,0.5))`,
                            }}
                        />
                    </div>

                    {lottieTrophy && (
                        <div
                            style={{
                                width: 70,
                                height: 70,
                                transform: `scale(${interpolate(trophyReveal, [0, 1], [0, 1.2])})`,
                                opacity: trophyReveal,
                            }}
                        >
                            <Lottie animationData={lottieTrophy} style={{ width: 70, height: 70 }} />
                        </div>
                    )}

                    {lottieSuccess && (
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                opacity: interpolate(frame, [200, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                            }}
                        >
                            <Lottie animationData={lottieSuccess} style={{ width: 50, height: 50 }} />
                        </div>
                    )}
                </div>

                {/* Website URL bottom tag */}
                <div
                    className="px-8 py-3 rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${TECH_BLUE}30, ${ACCENT_CYAN}20)`,
                        border: `1px solid ${ACCENT_CYAN}30`,
                        opacity: interpolate(frame, [185, 205], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                        transform: `translateY(${interpolate(frame, [185, 205], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                    }}
                >
                    <span className="text-2xl font-bold" style={{ color: GOLD }}>
                        www.carbarn.ug
                    </span>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
