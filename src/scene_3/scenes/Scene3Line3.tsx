import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Scene3Wrapper } from "../components/Scene3Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { TripleImageGrid } from "../components/TripleImageGrid";
import {
    SCENE3_LINE3_DUR,
    S3_IMG_02,
    S3_IMG_00,
    S3_IMG_06,
    SUCCESS_GREEN,
} from "../constants";

export const Scene3Line3: React.FC<{ fadeIn?: boolean; fadeOut?: boolean }> = ({ fadeIn, fadeOut }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const spr = spring({ frame, fps, config: { damping: 15 } });

    return (
        <Scene3Wrapper
            duration={SCENE3_LINE3_DUR}
            layout="split-right"
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            leftContent={
                <div className="space-y-10 pl-12" style={{ opacity: spr, transform: `translateX(${interpolate(spr, [0, 1], [-50, 0])}px)` }}>
                    <div className="flex items-center gap-6">
                        <div className="px-4 py-2 bg-green-500 rounded-lg text-white font-black text-xl uppercase tracking-widest shadow-lg shadow-green-500/30">Verified</div>
                        <div className="h-0.5 w-24 bg-white/20" />
                    </div>
                    <DocumentReveal
                        text="কারবার্নে আপনি দুইটা সলিড রিপোর্ট পাবেন।"
                        className="text-7xl"
                        highlightWords={["সলিড", "রিপোর্ট"]}
                        highlightColor={SUCCESS_GREEN}
                    />
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                                <span className="text-green-500 font-black">1</span>
                            </div>
                            <span className="text-2xl font-bold italic">Japanese Auction Sheet</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                                <span className="text-green-500 font-black">2</span>
                            </div>
                            <span className="text-2xl font-bold italic">Special Inspection Report</span>
                        </div>
                    </div>
                </div>
            }
            rightContent={<TripleImageGrid images={[S3_IMG_02, S3_IMG_00, S3_IMG_06]} delay={10} />}
        />
    );
};
