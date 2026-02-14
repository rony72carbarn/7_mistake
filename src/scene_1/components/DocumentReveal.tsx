import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TEXT_DARK, WARNING_RED } from "../constants";

type AnimationMode = "word" | "char" | "typewriter";

/**
 * DocumentReveal Component - Enhanced storytelling typography
 */
export const DocumentReveal: React.FC<{
    text: string;
    mode?: AnimationMode;
    delay?: number;
    color?: string;
    className?: string;
    highlightWords?: string[];
    highlightColor?: string;
    showCursor?: boolean;
}> = ({
    text,
    mode = "word",
    delay = 0,
    color = TEXT_DARK,
    className = "text-5xl",
    highlightWords = [],
    highlightColor = WARNING_RED,
    showCursor = false,
}) => {
        const frame = useCurrentFrame();
        const { fps } = useVideoConfig();

        if (mode === "word") {
            const words = text.split(" ");
            return (
                <div className={`flex flex-wrap items-center ${className} font-black leading-tight`}>
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
                                    color: isHighlight ? highlightColor : color,
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>
            );
        }
        return null;
    };
