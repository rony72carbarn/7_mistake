import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TEXT_DARK, WARNING_RED } from "../constants";

export const DocumentReveal: React.FC<{
    text: string;
    delay?: number;
    color?: string;
    className?: string;
    highlightWords?: string[];
    highlightColor?: string;
}> = ({
    text,
    delay = 0,
    color = TEXT_DARK,
    className = "text-5xl",
    highlightWords = [],
    highlightColor = WARNING_RED,
}) => {
        const frame = useCurrentFrame();
        const { fps } = useVideoConfig();
        const words = text.split(" ");

        return (
            <div className={`flex flex-wrap items-center ${className} font-black leading-tight text-white drop-shadow-2xl`}>
                {words.map((word, i) => {
                    const spr = spring({
                        frame: frame - delay - i * 3,
                        fps,
                        config: { damping: 14, stiffness: 220 },
                    });

                    const isHighlight = highlightWords.some((hw) =>
                        word.toLowerCase().includes(hw.toLowerCase())
                    );

                    return (
                        <span
                            key={i}
                            className="inline-block mr-3"
                            style={{
                                opacity: interpolate(spr, [0, 1], [0, 1]),
                                transform: `translateY(${interpolate(spr, [0, 1], [30, 0])}px) scale(${interpolate(spr, [0, 1], [0.9, 1])})`,
                                filter: `blur(${interpolate(spr, [0, 1], [10, 0])}px)`,
                                color: isHighlight ? highlightColor : "white",
                            }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        );
    };
