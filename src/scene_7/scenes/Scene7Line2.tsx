import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { MultiLineReveal } from "../../scene_4/components/DocumentReveal";
import {
    SCENE7_LINE2_DUR,
    IMG_CARBARN_DIFFERENT,
    TECH_BLUE,
    LOGO,
} from "../constants";

export const Scene7Line2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame: frame - 0,
        fps,
        config: { damping: 12 },
    });

    const exitFrame = SCENE7_LINE2_DUR - 12;
    const exitProgress = interpolate(frame, [exitFrame, SCENE7_LINE2_DUR], [0, 1], { extrapolateLeft: "clamp" });
    const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

    return (
        <Scene4Wrapper
            duration={SCENE7_LINE2_DUR}
            bg="transparent"
            bgImage={IMG_CARBARN_DIFFERENT}
            bgOpacity={0.06}
            fadeOut={false}
        >
            <div
                className="w-full h-full flex flex-col items-center justify-center gap-8"
                style={{ opacity: contentOpacity }}
            >
                <div style={{ transform: `scale(${scale})`, opacity: scale }}>
                    <Img src={LOGO} className="h-48 shadow-2xl" />
                </div>

                <div className="overflow-hidden bg-white/15 backdrop-blur-xl px-20 py-10 rounded-3xl border-2 border-blue-500/30 shadow-2xl">
                    <MultiLineReveal
                        lines={[
                            "ruzivo rutsva, neuchapupu",
                            "hwekuti zvinhu zviri kufamba.",
                        ]}
                        lineDelay={10}
                        mode="word"
                        className="text-7xl text-center"
                        highlightWords={["ruzivo", "uchapupu", "kufamba"]}
                        highlightColor={TECH_BLUE}
                    />

                </div>
            </div>
        </Scene4Wrapper>
    );
};
