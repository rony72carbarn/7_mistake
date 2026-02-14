import React from "react";
import { Composition } from "remotion";
import { Scene1Composition } from "./scene_1/index_debug";
import { SCENE1_TOTAL_DUR } from "./scene_1/constants";

export const RemotionRoot: React.FC = () => {
    return (
        <Composition
            id="Scene1"
            component={Scene1Composition}
            durationInFrames={SCENE1_TOTAL_DUR}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
