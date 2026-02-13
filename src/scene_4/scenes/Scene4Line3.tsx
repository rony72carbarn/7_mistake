import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE3_DUR,
  IMG_ORIGINALS_CUSTOMS,
  LOTTIE_VALIDATION,
  TECH_BLUE,
  CURRENT_REGION,
} from "../constants";

/**
 * Scene 4 - Line 3: Need Right Originals for Customs
 * Split screen with document image and emphasized text
 */
export const Scene4Line3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_VALIDATION);

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

  const exitFrame = SCENE4_LINE3_DUR - 15;
  const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE3_DUR], [0, 1], { extrapolateLeft: "clamp" });

  // Element-level exit transforms (shaping the transition to Extra)
  const imgExitX = interpolate(exitProgress, [0, 1], [0, -40]);
  const textExitX = interpolate(exitProgress, [0, 1], [0, -100]);
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0.8]);

  return (
    <Scene4Wrapper
      duration={SCENE4_LINE3_DUR}
      bgImage={IMG_ORIGINALS_CUSTOMS}
      bgOpacity={0.1}
      fadeOut={false}
    >
      <div className="w-full h-full flex items-center justify-center px-8 py-8" style={{ opacity: contentOpacity }}>
        <div className="w-full max-w-5xl flex items-center gap-8">
          {/* Left: Document image */}
          <div
            className="flex-1 overflow-hidden"
            style={{
              opacity: imgSpring,
              transform: `translateX(${interpolate(imgSpring, [0, 1], [-60, 0]) + imgExitX}px) scale(${interpolate(imgSpring, [0, 1], [0.9, 1])})`,
            }}
          >
            <Img
              src={IMG_ORIGINALS_CUSTOMS}
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
              text={
                CURRENT_REGION === 'BOTSWANA' ? "O tlhoka dipampiri tsa nnete (originals)" :
                  CURRENT_REGION === 'ZIMBABWE' ? "Unofanira kunge uine magwaro chaiwo" :
                    CURRENT_REGION === 'UGANDA' ? "Oteekwa okuba ne 'originals' entuufu" :
                      "You need the right originals"
              }
              mode="word"
              delay={15}
              className="text-4xl"
              highlightWords={
                CURRENT_REGION === 'BOTSWANA' ? ["nnete", "originals"] :
                  CURRENT_REGION === 'ZIMBABWE' ? ["magwaro", "chaiwo"] :
                    CURRENT_REGION === 'UGANDA' ? ["originals", "entuufu"] :
                      ["originals"]
              }
              highlightColor={TECH_BLUE}
            />

            {/* Secondary message - word reveal for better readability */}
            <DocumentReveal
              text={
                CURRENT_REGION === 'BOTSWANA' ? "tse di siametseng lekgetho le go kwadisa koloi." :
                  CURRENT_REGION === 'ZIMBABWE' ? "akagadzirira kumasitendi nekunyoresa motokari." :
                    CURRENT_REGION === 'UGANDA' ? "eza 'customs' n’okuwandiisa mmotoka." :
                      "ready for customs and registration."
              }
              mode="word"
              delay={40}
              className="text-3xl"
              highlightWords={
                CURRENT_REGION === 'BOTSWANA' ? ["lekgetho", "kwadisa"] :
                  CURRENT_REGION === 'ZIMBABWE' ? ["kumasitendi", "kunyoresa"] :
                    CURRENT_REGION === 'UGANDA' ? ["customs", "mmotoka"] :
                      ["customs", "registration"]
              }
              highlightColor={TECH_BLUE}
            />

            {/* Lottie validation checkmark */}
            <div
              style={{
                width: 120,
                height: 120,
                opacity: interpolate(frame, [80, 100], [0, 1], {
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
