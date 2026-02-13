import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { MultiLineReveal } from "../../scene_4/components/DocumentReveal";
import { useLottie } from "../../scene_4/components/LottieLoader";
import {
  SCENE5_LINE6_DUR,
  IMG_BUDGET_SHIPPING,
  IMG_TRANSPARENCY,
  LOTTIE_SUCCESS,
  SUCCESS_GREEN,
  LOGO,
} from "../constants";

/**
 * Scene 5 - Line 6: Final Benefit
 * "so you can budget properly before the vehicle ships."
 */
export const Scene5Line6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_SUCCESS);

  // Image scale in animation
  const imgScale = spring({
    frame: frame - 0,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  // Logo spring animation
  const logoSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <Scene4Wrapper
      duration={SCENE5_LINE6_DUR}
      bgImage={IMG_TRANSPARENCY}
      bgOpacity={0.1}
      fadeOut={true}
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 gap-6">
        {/* Center: Main image */}
        <div
          className="w-2/3 max-w-3xl relative overflow-hidden"
          style={{
            opacity: imgScale,
            transform: `scale(${interpolate(imgScale, [0, 1], [0.85, 1])})`,
          }}
        >
          <Img
            src={IMG_BUDGET_SHIPPING}
            className="w-full h-auto rounded-2xl shadow-2xl object-contain"
            style={{ maxHeight: "400px" }}
          />
          {/* Lottie success overlay */}
          {lottieData && (
            <div
              className="absolute top-2 right-2"
              style={{
                width: 100,
                height: 100,
                opacity: interpolate(frame, [35, 55], [0, 1], {
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
              "ku by’emisolo, obudde",
              "n’obubala bulungi nga",
              "mmotoka tennyisibwa.",
            ]}
            lineDelay={15}
            mode="word"
            className="text-5xl text-center"
            highlightWords={["obudde", "obubala"]}
            highlightColor={SUCCESS_GREEN}
          />
        </div>

        {/* Carbarn logo footer */}
        <div
          style={{
            opacity: logoSpring,
            transform: `translateY(${interpolate(logoSpring, [0, 1], [20, 0])}px) scale(${interpolate(logoSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <Img src={LOGO} className="h-20 mt-6" />
        </div>
      </div>
    </Scene4Wrapper>
  );
};
