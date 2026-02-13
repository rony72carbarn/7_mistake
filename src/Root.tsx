import "./index.css";
import { Composition, AbsoluteFill, Audio, staticFile } from "remotion";
import { Scene4, Scene5, Scene6, Scene8 } from "./Composition";
import { SCENE4_TOTAL_DUR } from "./scene_4";
import { SCENE5_TOTAL_DUR } from "./scene_5";

import { Scene7Composition } from "./scene_7";
import { SCENE7_TOTAL_DUR } from "./scene_7/constants";
import { SCENE8_TOTAL_DUR } from "./scene_8/constants";

// Scene 7 Composition - Mistake #7 (Malawi - Tracking) 
// Registered directly to bypass potential circular dependencies
const Scene7: React.FC = () => {
  return (
    <AbsoluteFill className="bg-gradient-to-br from-[#F8FAFC] to-[#DDEAFB]">
      <Audio src={staticFile("assets/global/script_audio.mp3")} />
      <Scene7Composition />
    </AbsoluteFill>
  );
};

// Luganda audio (Mistake #2) - Precise Sync: 1200 frames @ 30fps
// South Sudan audio (Mistake #4) - Precise Sync: 1010 frames @ 30fps
// South Sudan audio (Mistake #5) - Precise Sync: 810 frames @ 30fps
// South Sudan audio (Mistake #6) - Precise Sync: 780 frames @ 30fps
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Scene4"
        component={Scene4}
        durationInFrames={SCENE4_TOTAL_DUR}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Scene5"
        component={Scene5}
        durationInFrames={SCENE5_TOTAL_DUR}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Scene6"
        component={Scene6}
        durationInFrames={920}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene7"
        component={Scene7}
        durationInFrames={688}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene8"
        component={Scene8}
        durationInFrames={SCENE8_TOTAL_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
