import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE5_DUR,
  IMG_DOWNLOAD_DOCS,
  LOTTIE_DOWNLOAD,
  TECH_BLUE,
} from "../constants";

/**
 * Scene 4 - Line 5: Download Documents
 * Shows document download interface with bulleted list and icons
 */
export const Scene4Line5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieDownload = useLottie(LOTTIE_DOWNLOAD);

  // Main image animation
  const imgSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const exitFrame = SCENE4_LINE5_DUR - 10;
  const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE5_DUR], [0, 1], { extrapolateLeft: "clamp" });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const elementExitY = interpolate(exitProgress, [0, 1], [0, -150]);

  return (
    <Scene4Wrapper duration={SCENE4_LINE5_DUR} fadeOut={false}>
      <div
        className="w-full h-full flex flex-col items-center justify-center px-8 py-8 gap-6"
        style={{ opacity: contentOpacity, transform: `translateY(${elementExitY}px)` }}
      >
        {/* Title */}
        <div className="overflow-hidden">
          <DocumentReveal
            text="You'll receive what you need:"
            mode="word"
            delay={5}
            className="text-4xl text-center"
            highlightWords={["receive", "need"]}
            highlightColor={TECH_BLUE}
          />
        </div>

        {/* Main download image */}
        <div
          className="w-1/2 max-w-2xl relative overflow-hidden"
          style={{
            opacity: imgSpring,
            transform: `scale(${interpolate(imgSpring, [0, 1], [0.85, 1])})`,
          }}
        >
          <Img
            src={IMG_DOWNLOAD_DOCS}
            className="w-full h-auto rounded-2xl shadow-2xl object-contain"
            style={{ maxHeight: "350px" }}
          />

          {/* Download icon overlay */}
          <div
            className="absolute top-2 right-2"
            style={{
              width: 80,
              height: 80,
              opacity: interpolate(frame, [30, 50], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {lottieDownload && <Lottie animationData={lottieDownload} style={{ width: 80, height: 80 }} />}
          </div>
        </div>
      </div>
    </Scene4Wrapper>
  );
};
