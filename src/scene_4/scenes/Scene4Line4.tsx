import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { MultiLineReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE4_DUR,
  IMG_DASHBOARD,
  LOTTIE_DASHBOARD_PREMIUM,
  LOTTIE_ANALYTICS,
  TECH_BLUE,
  CURRENT_REGION,
} from "../constants";

/**
 * Scene 4 - Line 4: Carbarn Dashboard Tracking
 * Shows laptop dashboard with multiple Lottie overlays
 */
export const Scene4Line4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieDashboard = useLottie(LOTTIE_DASHBOARD_PREMIUM);
  const lottieAnalytics = useLottie(LOTTIE_ANALYTICS);

  // Image scale with slight rotation for depth
  const imgSpring = spring({
    frame: frame - 0,
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  // Progress line animation
  const lineWidth = interpolate(
    frame,
    [105, 125],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const exitFrame = SCENE4_LINE4_DUR - 12;
  const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE4_DUR], [0, 1], { extrapolateLeft: "clamp" });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const elementExitY = interpolate(exitProgress, [0, 1], [0, 150]);

  return (
    <Scene4Wrapper
      duration={SCENE4_LINE4_DUR}
      bgImage={IMG_DASHBOARD}
      bgOpacity={0.1}
      fadeIn={true}
      fadeOut={false} // Element-driven exit
    >
      <div
        className="w-full h-full flex items-center justify-center px-8 py-8"
        style={{ opacity: contentOpacity, transform: `translateY(${elementExitY}px)` }}
      >
        <div className="w-full max-w-5xl flex items-center gap-8">
          {/* Left: Dashboard image with Lottie overlays */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              opacity: imgSpring,
              transform: `scale(${interpolate(imgSpring, [0, 1], [0.9, 1])})`,
            }}
          >
            <Img
              src={IMG_DASHBOARD}
              className="w-full h-auto rounded-2xl shadow-2xl object-contain"
              style={{ maxHeight: "500px", transform: "rotate(-1deg)" }}
            />

            {/* Dashboard Lottie icon - top right */}
            <div
              className="absolute top-2 right-2"
              style={{
                width: 80,
                height: 80,
                opacity: interpolate(frame, [35, 55], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {lottieDashboard && <Lottie animationData={lottieDashboard} style={{ width: 80, height: 80 }} />}
            </div>

            {/* Analytics Lottie icon - bottom left */}
            <div
              className="absolute bottom-2 left-2"
              style={{
                width: 90,
                height: 90,
                opacity: interpolate(frame, [75, 95], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {lottieAnalytics && <Lottie animationData={lottieAnalytics} style={{ width: 90, height: 90 }} />}
            </div>
          </div>

          {/* Right: Text overlay with card background */}
          <div className="flex-1 space-y-4 pr-4">
            {/* Semi-transparent card */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl overflow-hidden">
              <MultiLineReveal
                lines={CURRENT_REGION === 'BOTSWANA' ? [
                  "Kwa Carbarn, o ka kgona",
                  "go bona le go itsetsepela",
                  "dipampiri mo dashboard",
                  "ya gago sentle."
                ] : CURRENT_REGION === 'ZIMBABWE' ? [
                  "PaCarbarn, unokwanisa",
                  "kutevera magwaro akakosha",
                  "aya padashboard yako."
                ] : CURRENT_REGION === 'UGANDA' ? [
                  "Ne Carbarn, osobola okulondoola",
                  "n’okuwanula ebiwandiiko",
                  "ku dashboard yo."
                ] : [
                  "With Carbarn,",
                  "you can track and download",
                  "key documents through",
                  "your dashboard",
                ]}
                lineDelay={15}
                mode="word"
                className="text-3xl"
                highlightWords={CURRENT_REGION === 'BOTSWANA' ? ["Carbarn", "dipampiri", "dashboard"] : CURRENT_REGION === 'ZIMBABWE' ? ["Carbarn", "magwaro", "dashboard"] : CURRENT_REGION === 'UGANDA' ? ["Carbarn", "ebiwandiiko", "dashboard"] : ["track", "download", "documents", "dashboard"]}
                highlightColor={TECH_BLUE}
              />
            </div>

            {/* Progress line */}
            <div
              className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              style={{
                transform: `scaleX(${lineWidth})`,
                transformOrigin: "left",
                maxWidth: "300px",
              }}
            />
          </div>
        </div>
      </div>
    </Scene4Wrapper>
  );
};
