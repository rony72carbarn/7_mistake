import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { MultiLineReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE2_DUR,
  IMG_DOCS_MATTER,
  LOTTIE_SHIELD,
  TECH_BLUE,
  CURRENT_REGION,
  IMG_BOTS_MAP,
} from "../constants";

/**
 * Scene 4 - Line 2: Documents Matter as Much as Car
 * Progressive multi-line storytelling about document importance
 */
export const Scene4Line2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_SHIELD);

  // Image scale in animation
  const imgScale = spring({
    frame: frame - 0,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const exitFrame = SCENE4_LINE2_DUR - 12;
  const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE2_DUR], [0, 1], { extrapolateLeft: "clamp" });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const elementExitY = interpolate(exitProgress, [0, 1], [0, 150]);

  return (
    <Scene4Wrapper
      duration={SCENE4_LINE2_DUR}
      bgImage={CURRENT_REGION === 'BOTSWANA' ? IMG_BOTS_MAP : IMG_DOCS_MATTER}
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
            src={IMG_DOCS_MATTER}
            className="w-full h-auto rounded-2xl shadow-2xl object-contain"
            style={{ maxHeight: "400px" }}
          />
          {/* Lottie shield overlay */}
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
            lines={CURRENT_REGION === 'BOTSWANA' ? [
              "dipampiri tsa gago",
              "di botlhokwa fela jaaka koloi.",
            ] : CURRENT_REGION === 'ZIMBABWE' ? [
              "MuZimbabwe, magwaro ako",
              "akakosha zvakafanana nemotokari.",
            ] : CURRENT_REGION === 'UGANDA' ? [
              "Wano e Uganda, ebiwandiiko",
              "bikulu nnyo okwenkanankana",
              "n’emmotoka yennyini.",
            ] : [
              "your documents matter",
              "as much as the car.",
            ]}
            lineDelay={25}
            mode="word"
            className="text-5xl text-center"
            highlightWords={CURRENT_REGION === 'BOTSWANA' ? ["dipampiri", "botlhokwa", "koloi"] : CURRENT_REGION === 'ZIMBABWE' ? ["Zimbabwe", "magwaro", "motokari"] : CURRENT_REGION === 'UGANDA' ? ["ebiwandiiko", "n’emmotoka"] : ["documents", "matter", "car"]}
            highlightColor={TECH_BLUE}
          />
        </div>
      </div>
    </Scene4Wrapper>
  );
};
