import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
  SCENE5_LINE3_DUR,
  IMG_LANDED_VALUE,
  LOTTIE_ANALYTICS,
  TECH_BLUE,
  WARNING_RED,
} from "../constants";

/**
 * Scene 5 - Line 3: Calculation Explanation
 * "duties and taxes are calculated based on the landed value details used for import,"
 */
export const Scene5Line3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_ANALYTICS);

  // Image slides from left with spring physics
  const imgSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  // Text spring animation
  const textSpring = spring({
    frame: frame - 0,
    fps,
    config: { damping: 200 },
  });

  const exitFrame = SCENE5_LINE3_DUR - 15;
  const exitProgress = interpolate(frame, [exitFrame, SCENE5_LINE3_DUR], [0, 1], { extrapolateLeft: "clamp" });

  // Element-level exit transforms
  const imgExitX = interpolate(exitProgress, [0, 1], [0, -40]);
  const textExitX = interpolate(exitProgress, [0, 1], [0, -100]);
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0.8]);

  return (
    <Scene4Wrapper
      duration={SCENE5_LINE3_DUR}
      bgImage={IMG_LANDED_VALUE}
      bgOpacity={0.1}
      fadeOut={false}
    >
      <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
        <div className="w-full max-w-5xl flex items-center gap-8">
          {/* Left: Landed value breakdown image */}
          <div
            className="flex-1 overflow-hidden"
            style={{
              opacity: imgSpring,
              transform: `translateX(${interpolate(imgSpring, [0, 1], [-60, 0]) + imgExitX}px) scale(${interpolate(imgSpring, [0, 1], [0.9, 1])})`,
            }}
          >
            <Img
              src={IMG_LANDED_VALUE}
              className="w-full h-auto rounded-2xl shadow-2xl object-contain"
              style={{ maxHeight: "500px", transform: "rotate(-1deg)" }}
            />
          </div>

          {/* Right: Text content */}
          <div
            className="flex-1 space-y-6 overflow-hidden pr-4"
            style={{
              opacity: textSpring,
              transform: `translateY(${interpolate(textSpring, [0, 1], [-20, 0])}px) translateX(${textExitX}px)`,
            }}
          >
            {/* Main message - word reveal */}
            <DocumentReveal
              text="Wano, emisolo gisinziira ku"
              mode="word"
              delay={15}
              className="text-3xl"
              highlightWords={["emisolo"]}
              highlightColor={WARNING_RED}
            />

            {/* Secondary message */}
            <DocumentReveal
              text="bunene bwa yingini"
              mode="word"
              delay={40}
              className="text-4xl"
              highlightWords={["bunene bwa yingini"]}
              highlightColor={TECH_BLUE}
            />

            {/* Tertiary message */}
            <DocumentReveal
              text="ne 'dutiable value'"
              mode="word"
              delay={65}
              className="text-4xl"
              highlightWords={["dutiable value"]}
              highlightColor={WARNING_RED}
            />

            {/* Lottie analytics icon */}
            <div
              style={{
                width: 120,
                height: 120,
                opacity: interpolate(frame, [100, 120], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {lottieData && <Lottie animationData={lottieData} style={{ width: 120, height: 120 }} />}
            </div>
          </div>
        </div>
      </div>
    </Scene4Wrapper>
  );
};
