import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE1_DUR,
  IMG_MISTAKE_4_INTRO,
  LOTTIE_ALERT,
  WARNING_RED,
  CURRENT_REGION,
} from "../constants";

/**
 * Scene 4 - Line 1: Mistake #4 Introduction
 * Shows person confused at customs with missing documents
 */
export const Scene4Line1: React.FC = () => {
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

  const exitFrame = SCENE4_LINE1_DUR - 10;
  const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE1_DUR], [0, 1], { extrapolateLeft: "clamp" });

  // Element-level exit transforms
  const badgeExit = interpolate(exitProgress, [0, 1], [0, -100]);
  const imgExit = interpolate(exitProgress, [0, 1], [0, -200]);
  const textExit = interpolate(exitProgress, [0, 1], [0, 200]);
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <Scene4Wrapper duration={SCENE4_LINE1_DUR} fadeOut={false}>
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
              src={IMG_MISTAKE_4_INTRO}
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
                MISTAKE #4
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
                text={CURRENT_REGION === 'BOTSWANA' ? "Phoso ya bone:" : CURRENT_REGION === 'ZIMBABWE' ? "Mhosho yechina:" : "For Zambia:"}
                mode="word"
                delay={10}
                className="text-4xl"
                highlightWords={CURRENT_REGION === 'BOTSWANA' ? ["Phoso"] : CURRENT_REGION === 'ZIMBABWE' ? ["Mhosho"] : CURRENT_REGION === 'UGANDA' ? ["Ensobi"] : ["Zambia"]}
                highlightColor={WARNING_RED}
              />
              <DocumentReveal
                text={CURRENT_REGION === 'BOTSWANA' ? "Go tlodisa matlho tshekolo ya dipampiri" : CURRENT_REGION === 'ZIMBABWE' ? "Kusatarisa magwaro (paperwork)" : CURRENT_REGION === 'UGANDA' ? "Obutafaayo ku biwandiiko—n’otubira mu clearing" : "Missing Documents"}
                mode="word"
                delay={30}
                className="text-3xl mt-2"
                highlightWords={CURRENT_REGION === 'BOTSWANA' ? ["dipampiri"] : CURRENT_REGION === 'ZIMBABWE' ? ["magwaro", "paperwork"] : CURRENT_REGION === 'UGANDA' ? ["biwandiiko", "clearing"] : []}
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
