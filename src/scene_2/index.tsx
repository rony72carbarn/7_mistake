import React from "react";
import { Series, AbsoluteFill, Audio, staticFile } from "remotion";
import { Scene2Line1 } from "./scenes/Scene2Line1";
import { Scene2Line2 } from "./scenes/Scene2Line2";
import { Scene2Line3 } from "./scenes/Scene2Line3";
import { Scene2Line4 } from "./scenes/Scene2Line4";
import { Scene2Line5 } from "./scenes/Scene2Line5";
import {
    SCENE2_LINE1_DUR,
    SCENE2_LINE2_DUR,
    SCENE2_LINE3_DUR,
    SCENE2_LINE4_DUR,
    SCENE2_LINE5_DUR,
} from "./constants";

export const Scene2Composition: React.FC = () => {
    return (
        <AbsoluteFill>
            <Audio src={staticFile("assets/global/scene_2_assets/script_audio.mp3")} />

            <Series>
                <Series.Sequence durationInFrames={SCENE2_LINE1_DUR}>
                    <Scene2Line1 fadeOut={false} />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE2_LINE2_DUR}>
                    <Scene2Line2 fadeIn={false} fadeOut={false} />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE2_LINE3_DUR}>
                    <Scene2Line3 fadeIn={false} fadeOut={false} />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE2_LINE4_DUR}>
                    <Scene2Line4 fadeIn={false} fadeOut={false} />
                </Series.Sequence>

                <Series.Sequence durationInFrames={SCENE2_LINE5_DUR}>
                    <Scene2Line5 fadeIn={false} fadeOut={true} />
                </Series.Sequence>

                <Series.Sequence durationInFrames={30}>
                    <AbsoluteFill className="bg-[#020617]" />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};

export * from "./constants";
