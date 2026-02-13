import { Series, AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene5Line1 } from "./scenes/Scene5Line1";
import { Scene5Line2 } from "./scenes/Scene5Line2";
import { Scene5Line3 } from "./scenes/Scene5Line3";
import { Scene5Line4 } from "./scenes/Scene5Line4";
import { Scene5Line5 } from "./scenes/Scene5Line5";
import { Scene5Line6 } from "./scenes/Scene5Line6";
import { Scene5Line7 } from "./scenes/Scene5Line7";
import {
  SCENE5_LINE1_DUR,
  SCENE5_LINE2_DUR,
  SCENE5_LINE3_DUR,
  SCENE5_LINE4_DUR,
  SCENE5_LINE5_DUR,
  SCENE5_LINE6_DUR,
  SCENE5_LINE7_DUR,
} from "./constants";

/**
 * Shutter Flash Transition Effect
 * Creates a brief white flash between scenes
 */
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
 * Scene 5 Composition: Not Understanding Duties and Taxes
 * Orchestrates the sequence of animations for the fifth mistake
 *
 * Uganda script timing breakdown (@ 30fps):
 * - Sent 1 (Intro): 154 frames
 * - Sent 2 (Mombasa): 154 frames
 * - Sent 3 (Rules): 167 frames
 * - Sent 4 (Problem): 167 frames
 * - Sent 5 (Solution): 143 frames
 * - Sent 6 (Benefit): 143 frames
 */
export const Scene5Composition: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent">
      <Series>
        {/* Sentence 1: Mistake #5 Introduction */}
        {SCENE5_LINE1_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE1_DUR}>
            <Scene5Line1 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Sentence 2: Mombasa surprise */}
        {SCENE5_LINE2_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE2_DUR}>
            <Scene5Line2 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Sentence 3: Rules - Engine/Value */}
        {SCENE5_LINE3_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE3_DUR}>
            <Scene5Line3 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Sentence 4: Problem - Buyers forget full landed cost */}
        {SCENE5_LINE4_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE4_DUR}>
            <Scene5Line4 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Sentence 5: Solution - Full invoice guidance */}
        {SCENE5_LINE5_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE5_DUR}>
            <Scene5Line5 />
            <ShutterFlash />
          </Series.Sequence>
        )}

        {/* Sentence 6: Benefit - Budget properly */}
        {SCENE5_LINE6_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE6_DUR}>
            <Scene5Line6 />
          </Series.Sequence>
        )}

        {/* Sentence 7: Skipped for Uganda */}
        {SCENE5_LINE7_DUR > 0 && (
          <Series.Sequence durationInFrames={SCENE5_LINE7_DUR}>
            <Scene5Line7 />
          </Series.Sequence>
        )}
      </Series>
    </div>
  );
};

// Export constants
export * from "./constants";
