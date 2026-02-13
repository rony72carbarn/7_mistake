import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { MultiLineReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE5_LINE7_DUR,
    WARNING_RED,
    LOGO,
} from "../constants";

/**
 * Scene 5 - Line 7: Surtax Warning (Zambia)
 * "that surtax can apply."
 */
export const Scene5Line7: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Image scale in animation
    const imgScale = spring({
        frame: frame - 0,
        fps,
        config: { damping: 15, stiffness: 180 },
    });

    const exitFrame = SCENE5_LINE7_DUR - 12;
    const exitProgress = interpolate(frame, [exitFrame, SCENE5_LINE7_DUR], [0, 1], { extrapolateLeft: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const elementExitY = interpolate(exitProgress, [0, 1], [0, 150]);

    return (
        <Scene4Wrapper
            duration={SCENE5_LINE7_DUR}
            bg="#FFF5F5"
            fadeOut={false}
        >
            <div
                className="w-full h-full flex flex-col items-center justify-center px-8 py-8 gap-6"
                style={{ opacity: contentOpacity, transform: `translateY(${elementExitY}px)` }}
            >
                {/* Center: Warning Icon */}
                <div
                    className="text-9xl mb-4"
                    style={{
                        opacity: imgScale,
                        transform: `scale(${interpolate(imgScale, [0, 1], [0.5, 1])}) rotate(${interpolate(imgScale, [0, 1], [-20, 0])}deg)`,
                    }}
                >
                    🚩
                </div>

                {/* Text Reveal */}
                <div className="w-full max-w-4xl overflow-hidden">
                    <MultiLineReveal
                        lines={["that surtax can apply."]}
                        lineDelay={10}
                        mode="word"
                        className="text-7xl text-center font-black"
                        highlightWords={["surtax"]}
                        highlightColor={WARNING_RED}
                    />
                </div>

                {/* Small footer logo */}
                <div className="mt-8" style={{ opacity: interpolate(frame, [20, 40], [0, 0.6]) }}>
                    <Img src={LOGO} className="h-12" />
                </div>
            </div>
        </Scene4Wrapper>
    );
};
