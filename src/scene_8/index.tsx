import React from "react";
import { Series, AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene8Line1 } from "./scenes/Scene8Line1";
import { Scene8Line2 } from "./scenes/Scene8Line2";
import { Scene8Line3 } from "./scenes/Scene8Line3";
import { Scene8Line4 } from "./scenes/Scene8Line4";
import { Scene8Line5 } from "./scenes/Scene8Line5";
import {
    SCENE8_LINE1_DUR,
    SCENE8_LINE2_DUR,
    SCENE8_LINE3_DUR,
    SCENE8_LINE4_DUR,
    SCENE8_LINE5_DUR,
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
 * Scene 8 Composition: Outro / Call-to-Action
 * Highly animated motion graphics style with dark premium theme
 * Orchestrates: website CTA → domain reveal → features → contact → journey finale
 */
export const Scene8Composition: React.FC = () => {
    return (
        <div className="w-full h-full bg-[#0A0E27]">
            <Series>
                {/* Line 1: "To browse available cars right now, visit www." */}
                <Series.Sequence durationInFrames={SCENE8_LINE1_DUR}>
                    <Scene8Line1 />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Line 2: "carbarn." - Quick domain punch */}
                <Series.Sequence durationInFrames={SCENE8_LINE2_DUR}>
                    <Scene8Line2 />
                    <ShutterFlash />
                </Series.Sequence>

                {/* Line 3: "co." (Skipped if duration is 0, e.g. for .tz) */}
                {SCENE8_LINE3_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE8_LINE3_DUR}>
                        <Scene8Line3 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 4: Features (Skipped for some regions) */}
                {SCENE8_LINE4_DUR > 0 && (
                    <Series.Sequence durationInFrames={SCENE8_LINE4_DUR}>
                        <Scene8Line4 />
                        <ShutterFlash />
                    </Series.Sequence>
                )}

                {/* Line 5: "and we'll guide you step by step, from Japan to Mombasa." */}
                <Series.Sequence durationInFrames={SCENE8_LINE5_DUR}>
                    <Scene8Line5 />
                </Series.Sequence>
            </Series>
        </div>
    );
};

export * from "./constants";
