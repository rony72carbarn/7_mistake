import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TEXT_DARK, WARNING_RED } from "../constants";

type AnimationMode = "word" | "char" | "typewriter";

/**
 * DocumentReveal Component - Enhanced storytelling typography
 * Supports multiple animation modes for dynamic text reveals
 *
 * @param text - Text content to animate
 * @param mode - Animation mode: "word" | "char" | "typewriter"
 * @param delay - Frame delay before animation starts
 * @param color - Text color
 * @param className - Additional CSS classes
 * @param highlightWords - Array of words to highlight with different color
 * @param highlightColor - Color for highlighted words
 * @param showCursor - Show typewriter cursor (typewriter mode only)
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

    // ============================================================
    // MODE: WORD-BY-WORD REVEAL (Standard narrative flow)
    // ============================================================
    if (mode === "word") {
      const words = text.split(" ");

      return (
        <div className={`flex flex-wrap items-center ${className} font-black leading-tight`}>
          {words.map((word, i) => {
            const spr = spring({
              frame: frame - delay - i * 3, // 3 frames between words
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

    // ============================================================
    // MODE: CHARACTER-BY-CHARACTER REVEAL (Dramatic emphasis)
    // ============================================================
    if (mode === "char") {
      const chars = text.split("");

      return (
        <div className={`${className} font-black leading-tight`}>
          {chars.map((char, i) => {
            const spr = spring({
              frame: frame - delay - i * 1.5, // 1.5 frames between characters
              fps,
              config: { damping: 14, stiffness: 220 },
            });

            // Check if this character is part of a highlighted word
            const textAfter = text.substring(i);
            const wordAtPosition = textAfter.split(/\s/)[0];
            const isHighlight = highlightWords.some((hw) =>
              wordAtPosition.toLowerCase().includes(hw.toLowerCase())
            );

            return (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: interpolate(spr, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(spr, [0, 1], [30, 0])}px) rotate(${interpolate(spr, [0, 1], [15, 0])}deg)`,
                  color: isHighlight ? highlightColor : color,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      );
    }

    // ============================================================
    // MODE: TYPEWRITER (Document content style)
    // ============================================================
    if (mode === "typewriter") {
      const charsPerFrame = 0.5; // Typing speed
      const typedChars = Math.floor((frame - delay) * charsPerFrame);
      const displayText = text.slice(0, Math.max(0, typedChars));

      // Cursor blink effect
      const cursorVisible = showCursor && Math.floor(frame / 15) % 2 === 0;

      return (
        <div className={`${className} font-mono leading-tight`} style={{ color }}>
          {displayText}
          {showCursor && typedChars < text.length && (
            <span
              className="inline-block w-[0.6em] h-[1em] bg-current align-text-bottom ml-1"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            />
          )}
        </div>
      );
    }

    return null;
  };

/**
 * MultiLineReveal Component - Progressive multi-line storytelling
 * Each line reveals sequentially with staggered delays
 *
 * @param lines - Array of text lines to reveal
 * @param lineDelay - Frames between each line starting
 * @param mode - Animation mode for each line
 * @param className - CSS classes for each line
 * @param highlightWords - Words to highlight across all lines
 */
export const MultiLineReveal: React.FC<{
  lines: string[];
  lineDelay?: number;
  mode?: AnimationMode;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}> = ({
  lines,
  lineDelay = 20,
  mode = "word",
  className = "text-4xl",
  highlightWords = [],
  highlightColor,
}) => {
    return (
      <div className="space-y-4">
        {lines.map((line, i) => (
          <DocumentReveal
            key={i}
            text={line}
            mode={mode}
            delay={i * lineDelay}
            className={className}
            highlightWords={highlightWords}
            highlightColor={highlightColor}
          />
        ))}
      </div>
    );
  };
