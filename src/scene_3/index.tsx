import React from "react";
import { Series, AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Scene3Line1 } from "./scenes/Scene3Line1";
import { Scene3Line2 } from "./scenes/Scene3Line2";
import { Scene3Line3 } from "./scenes/Scene3Line3";
import { Scene3Line4 } from "./scenes/Scene3Line4";
import { Scene3Line5 } from "./scenes/Scene3Line5";
import { Scene3Line6 } from "./scenes/Scene3Line6";
import { Scene3Line7 } from "./scenes/Scene3Line7";
import {
    SCENE3_LINE1_DUR,
    SCENE3_LINE2_DUR,
    SCENE3_LINE3_DUR,
    SCENE3_LINE4_DUR,
    SCENE3_LINE5_DUR,
    SCENE3_LINE6_DUR,
    SCENE3_LINE7_DUR,
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

export const Scene3Composition: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
            <Audio src={staticFile("assets/global/scene_3_assets/script_audio.mp3")} />

            <Series>
                <Series.Sequence durationInFrames={SCENE3_LINE1_DUR}>
                    <Scene3Line1 fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE3_LINE2_DUR}>
                    <Scene3Line2 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE3_LINE3_DUR}>
                    <Scene3Line3 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE3_LINE4_DUR}>
                    <Scene3Line4 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE3_LINE5_DUR}>
                    <Scene3Line5 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE3_LINE6_DUR}>
                    <Scene3Line6 fadeIn={false} fadeOut={false} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE3_LINE7_DUR}>
                    <Scene3Line7 fadeIn={false} fadeOut={true} />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={30}>
                    <AbsoluteFill style={{ backgroundColor: BG_DARK }} />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

export * from "./constants";
export { Scene3Line1, Scene3Line2, Scene3Line3, Scene3Line4, Scene3Line5, Scene3Line6, Scene3Line7 };
