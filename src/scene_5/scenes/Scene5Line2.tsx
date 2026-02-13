import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene4Wrapper } from "../../scene_4/components/Scene4Wrapper";
import { MultiLineReveal } from "../../scene_4/components/DocumentReveal";
import {
  SCENE5_LINE2_DUR,
  IMG_SOUTH_SUDAN_PORT,
  TECH_BLUE,
  LOGO,
} from "../constants";

/**
 * Scene 5 - Line 2: In South Sudan
 * Location context with map/port image
 */
export const Scene5Line2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image scale in animation
  const imgScale = spring({
    frame: frame - 0,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const exitFrame = SCENE5_LINE2_DUR - 12;
  const exitProgress = interpolate(frame, [exitFrame, SCENE5_LINE2_DUR], [0, 1], { extrapolateLeft: "clamp" });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const elementExitY = interpolate(exitProgress, [0, 1], [0, 150]);

  return (
    <Scene4Wrapper
      duration={SCENE5_LINE2_DUR}
      bgImage={IMG_SOUTH_SUDAN_PORT}
      bgOpacity={0.12}
      fadeOut={false}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center px-8 py-8 gap-6"
        style={{ opacity: contentOpacity, transform: `translateY(${elementExitY}px)` }}
      >
        {/* Center: Logo */}
        <div
          style={{
            opacity: imgScale,
            transform: `scale(${interpolate(imgScale, [0, 1], [0.85, 1])})`,
          }}
        >
          <Img src={LOGO} className="h-24" />
        </div>

        {/* Multi-line progressive text reveal */}
        <div className="w-full max-w-4xl overflow-hidden">
          <MultiLineReveal
            lines={[
              "nga bakuwadde ebbanga",
              "lya ssente.",
            ]}
            lineDelay={10}
            mode="word"
            className="text-6xl text-center"
            highlightWords={["ebbanga", "ssente"]}
            highlightColor={TECH_BLUE}
          />
        </div>
      </div>
    </Scene4Wrapper>
  );
};
