import React from "react";
import { Series, AbsoluteFill, interpolate, useCurrentFrame, Audio, staticFile } from "remotion";
import { Scene1Line1 } from "./scenes/Scene1Line1";
import { Scene1Line2 } from "./scenes/Scene1Line2";
import { Scene1Line3 } from "./scenes/Scene1Line3";
import { Scene1Line4 } from "./scenes/Scene1Line4";
import { Scene1Line5 } from "./scenes/Scene1Line5";
import {
    SCENE1_LINE1_DUR,
    SCENE1_LINE2_DUR,
    SCENE1_LINE3_DUR,
    SCENE1_LINE4_DUR,
    SCENE1_LINE5_DUR,
} from "./constants";

const ShutterFlash: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 4, 12], [0, 0.9, 0], {
        extrapolateRight: "clamp",
    });
    return (
        <AbsoluteFill
            className="pointer-events-none z-[100] bg-white"
            style={{ opacity }}
        />
    );
};

export const Scene1Composition: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-50">
            <Audio src={staticFile("assets/global/scene_1_assets/script_audio.mp3")} />

            <Series>
                <Series.Sequence durationInFrames={SCENE1_LINE1_DUR}>
                    <Scene1Line1 />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE1_LINE2_DUR}>
                    <Scene1Line2 />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE1_LINE3_DUR}>
                    <Scene1Line3 />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE1_LINE4_DUR}>
                    <Scene1Line4 />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE1_LINE5_DUR}>
                    <Scene1Line5 />
                    <ShutterFlash />
                </Series.Sequence>
            </Series>
        </div>
    );
};

export * from "./constants";
