import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene5Wrapper } from "../components/Scene5Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import {
    SCENE5_LINE3_DUR,
} from "../constants";

export const Scene5Line3: React.FC<{
    fadeIn?: boolean;
    fadeOut?: boolean;
    text: string;
    highlights: string[];
    color: string;
    bgImage: string;
}> = ({ fadeIn, fadeOut, text, highlights, color, bgImage }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame, fps, config: { damping: 15 } });

    return (
        <Scene5Wrapper
            duration={SCENE5_LINE3_DUR}
            layout="split-right"
            bgImage={bgImage}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12 pl-12" style={{ opacity: spr, transform: `translateX(${interpolate(spr, [0, 1], [-50, 0])}px)` }}>
                    <DocumentReveal
                        text={text}
                        className="text-7xl font-bold leading-tight"
                        highlightWords={highlights}
                        highlightColor={color}
                    />
                    <div className="h-2 w-48 bg-red-500/50 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${spr * 100}%` }} />
                    </div>
                </div>
            }
            rightContent={
                <div className="w-full h-full p-4">
                    <TripleImageGrid
                        images={[bgImage, bgImage, bgImage]} // Simplified for now as it's a grid of 3
                        interval={10}
                    />
                </div>
            }
        />
    );
};
