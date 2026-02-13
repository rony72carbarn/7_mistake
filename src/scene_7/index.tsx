import React from "react";
import { Series, AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene7Line1 } from "./scenes/Scene7Line1";
import { Scene7Line2 } from "./scenes/Scene7Line2";
import { Scene7Line3 } from "./scenes/Scene7Line3";
import { Scene7Line4 } from "./scenes/Scene7Line4";
import { Scene7Line5 } from "./scenes/Scene7Line5";
import { Scene7Line6 } from "./scenes/Scene7Line6";
import {
    SCENE7_LINE1_DUR,
    SCENE7_LINE2_DUR,
    SCENE7_LINE3_DUR,
    SCENE7_LINE4_DUR,
    SCENE7_LINE5_DUR,
    SCENE7_LINE6_DUR,
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
 * Scene 7 Composition: Buying without tracking (Mistake #7)
 * Orchestrates the sequence of animations for the seventh mistake for Malawi
 */
export const Scene7Composition: React.FC = () => {
    return (
        <div className="w-full h-full bg-slate-50">
            <Series>
                {/* Line 1: Mistake Intro */}
                <Series.Sequence durationInFrames={SCENE7_LINE1_DUR}>
                    <Scene7Line1 />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Line 2: Carbarn Different */}
                <Series.Sequence durationInFrames={SCENE7_LINE2_DUR}>
                    <Scene7Line2 />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Line 3: No wait and hope */}
                <Series.Sequence durationInFrames={SCENE7_LINE3_DUR}>
                    <Scene7Line3 />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Line 4: Dashboard Tracking */}
                <Series.Sequence durationInFrames={SCENE7_LINE4_DUR}>
                    <Scene7Line4 />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Line 5: Shipping Stages - Only render if duration > 0 */}
                {SCENE7_LINE5_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE7_LINE5_DUR}>
                        <Scene7Line5 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 6: Real-time knowing - Only render if duration > 0 */}
                {SCENE7_LINE6_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE7_LINE6_DUR}>
                        <Scene7Line6 />
                    </Series.Sequence>
                )}
            </Series>
        </div>
    );
};

export * from "./constants";
