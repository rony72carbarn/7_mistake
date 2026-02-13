import React from "react";
import { Series, AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene6Line1 } from "./scenes/Scene6Line1";
import { Scene6Line2 } from "./scenes/Scene6Line2";
import { Scene6Line3 } from "./scenes/Scene6Line3";
import { Scene6Line4 } from "./scenes/Scene6Line4";
import { Scene6Line5 } from "./scenes/Scene6Line5";
import { Scene6Line6 } from "./scenes/Scene6Line6";
import {
    SCENE6_LINE1_DUR,
    SCENE6_LINE2_DUR,
    SCENE6_LINE3_DUR,
    SCENE6_LINE4_DUR,
    SCENE6_LINE5_DUR,
    SCENE6_LINE6_DUR,
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

/**
 * Scene 6 Composition: Paying without a clear process
 * Orchestrates the sequence of animations for the sixth mistake
 */
export const Scene6Composition: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-50">
            <Series>
                {/* Line 1: Mistake Intro */}
                {SCENE6_LINE1_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE6_LINE1_DUR}>
                        <Scene6Line1 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 2: Card transfer options part 1 */}
                {SCENE6_LINE2_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE6_LINE2_DUR}>
                        <Scene6Line2 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 3: Card transfer options part 2 */}
                {SCENE6_LINE3_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE6_LINE3_DUR}>
                        <Scene6Line3 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 4: Bank focus */}
                {SCENE6_LINE4_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE6_LINE4_DUR}>
                        <Scene6Line4 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 5: Confirmation */}
                {SCENE6_LINE5_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE6_LINE5_DUR}>
                        <Scene6Line5 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 6: Order Progress */}
                {SCENE6_LINE6_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE6_LINE6_DUR}>
                        <Scene6Line6 />
                    </Series.Sequence>
                )}
            </Series>
        </div>
    );
};

export * from "./constants";
