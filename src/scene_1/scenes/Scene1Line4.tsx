import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lottie } from "@remotion/lottie";
import { Scene1Wrapper } from "../components/Scene1Wrapper";
import { useLottie } from "../components/LottieLoader";
import {
    SCENE1_LINE4_DUR,
    S1_IMG_03,
    LOT_BADGE,
} from "../constants";

export const Scene1Line4: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const lottieData = useLottie(LOT_BADGE);

    const popUp = spring({
        frame,
        fps,
        config: { stiffness: 200, damping: 10 },
    });

    const scaleUp = spring({
        frame: frame - 10,
        fps,
        config: { stiffness: 100 },
    });

    return (
        <Scene1Wrapper duration={SCENE1_LINE4_DUR} bgImage={S1_IMG_03}>
            <div className="flex flex-col items-center justify-center w-full gap-16">
                <div
                    className="relative z-20"
                    style={{
                        transform: `scale(${scaleUp})`,
                        opacity: interpolate(frame, [10, 30], [0, 1])
                    }}
                >
                    <h2 className="text-7xl font-black text-white text-center drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-tight">
                        চেক স্কিপ <br />
                        <span className="text-orange-500 underline decoration-white">মরণ মিস্টেক!</span>
                    </h2>
                </div>

                <div className="relative">
                    <div className="w-80 h-80 drop-shadow-2xl" style={{ transform: `scale(${popUp})` }}>
                        {lottieData && <Lottie animationData={lottieData} />}
                    </div>
                </div>
            </div>
        </Scene1Wrapper>
    );
};
