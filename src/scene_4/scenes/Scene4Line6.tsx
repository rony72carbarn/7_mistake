import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene4Wrapper } from "../components/Scene4Wrapper";
import { DocumentReveal } from "../components/DocumentReveal";
import { useLottie } from "../components/LottieLoader";
import {
  SCENE4_LINE6_DUR,
  IMG_BOTS_INVOICE,
  IMG_BOTS_BURS,
  IMG_ZAM_DOCS,
  IMG_ZAM_ZCSA,
  IMG_DOWNLOAD_DOCS,
  LOTTIE_REPORT,
  LOTTIE_BILLING,
  TECH_BLUE,
} from "../constants";

/**
 * Scene 4 - Line 6: Specific Documents Showcase
 * 2x2 grid of actual document examples from Botswana and Zambia
 */
export const Scene4Line6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieReport = useLottie(LOTTIE_REPORT);
  const lottieBilling = useLottie(LOTTIE_BILLING);

  // Document grid items with images and delays
  const gridItems = [
    { img: IMG_BOTS_INVOICE, delay: 20 },
    { img: IMG_BOTS_BURS, delay: 35 },
    { img: IMG_ZAM_DOCS, delay: 50 },
    { img: IMG_ZAM_ZCSA, delay: 65 },
  ];

  const exitFrame = SCENE4_LINE6_DUR - 12;
  const exitProgress = interpolate(frame, [exitFrame, SCENE4_LINE6_DUR], [0, 1], { extrapolateLeft: "clamp" });
  const contentOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <Scene4Wrapper
      duration={SCENE4_LINE6_DUR}
      bgImage={IMG_DOWNLOAD_DOCS}
      bgOpacity={0.1}
      fadeOut={false} // Element-driven exit
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-8 py-8 gap-6" style={{ opacity: contentOpacity }}>
        {/* Title text - reduced size to prevent cutoff */}
        <div
          className="space-y-2 overflow-hidden w-full max-w-4xl"
          style={{ transform: `translateY(${interpolate(exitProgress, [0, 1], [0, -100])}px)` }}
        >
          <DocumentReveal
            text="Including your invoice"
            mode="word"
            delay={5}
            className="text-3xl text-center"
            highlightWords={["invoice"]}
            highlightColor={TECH_BLUE}
          />
          <DocumentReveal
            text="and shipping paperwork"
            mode="word"
            delay={25}
            className="text-3xl text-center"
            highlightWords={["shipping", "paperwork"]}
            highlightColor={TECH_BLUE}
          />
        </div>

        {/* 2x2 Document grid */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
          {gridItems.map((item, i) => {
            const itemSpring = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 15, stiffness: 180 },
            });

            const itemExitY = interpolate(exitProgress, [0.1 * i, 0.4 + 0.1 * i], [0, 200], { extrapolateLeft: "clamp" });

            return (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{
                  opacity: itemSpring,
                  transform: `translateY(${interpolate(itemSpring, [0, 1], [50, 0]) + itemExitY}px) scale(${interpolate(itemSpring, [0, 1], [0.8, 1])})`,
                }}
              >
                <Img
                  src={item.img}
                  className="w-full h-auto rounded-xl shadow-xl border-2 border-white object-contain"
                  style={{ maxHeight: "200px" }}
                />

                {/* Lottie overlay on first and third items */}
                {(i === 0 || i === 2) && (
                  <div
                    className="absolute top-1 right-1"
                    style={{
                      width: 60,
                      height: 60,
                      opacity: interpolate(
                        frame,
                        [item.delay + 20, item.delay + 35],
                        [0, 1],
                        { extrapolateRight: "clamp" }
                      ),
                    }}
                  >
                    {i === 0 && lottieBilling && (
                      <Lottie
                        animationData={lottieBilling}
                        style={{ width: 60, height: 60 }}
                      />
                    )}
                    {i === 2 && lottieReport && (
                      <Lottie
                        animationData={lottieReport}
                        style={{ width: 60, height: 60 }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </Scene4Wrapper>
  );
};
