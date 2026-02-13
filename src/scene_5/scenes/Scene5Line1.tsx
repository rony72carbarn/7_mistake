import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
  SCENE5_LINE1_DUR,
  IMG_MISTAKE_5_INTRO,
  LOTTIE_ALERT,
  WARNING_RED,
} from "../constants";

/**
 * Scene 5 - Line 1: Mistake #5 Introduction
 * "Mistake number five: Not understanding duties and taxes — and being surprised at the port."
 */
export const Scene5Line1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_ALERT);

  // Badge animation - scale up
  const badgeScale = spring({
    frame: frame - 0,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Image slide in from left
  const imgSlide = spring({
    frame: frame - 5,
    fps,
    config: { damping: 200 },
  });

  // Progress line animation
  const lineWidth = interpolate(
    frame,
    [10, 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const exitFrame = SCENE5_LINE1_DUR - 10;
  const exitProgress = interpolate(frame, [exitFrame, SCENE5_LINE1_DUR], [0, 1], { extrapolateLeft: "clamp" });

  // Element-level exit transforms
  const badgeExit = interpolate(exitProgress, [0, 1], [0, -100]);
  const imgExit = interpolate(exitProgress, [0, 1], [0, -200]);
  const textExit = interpolate(exitProgress, [0, 1], [0, 200]);
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <Scene4Wrapper duration={SCENE5_LINE1_DUR} fadeOut={false}>
      <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
        <div className="w-full max-w-5xl flex items-center gap-8">
          {/* Left: Image with warning overlay */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              opacity: imgSlide,
              transform: `translateX(${interpolate(imgSlide, [0, 1], [-80, 0]) + imgExit}px)`,
            }}
          >
            <Img
              src={IMG_MISTAKE_5_INTRO}
              className="w-full h-auto rounded-2xl shadow-2xl object-contain"
              style={{ filter: "brightness(0.85)", maxHeight: "500px" }}
            />
            {/* Warning emoji overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="text-7xl"
                style={{
                  opacity: interpolate(frame, [15, 35], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                ⚠️
              </div>
            </div>
          </div>

          {/* Right: Title and badge */}
          <div className="flex-1 space-y-4 pr-4" style={{ transform: `translateX(${textExit}px)` }}>
            {/* Mistake badge */}
            <div
              className="inline-block px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"
              style={{
                transform: `scale(${interpolate(badgeScale, [0, 1], [0.5, 1])}) translateY(${badgeExit}px)`,
                opacity: badgeScale,
              }}
            >
              <span className="text-white text-2xl font-black tracking-wider">
                MISTAKE #5
              </span>
            </div>

            {/* Progress line */}
            <div
              className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
              style={{
                transform: `scaleX(${lineWidth})`,
                transformOrigin: "left",
                maxWidth: "300px",
              }}
            />

            {/* Title text */}
            <div className="overflow-hidden">
              <DocumentReveal
                text="Ensobi ey’okutaano:"
                mode="word"
                delay={10}
                className="text-4xl"
                highlightWords={["Ensobi", "ey’okutaano"]}
                highlightColor={WARNING_RED}
              />
              <DocumentReveal
                text="Obutategeera nsonga za misolo"
                mode="word"
                delay={30}
                className="text-3xl mt-2"
                highlightWords={["misolo"]}
                highlightColor={WARNING_RED}
              />
              <DocumentReveal
                text="— n’ogenda okwekanga e Mombasa"
                mode="word"
                delay={60}
                className="text-2xl mt-2 italic opacity-80"
                highlightWords={["Mombasa"]}
                highlightColor={WARNING_RED}
              />
            </div>

            {/* Lottie alert icon */}
            <div
              className="mt-4"
              style={{
                width: 100,
                height: 100,
                opacity: interpolate(frame, [20, 35], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {lottieData && <Lottie animationData={lottieData} style={{ width: 100, height: 100 }} />}
            </div>
          </div>
        </div>
      </div>
    </Scene4Wrapper>
  );
};
