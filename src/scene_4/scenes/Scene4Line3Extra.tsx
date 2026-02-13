import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE4_LINE3_EXTRA_DUR,
    IMG_ORIGINALS_PAPERS,
    IMG_ORIGINALS_CUSTOMS,
    LOTTIE_VALIDATION,
    LOTTIE_SHIELD,
    LOTTIE_STAMP,
    LOTTIE_DOWNLOADING,
    CURRENT_REGION,
} from "../constants";

/**
 * Scene 4 - Line 3 Extra: Zambia ZCSA Roadworthiness Inspection
 * Specifically showing the pre-shipment inspection requirement
 */
export const Scene4Line3Extra: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieValidation = useLottie(LOTTIE_VALIDATION);
    const lottieShield = useLottie(LOTTIE_SHIELD);
    const lottieStamp = useLottie(LOTTIE_STAMP);
    const lottieDownload = useLottie(LOTTIE_DOWNLOADING);

    // Main container animation
    const containerSpring = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    const botswanaDocs = [
        { text: "SAD 500 (Customs)", delay: 20 },
        { text: "Police CID Clearance", delay: 80 },
        { text: "Commercial Invoice", delay: 140 },
    ];

    const zambiaDocs = [
        { text: "Pre-shipment Inspection", delay: 20 },
        { text: "ZCSA-Appointed Agents", delay: 60 },
        { text: "Roadworthiness Check", delay: 100 },
    ];

    const zimbabweDocs = [
        { text: "Commercial Invoice", delay: 20 },
        { text: "Bill of Lading", delay: 80 },
        { text: "ZIMRA Documents", delay: 140 },
    ];

    const ugandaDocs = [
        { text: "PVOC Certificate", delay: 20 },
        { text: "URA Customs Records", delay: 80 },
        { text: "Bill of Lading", delay: 140 },
    ];

    const docs = CURRENT_REGION === 'BOTSWANA' ? botswanaDocs : CURRENT_REGION === 'ZIMBABWE' ? zimbabweDocs : CURRENT_REGION === 'UGANDA' ? ugandaDocs : zambiaDocs;

    const exitFrame = SCENE4_LINE3_EXTRA_DUR - 15;
    const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE3_EXTRA_DUR], [0, 1], { extrapolateLeft: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const listExitX = interpolate(exitProgress, [0, 1], [0, -150]);
    const imgExitX = interpolate(exitProgress, [0, 1], [0, 100]);

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE3_EXTRA_DUR}
            bgImage={IMG_ORIGINALS_CUSTOMS}
            bgOpacity={0.1}
            fadeIn={true}
            fadeOut={false} // Element-driven exit
        >
            <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
                <div className="w-full max-w-5xl flex items-center gap-12">
                    {/* Left: Document Stack Visual (Inspection Focus) */}
                    <div
                        className="flex-1 relative"
                        style={{
                            opacity: containerSpring,
                            transform: `scale(${interpolate(containerSpring, [0, 1], [0.9, 1])}) translateX(${imgExitX}px)`,
                        }}
                    >
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        transform: `rotate(${i * 3 - 3}deg) translate(${i * 4}px, ${i * 4}px)`,
                                        opacity: interpolate(frame, [i * 20, i * 20 + 20], [0, 1], {
                                            extrapolateRight: "clamp",
                                        }),
                                    }}
                                >
                                    <Img
                                        src={IMG_ORIGINALS_PAPERS}
                                        className="w-80 h-auto rounded-xl shadow-xl border border-gray-200"
                                    />
                                </div>
                            ))}

                            {/* Shield overlay for security feel */}
                            <div
                                className="absolute -top-4 -right-4"
                                style={{
                                    width: 100,
                                    height: 100,
                                    opacity: interpolate(frame, [130, 240], [0, 1], { extrapolateRight: "clamp" })
                                }}
                            >
                                {lottieShield && <Lottie animationData={lottieShield} style={{ width: 100, height: 100 }} />}
                            </div>

                            {/* Verified Stamp for Zimbabwe */}
                            {CURRENT_REGION === 'ZIMBABWE' && (
                                <div
                                    className="absolute -bottom-8 -left-8"
                                    style={{
                                        width: 150,
                                        height: 150,
                                        opacity: interpolate(frame, [200, 220], [0, 1]),
                                        transform: `scale(${interpolate(frame, [200, 215], [2, 1], { extrapolateRight: "clamp" })}) rotate(-15deg)`,
                                    }}
                                >
                                    {lottieStamp && <Lottie animationData={lottieStamp} />}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Focused Vertical List */}
                    <div className="flex-1 flex flex-col justify-center space-y-8" style={{ transform: `translateX(${listExitX}px)` }}>
                        <h3 className="text-3xl font-light text-gray-500 uppercase tracking-widest pl-2">
                            {CURRENT_REGION === 'BOTSWANA' ? "BURS Requirements:" : CURRENT_REGION === 'ZIMBABWE' ? "Zvinodiwa neZIMRA:" : CURRENT_REGION === 'UGANDA' ? "Ebyetaagibwa URA:" : "Zambia Requirements:"}
                        </h3>

                        <div className="space-y-6">
                            {docs.map((doc, i) => {
                                const itemSpring = spring({
                                    frame: frame - doc.delay,
                                    fps,
                                    config: { damping: 12, stiffness: 200 },
                                });

                                return (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-6 p-4 rounded-2xl bg-white shadow-md border-l-8 ${CURRENT_REGION === 'BOTSWANA' ? 'border-blue-500' : (CURRENT_REGION === 'ZIMBABWE' || CURRENT_REGION === 'UGANDA') ? 'border-red-500' : 'border-yellow-500'}`}
                                        style={{
                                            opacity: itemSpring,
                                            transform: `translateX(${interpolate(itemSpring, [0, 1], [40, 0])}px)`,
                                        }}
                                    >
                                        <div className="w-12 h-12 flex-shrink-0">
                                            {(CURRENT_REGION === 'ZIMBABWE' || CURRENT_REGION === 'UGANDA') ? (
                                                lottieDownload && <Lottie animationData={lottieDownload} style={{ width: 48, height: 48 }} />
                                            ) : (
                                                lottieValidation && <Lottie animationData={lottieValidation} style={{ width: 48, height: 48 }} />
                                            )}
                                        </div>
                                        <span className="text-3xl font-bold text-gray-800">
                                            {doc.text}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Scene4Wrapper>
    );
};
