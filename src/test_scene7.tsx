import { registerRoot } from "remotion";
import { Scene4Composition } from "./scene_4"; // Just to see if it works
import { Scene7Composition } from "./scene_7";
import { SCENE7_TOTAL_DUR } from "./scene_7/constants";
import { AbsoluteFill, Audio, staticFile, Composition } from "remotion";
import React from "react";

const Scene7: React.FC = () => {
    return (
        <AbsoluteFill className="bg-gradient-to-br from-[#F8FAFC] to-[#DDEAFB]">
            <Audio src={staticFile("assets/global/script_audio.mp3")} />
            <Scene7Composition />
        </AbsoluteFill>
    );
};

const TestRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Scene7"
                component={Scene7}
                durationInFrames={SCENE7_TOTAL_DUR}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};

registerRoot(TestRoot);
