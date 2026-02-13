import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { MultiLineReveal } from "../../scene_4/components/DocumentReveal";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
  SCENE5_LINE4_DUR,
  IMG_CAR_PRICE,
  LOTTIE_ALERT,
  WARNING_RED,
} from "../constants";

/**
 * Scene 5 - Line 4: Common Buyer Mistake
 * "and buyers often get caught because they only think about the car price."
 */
export const Scene5Line4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_ALERT);

  // Image scale in animation
  const imgScale = spring({
    frame: frame - 0,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const exitFrame = SCENE5_LINE4_DUR - 12;
  const exitProgress = interpolate(frame, [exitFrame, SCENE5_LINE4_DUR], [0, 1], { extrapolateLeft: "clamp" });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const elementExitY = interpolate(exitProgress, [0, 1], [0, 150]);

  return (
    <Scene4Wrapper
      duration={SCENE5_LINE4_DUR}
      bgImage={IMG_CAR_PRICE}
      bgOpacity={0.12}
      fadeOut={false}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center px-8 py-8 gap-6"
        style={{ opacity: contentOpacity, transform: `translateY(${elementExitY}px)` }}
      >
        {/* Center: Main image */}
        <div
          className="w-2/3 max-w-3xl relative overflow-hidden"
          style={{
            opacity: imgScale,
            transform: `scale(${interpolate(imgScale, [0, 1], [0.85, 1])})`,
          }}
        >
          <Img
            src={IMG_CAR_PRICE}
            className="w-full h-auto rounded-2xl shadow-2xl object-contain"
            style={{ maxHeight: "400px" }}
          />
          {/* Lottie alert overlay */}
          {lottieData && (
            <div
              className="absolute top-2 right-2"
              style={{
                width: 100,
                height: 100,
                opacity: interpolate(frame, [55, 75], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <Lottie animationData={lottieData} style={{ width: 100, height: 100 }} />
            </div>
          )}
        </div>

        {/* Multi-line progressive text reveal */}
        <div className="w-full max-w-4xl overflow-hidden">
          <MultiLineReveal
            lines={[
              "era abaguzi batera okukwatibwa",
              "balowooza ku bbeeyi ya",
              "mmotoka yokka.",
            ]}
            lineDelay={20}
            mode="word"
            className="text-5xl text-center"
            highlightWords={["okukwatibwa", "bbeeyi ya mmotoka"]}
            highlightColor={WARNING_RED}
          />
        </div>
      </div>
    </Scene4Wrapper>
  );
};
