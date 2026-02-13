import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE7_DUR,
  IMG_NOTHING_MISSING_ALT,
  IMG_CARS_REPORT,
  LOTTIE_SUCCESS,
  LOTTIE_TROPHY,
  LOGO,
  SUCCESS_GREEN,
} from "../constants";

/**
 * Scene 4 - Line 7: Nothing Missing - Success Scene
 * Final scene celebrating complete documentation with success animations
 */
export const Scene4Line7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieSuccess = useLottie(LOTTIE_SUCCESS);
  const lottieTrophy = useLottie(LOTTIE_TROPHY);

  // Logo animation - slides up from bottom
  const logoSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <Scene4Wrapper duration={SCENE4_LINE7_DUR} bg="#F0FFF4" fadeOut={true}>
      <div
        className="w-full h-full flex items-center justify-center px-8 py-8"
        style={{
          opacity: interpolate(frame, [SCENE4_LINE7_DUR - 10, SCENE4_LINE7_DUR], [1, 0], { extrapolateLeft: "clamp" })
        }}
      >
        <div className="w-full max-w-5xl flex items-center gap-8">
          {/* Left: Success image with gentle zoom */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              transform: `scale(${interpolate(frame, [0, SCENE4_LINE7_DUR], [1, 1.05])})`,
            }}
          >
            <Img
              src={IMG_NOTHING_MISSING_ALT}
              className="w-full h-auto rounded-2xl shadow-2xl object-contain"
              style={{ maxHeight: "500px" }}
            />

            {/* Cars and report overlay (second image) */}
            <div
              className="absolute bottom-2 right-2 w-2/5"
              style={{
                opacity: interpolate(frame, [55, 70], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <Img
                src={IMG_CARS_REPORT}
                className="w-full h-auto rounded-xl shadow-xl border-2 border-white object-contain"
              />
            </div>

            {/* Success Lottie - prominent center overlay */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 150,
                height: 150,
                opacity: interpolate(frame, [25, 45], [0, 0.8], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {lottieSuccess && <Lottie animationData={lottieSuccess} style={{ width: 150, height: 150 }} />}
            </div>
          </div>

          {/* Right: Success message and branding */}
          <div className="flex-1 space-y-5 overflow-hidden pr-4">
            {/* Setup text */}
            <div
              className="overflow-hidden"
              style={{
                opacity: interpolate(frame, [5, 25], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <DocumentReveal
                text="So nothing is"
                mode="word"
                delay={5}
                className="text-2xl"
              />
            </div>

            {/* Main dramatic reveal with quotes - reduced size to prevent cutoff */}
            <div className="relative overflow-hidden max-w-full">
              <DocumentReveal
                text="'missing later'"
                mode="word"
                delay={35}
                className="text-4xl leading-tight"
                highlightWords={["missing", "later"]}
                highlightColor={SUCCESS_GREEN}
              />
            </div>

            {/* Trophy Lottie */}
            <div
              style={{
                width: 90,
                height: 90,
                opacity: interpolate(frame, [70, 90], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {lottieTrophy && <Lottie animationData={lottieTrophy} style={{ width: 90, height: 90 }} />}
            </div>

            {/* Success message */}
            <div
              className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
              style={{
                opacity: interpolate(frame, [90, 110], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <p className="text-lg font-bold text-center" style={{ color: SUCCESS_GREEN }}>
                ✓ Complete Documentation
              </p>
            </div>

            {/* Carbarn logo */}
            <div
              style={{
                opacity: logoSpring,
                transform: `translateY(${interpolate(logoSpring, [0, 1], [20, 0])}px)`,
              }}
            >
              <Img src={LOGO} className="h-16" />
            </div>
          </div>
        </div>
      </div>
    </Scene4Wrapper>
  );
};
