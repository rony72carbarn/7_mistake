import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";
import { LottieAnimationData } from "@remotion/lottie";

export const useLottie = (src: string): LottieAnimationData | null => {
    const [handle] = useState(() => delayRender("Loading Lottie animation"));
    const [data, setData] = useState<LottieAnimationData | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadAnimation = async () => {
            try {
                const res = await fetch(src);
                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: Failed to load ${src}`);
                }
                const json = await res.json();

                // Validate that the JSON has required Lottie properties
                if (!json || typeof json !== 'object' || !Array.isArray(json.layers)) {
                    throw new Error(`Invalid Lottie animation data from ${src}: layers must be an array`);
                }

                if (mounted) {
                    setData(json);
                    setLoaded(true);
                    continueRender(handle);
                }
            } catch (err) {
                console.error(`Failed to load Lottie animation from ${src}:`, err);
                if (mounted) {
                    cancelRender(err as Error);
                }
            }
        };

        loadAnimation();

        return () => {
            mounted = false;
        };
    }, [handle, src]);

    return loaded ? data : null;
};
