import React from "react";
import { Img, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const TripleImageGrid: React.FC<{
    images: string[];
    delay?: number;
    interval?: number;
}> = ({ images, delay = 0, interval }) => {
    const finalDelay = interval || delay;
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <div className="relative w-full h-[600px] flex gap-4 p-4">
            {images.slice(0, 3).map((img, i) => {
                const spr = spring({
                    frame: frame - finalDelay - i * 10,
                    fps,
                    config: { damping: 12, stiffness: 100 },
                });

                return (
                    <div
                        key={i}
                        className={`relative flex-1 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20`}
                        style={{
                            transform: `translateY(${interpolate(spr, [0, 1], [100, 0])}px) scale(${interpolate(spr, [0, 1], [0.8, 1])}) rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                            opacity: spr,
                            zIndex: 3 - i,
                        }}
                    >
                        <Img
                            src={img}
                            className="w-full h-full object-cover"
                            style={{
                                transform: `scale(${interpolate(frame, [0, 300], [1, 1.2])})`,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                );
            })}
        </div>
    );
};
