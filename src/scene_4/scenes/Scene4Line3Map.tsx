import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE4_LINE3_MAP_DUR,
    IMG_ZAM_MAP,
    LOTTIE_CAR,
    TECH_BLUE,
    CURRENT_REGION,
    IMG_BOTS_MAP,
    IMG_ZIM_MAP,
    IMG_UGANDA_MAP,
    LOTTIE_PULSE,
} from "../constants";

/**
 * Scene 4 - Line 3 Map: Before the vehicle is used in Zambia
 * Shows Zambia map with a car animation moving across it
 */
export const Scene4Line3Map: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieCar = useLottie(LOTTIE_CAR);
    const lottiePulse = useLottie(LOTTIE_PULSE);

    // Map scale/fade animation
    const mapSpring = spring({
        frame,
        fps,
        config: { damping: 20 },
    });

    // Car movement along the map
    const carProgress = interpolate(frame, [10, SCENE4_LINE3_MAP_DUR - 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const carX = interpolate(carProgress, [0, 1], [-200, 200]);
    const carY = interpolate(carProgress, [0, 1], [50, -50]);
    const carScale = interpolate(carProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE3_MAP_DUR}
            bgImage={CURRENT_REGION === 'BOTSWANA' ? IMG_BOTS_MAP : CURRENT_REGION === 'ZIMBABWE' ? IMG_ZIM_MAP : CURRENT_REGION === 'UGANDA' ? IMG_UGANDA_MAP : IMG_ZAM_MAP}
            bgOpacity={0.2}
            fadeIn={true}
            fadeOut={false}
        >
            <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 relative overflow-hidden">
                {/* Regional Map Visual */}
                <div
                    className="absolute inset-0 flex items-center justify-center p-12"
                    style={{
                        opacity: mapSpring,
                        transform: `scale(${interpolate(mapSpring, [0, 1], [0.9, 1])})`,
                    }}
                >
                    <Img
                        src={CURRENT_REGION === 'BOTSWANA' ? IMG_BOTS_MAP : CURRENT_REGION === 'ZIMBABWE' ? IMG_ZIM_MAP : CURRENT_REGION === 'UGANDA' ? IMG_UGANDA_MAP : IMG_ZAM_MAP}
                        className="w-full h-full object-contain filter grayscale opacity-20"
                    />
                </div>

                {/* Pulsing Locator for Zimbabwe/Uganda */}
                {(CURRENT_REGION === 'ZIMBABWE' || CURRENT_REGION === 'UGANDA') && lottiePulse && (
                    <div
                        className="absolute"
                        style={{
                            top: CURRENT_REGION === 'UGANDA' ? "45%" : "60%",
                            left: CURRENT_REGION === 'UGANDA' ? "50%" : "55%",
                            width: 150,
                            height: 150,
                            opacity: interpolate(frame, [10, 30], [0, 1]),
                        }}
                    >
                        <Lottie animationData={lottiePulse} />
                    </div>
                )}

                {/* Floating Car Animation */}
                <div
                    className="relative z-10"
                    style={{
                        transform: `translate(${carX}px, ${carY}px) scale(${carScale})`,
                    }}
                >
                    {lottieCar && (
                        <div style={{ width: 250, height: 250 }}>
                            <Lottie animationData={lottieCar} style={{ width: 250, height: 250 }} />
                        </div>
                    )}
                </div>

                {/* Text Reveal */}
                <div className="absolute bottom-16 w-full text-center z-20">
                    <DocumentReveal
                        text={
                            CURRENT_REGION === 'BOTSWANA' ? "Mapodisi a Botswana a ntsha foromo ya BP17B." :
                                CURRENT_REGION === 'ZIMBABWE' ? "Wozoomerwa panguva yekubvisa motokari pabhodha." :
                                    CURRENT_REGION === 'UGANDA' ? "Wano e Uganda, ebiwandiiko bikulu nnyo." :
                                        "before the vehicle is used in Zambia."
                        }
                        mode="word"
                        delay={10}
                        className="text-4xl font-black"
                        highlightWords={
                            CURRENT_REGION === 'BOTSWANA' ? ["Mapodisi", "BP17B"] :
                                CURRENT_REGION === 'ZIMBABWE' ? ["motokari", "pabhodha"] :
                                    CURRENT_REGION === 'UGANDA' ? ["Uganda", "biwandiiko"] :
                                        ["used", "Zambia"]
                        }
                        highlightColor={TECH_BLUE}
                    />
                </div>
            </div>
        </Scene4Wrapper>
    );
};
