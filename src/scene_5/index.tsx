import React from "react";
import {
    Series,
    AbsoluteFill,
    Audio,
    staticFile,
    useCurrentFrame,
    interpolate,
} from "remotion";
import { z } from "zod";

import { Scene5Schema } from "./schema";
import { Scene5Line1 } from "./scenes/Scene5Line1";
import { Scene5Line2 } from "./scenes/Scene5Line2";
import { Scene5Line3 } from "./scenes/Scene5Line3";
import { Scene5Line4 } from "./scenes/Scene5Line4";
import { Scene5Line5 } from "./scenes/Scene5Line5";

import { BG_DARK } from "./constants";

/* ---------------- SHUTTER FLASH ---------------- */

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

/* ---------------- SCENE 5 ---------------- */

export const Scene5Composition: React.FC<
    z.infer<typeof Scene5Schema>
> = (props) => {
    const { durations } = props;

    return (
        <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
            <Audio src={staticFile("assets/global/scene_5_assets/script_audio.mp3")} />

            <Series>
                <Series.Sequence durationInFrames={durations.line1}>
                    <Scene5Line1
                        fadeOut={false}
                        text={props.line1Text}
                        highlights={props.line1Highlights}
                        color={props.line1Color}
                        bgImage={props.bgImage1}
                        lotAlert={props.lotAlert}
                    />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={durations.line2}>
                    <Scene5Line2
                        fadeIn={false}
                        fadeOut={false}
                        text={props.line2Text}
                        highlights={props.line2Highlights}
                        color={props.line2Color}
                        subText={props.line2SubText}
                        bgImage={props.bgImage2}
                    />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={durations.line3}>
                    <Scene5Line3
                        fadeIn={false}
                        fadeOut={false}
                        text={props.line3Text}
                        highlights={props.line3Highlights}
                        color={props.line3Color}
                        bgImage={props.bgImage3}
                    />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={durations.line4}>
                    <Scene5Line4
                        fadeIn={false}
                        fadeOut={false}
                        text={props.line4Text}
                        highlights={props.line4Highlights}
                        color={props.line4Color}
                        subText={props.line4SubText}
                        bgImage={props.bgImage4}
                    />
                    <ShutterFlash />
                </Series.Sequence>

                <Series.Sequence durationInFrames={durations.line5}>
                    <Scene5Line5
                        fadeIn={false}
                        fadeOut={true}
                        text={props.line5Text}
                        highlights={props.line5Highlights}
                        color={props.line5Color}
                        subText={props.line5SubText}
                        bgImage={props.bgImage5}
                        lotCheck={props.lotCheck}
                    />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Final buffer */}
                <Series.Sequence durationInFrames={30}>
                    <AbsoluteFill style={{ backgroundColor: BG_DARK }} />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
