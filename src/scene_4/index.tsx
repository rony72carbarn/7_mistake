import { Series, AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene4Line1 } from "./scenes/Scene4Line1";
import { Scene4Line2 } from "./scenes/Scene4Line2";
import { Scene4Line3 } from "./scenes/Scene4Line3";
import { Scene4Line3Extra } from "./scenes/Scene4Line3Extra";
import { Scene4Line3Map } from "./scenes/Scene4Line3Map";
import { Scene4Line4 } from "./scenes/Scene4Line4";
import { Scene4Line5 } from "./scenes/Scene4Line5";
import { Scene4Line6 } from "./scenes/Scene4Line6";
import { Scene4Line7 } from "./scenes/Scene4Line7";
import {
  SCENE4_LINE1_DUR,
  SCENE4_LINE2_DUR,
  SCENE4_LINE3_DUR,
  SCENE4_LINE3_EXTRA_DUR,
  SCENE4_LINE3_MAP_DUR,
  SCENE4_LINE4_DUR,
  SCENE4_LINE5_DUR,
  SCENE4_LINE6_DUR,
  SCENE4_LINE7_DUR,
} from "./constants";

const ShutterFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 4, 12], [0, 0.9, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      className="pointer-events-none z-[100] bg-white"
      style={{ opacity }}
    />
  );
};

/**
 * Scene 4 Composition: Improper Document Management
 * Orchestrates the sequence of animations for the fourth mistake
 */
export const Scene4Composition: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-50">
      <Series>
        {/* Line 1: Intro (Mistake #4) */}
        {SCENE4_LINE1_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE1_DUR}>
            <Scene4Line1 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Line 2: Documents matter as much as the car */}
        {SCENE4_LINE2_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE2_DUR}>
            <Scene4Line2 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Line 3: Need originals for customs */}
        {SCENE4_LINE3_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE3_DUR}>
            <Scene4Line3 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Line 3 Extra: Inspection/BURS focus */}
        {SCENE4_LINE3_EXTRA_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE3_EXTRA_DUR}>
            <Scene4Line3Extra />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Line 3 Map: Before use in Zambia / BP17B Focus */}
        {SCENE4_LINE3_MAP_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE3_MAP_DUR}>
            <Scene4Line3Map />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Line 4: Track via dashboard */}
        {SCENE4_LINE4_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE4_DUR}>
            <Scene4Line4 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Region specific lines for Zambia */}
        {SCENE4_LINE5_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE5_DUR}>
            <Scene4Line5 />
          </Series.Sequence>
        )}

        {SCENE4_LINE6_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE6_DUR}>
            <Scene4Line6 />
          </Series.Sequence>
        )}

        {SCENE4_LINE7_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE4_LINE7_DUR}>
            <Scene4Line7 />
          </Series.Sequence>
        )}
      </Series>
    </div>
  );
};

// Export shared components
export { Scene4Wrapper } from "./components/Scene4Wrapper";
export { DocumentReveal, MultiLineReveal } from "./components/DocumentReveal";
export { useLottie } from "./components/LottieLoader";

// Export constants
export * from "./constants";
