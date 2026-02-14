import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";
import { LottieAnimationData } from "@remotion/lottie";

export const useLottie = (src: string): LottieAnimationData | null => {
    const [handle] = useState(() => delayRender("Loading Lottie animation"));
    const [data, setData] = useState<LottieAnimationData | null>(null);

    useEffect(() => {
        fetch(src)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                continueRender(handle);
            })
            .catch((err) => {
                console.error(`Failed to load Lottie animation from ${src}:`, err);
                cancelRender(err);
            });
    }, [handle, src]);

    return data;
};
