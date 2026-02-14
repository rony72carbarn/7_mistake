import React from "react";
import { Series, AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Scene4Line1 } from "./scenes/Scene4Line1";
import { Scene4Line2 } from "./scenes/Scene4Line2";
import { Scene4Line3 } from "./scenes/Scene4Line3";
import { Scene4Line4 } from "./scenes/Scene4Line4";
import { Scene4Line5 } from "./scenes/Scene4Line5";
import {
    SCENE4_LINE1_DUR,
    SCENE4_LINE2_DUR,
    SCENE4_LINE3_DUR,
    SCENE4_LINE4_DUR,
    SCENE4_LINE5_DUR,
    BG_DARK
} from "./constants";

const ShutterFlash: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 5, 15], [0, 0.8, 0], {
        extrapolateRight: "clamp",
    });
    return (
        <AbsoluteFill
            className="pointer-events-none z-[100] bg-white"
            style={{ opacity }}
        />
    );
};

export const Scene4Composition: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
            {/* AUDIO FIX: POINTING TO SCENE 4 AUDIO DIRECTLY */}
            <Audio src={staticFile("assets/global/scene_4_assets/script_audio.mp3")} />

            <Series>
                <Series.Sequence durationInFrames={SCENE4_LINE1_DUR}>
                    <Scene4Line1 fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE4_LINE2_DUR}>
                    <Scene4Line2 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE4_LINE3_DUR}>
                    <Scene4Line3 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE4_LINE4_DUR}>
                    <Scene4Line4 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE4_LINE5_DUR}>
                    <Scene4Line5 fadeIn={false} fadeOut={true} />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Final Buffer */}
                <Series.Sequence durationInFrames={30}>
                    <AbsoluteFill style={{ backgroundColor: BG_DARK }} />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
