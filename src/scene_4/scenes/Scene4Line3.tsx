import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import {
    SCENE4_LINE3_DUR,
    S4_IMG_02,
    S4_IMG_03,
    S4_IMG_04,
    WARNING_RED,
} from "../constants";

export const Scene4Line3: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const spr = spring({ frame, fps, config: { damping: 15 } });

    return (
        <Scene4Wrapper
            duration={SCENE4_LINE3_DUR}
            layout="split-right"
            bgImage={S4_IMG_02}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-12 pl-12" style={{ opacity: spr, transform: `translateX(${interpolate(spr, [0, 1], [-50, 0])}px)` }}>
                    <DocumentReveal
                        text="আর এগুলো ঢাকায় এনে রিপ্লেস করতে গেলে পকেট থেকে হাজার হাজার টাকা হাওয়া!"
                        className="text-7xl font-bold leading-tight"
                        highlightWords={["ঢাকায়", "টাকা", "হাওয়া"]}
                        highlightColor={WARNING_RED}
                    />
                    <div className="h-2 w-48 bg-red-500/50 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${spr * 100}%` }} />
                    </div>
                </div>
            }
            rightContent={
                <div className="w-full h-full p-4">
                    <TripleImageGrid
                        images={[S4_IMG_02, S4_IMG_03, S4_IMG_04]}
                        interval={10}
                    />
                </div>
            }
        />
    );
};
