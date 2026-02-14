import React from "react";
import { Composition } from "remotion";
import "./index.css";
import { Scene1Composition } from "./scene_1";
import { SCENE1_TOTAL_DUR } from "./scene_1/constants";

import { Scene2Composition } from "./scene_2";
import { SCENE2_TOTAL_DUR } from "./scene_2/constants";

import { Scene3Composition } from "./scene_3";
import { SCENE3_TOTAL_DUR } from "./scene_3/constants";

import { Scene4Composition } from "./scene_4";
import { SCENE4_TOTAL_DUR } from "./scene_4/constants";

import { Scene5Composition } from "./scene_5";
import { SCENE5_TOTAL_DUR } from "./scene_5/constants";
import { Scene5Schema, Scene5DefaultProps } from "./scene_5/schema";

import { Scene8Composition } from "./scene_8";
import { SCENE8_TOTAL_DUR } from "./scene_8/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Scene1"
        component={Scene1Composition}
        durationInFrames={SCENE1_TOTAL_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene2"
        component={Scene2Composition}
        durationInFrames={SCENE2_TOTAL_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene3"
        component={Scene3Composition}
        durationInFrames={Math.floor(SCENE3_TOTAL_DUR)}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene4"
        component={Scene4Composition}
        durationInFrames={Math.floor(SCENE4_TOTAL_DUR)}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene5"
        component={Scene5Composition}
        durationInFrames={Math.floor(SCENE5_TOTAL_DUR)}
        fps={30}
        width={1920}
        height={1080}
        schema={Scene5Schema}
        defaultProps={Scene5DefaultProps}
      />
      <Composition
        id="Scene8"
        component={Scene8Composition}
        durationInFrames={SCENE8_TOTAL_DUR}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
