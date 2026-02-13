import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { DocumentReveal } from "../../scene_4/components/DocumentReveal";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
  SCENE5_LINE5_DUR,
  IMG_FULL_INVOICE,
  IMG_GUIDED_PROCESS,
  LOTTIE_BILLING,
  SUCCESS_GREEN,
  TECH_BLUE,
  LOGO,
} from "../constants";

/**
 * Scene 5 - Line 5: Carbarn Solution
 * "Carbarn helps by giving you a full invoice with the key details and guidance,"
 */
export const Scene5Line5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_BILLING);

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

  const exitFrame = SCENE5_LINE5_DUR - 15;
  const exitProgress = interpolate(frame, [exitFrame, SCENE5_LINE5_DUR], [0, 1], { extrapolateLeft: "clamp" });

  // Element-level exit transforms
  const imgExitX = interpolate(exitProgress, [0, 1], [0, -40]);
  const textExitX = interpolate(exitProgress, [0, 1], [0, -100]);
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0.8]);

  return (
    <Scene4Wrapper
      duration={SCENE5_LINE5_DUR}
      bg="transparent"
      bgImage={IMG_GUIDED_PROCESS}
      bgOpacity={0.1}
      fadeOut={false}
    >
      <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
        <div className="w-full max-w-5xl flex items-center gap-8">
          {/* Left: Full invoice image */}
          <div
            className="flex-1 overflow-hidden"
            style={{
              opacity: imgSpring,
              transform: `translateX(${interpolate(imgSpring, [0, 1], [-60, 0]) + imgExitX}px) scale(${interpolate(imgSpring, [0, 1], [0.9, 1])})`,
            }}
          >
            <Img
              src={IMG_FULL_INVOICE}
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
            {/* Logo */}
            <div style={{ opacity: interpolate(frame, [0, 20], [0, 1]) }}>
              <Img src={LOGO} className="h-16" />
            </div>

            {/* Main message */}
            <DocumentReveal
              text="Carbarn ekuyamba n’ekuwa"
              mode="word"
              delay={15}
              className="text-4xl"
              highlightWords={["Carbarn", "ekuyamba"]}
              highlightColor={SUCCESS_GREEN}
            />
            <DocumentReveal
              text="'invoice' erimu byonna"
              mode="word"
              delay={40}
              className="text-3xl"
              highlightWords={["invoice"]}
              highlightColor={TECH_BLUE}
            />
            <DocumentReveal
              text="n’okukulungamya"
              mode="word"
              delay={70}
              className="text-3xl"
              highlightWords={["okukulungamya"]}
              highlightColor={SUCCESS_GREEN}
            />

            {/* Lottie billing icon */}
            <div
              style={{
                width: 120,
                height: 120,
                opacity: interpolate(frame, [90, 110], [0, 1], {
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
