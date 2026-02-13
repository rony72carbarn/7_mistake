import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";
import { LottieAnimationData } from "@remotion/lottie";

/**
 * Custom hook for loading Lottie animation JSON files
 * Handles async loading with Remotion's render control
 *
 * @param src - Path to Lottie JSON file (use staticFile())
 * @returns Lottie animation data or null if still loading
 */
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
