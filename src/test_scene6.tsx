import { registerRoot } from "remotion";
import { Scene6Composition } from "./scene_6";
import { SCENE6_TOTAL_DUR } from "./scene_6/constants";
import { AbsoluteFill, Audio, staticFile, Composition } from "remotion";
import React from "react";

const Scene6: React.FC = () => {
    return (
        <AbsoluteFill className="bg-gradient-to-br from-[#F8FAFC] to-[#DDEAFB]">
            <Audio src={staticFile("assets/global/script_audio.mp3")} />
            <Scene6Composition />
        </AbsoluteFill>
    );
};

const TestRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Scene6"
                component={Scene6}
                durationInFrames={SCENE6_TOTAL_DUR}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};

registerRoot(TestRoot);
