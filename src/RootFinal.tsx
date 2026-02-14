import React from "react";
import { Composition, AbsoluteFill } from "remotion";

const StandaloneComp: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ color: "white", fontSize: 100 }}>FINAL TEST</h1>
        </AbsoluteFill>
    );
};

export const RemotionRoot: React.FC = () => {
    return (
        <Composition
            id="Scene1"
            component={StandaloneComp}
            durationInFrames={30}
            fps={30}
            width={1920}
            height={1080}
        />
    );
};
