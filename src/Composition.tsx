import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  spring,
  Series,
  Easing,
} from "remotion";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import React, { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";
import { Scene8Composition } from "./scene_8";

// Colors
const TECH_BLUE = "#0052FF";
const WARNING_RED = "#FF3B30";
const WARNING_ORANGE = "#FF9500";
const SUCCESS_GREEN = "#34C759";
const TEXT_DARK = "#0A0A0B";
const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// Assets - Uganda region
const AUDIO = staticFile("audio.mp3");
const LOGO = staticFile("assets/carbarn_uganda/main_logo.webp");

// Scene 2 specific assets
const IMG_TWO_REPORTS = staticFile("assets/global/scene_2_assets/two_inspection_report.png");
const IMG_EXTERIOR = staticFile("assets/global/scene_2_assets/extorior_conditons.png");
const IMG_INTERIOR = staticFile("assets/global/scene_2_assets/interiro_conditions.png");
const IMG_WARNING_LIGHT = staticFile("assets/global/scene_2_assets/warning_light.png");
const IMG_BUMPER = staticFile("assets/global/scene_2_assets/bumper_scratch_body_mar.png");
const IMG_INTERIOR_WEAR = staticFile("assets/global/scene_2_assets/interior_ware.png");
const IMG_RIMS = staticFile("assets/global/scene_2_assets/Wheel_scuffs.png");
const IMG_PHOTOS_COMMENTS = staticFile("assets/global/scene_2_assets/photos_and_comments.png");
const IMG_TRANSPARENCY = staticFile("assets/global/scene_2_assets/transparancy_you_can_actually_use.png");
const LOTTIE_TRUST = staticFile("assets/global/scene_2_assets/car_solc_with_trust.json");
const LOTTIE_PERFECT = staticFile("assets/global/scene_2_assets/perfect_conditions_car.json");

// Animated Icons (Lotties)
const LOTTIE_ALERT = staticFile("assets/global/animated_icons/Alert.json");
const LOTTIE_CAR = staticFile("assets/global/animated_icons/Car.json");
const LOTTIE_SEARCH = staticFile("assets/global/animated_icons/search.json");
const LOTTIE_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
const LOTTIE_REPORT = staticFile("assets/global/animated_icons/Report V2.json");

// Scene Timings precisely synced with Luganda audio (Mistake #2) - FFmpeg verified
const LINE1_DUR = 66;  // Ensobi ey’okubiri... (Ends ~2.2s)
const LINE2_DUR = 113; // Obutakebera mbeera ntuufu... (Ends ~6.0s)
const LINE3_DUR = 138; // Ku Carbarn, ofuna alipoota... (Ends ~10.6s)
const LINE4_DUR = 155; // Auction Sheet / Inspection Report... (Ends ~15.7s)
const LINE5_DUR = 152; // Wano w’okakasiza ebintu... (Ends ~20.8s)
const LINE6_DUR = 77;  // n’ebizibu ebirala nga warning lights... (Ends ~23.4s)
const LINE7_DUR = 100; // obulale ku bumper, ebibaddewo munda... (Ends ~26.7s)
const LINE8_DUR = 157; // rims, ebifaananyi n'annyinyonnyola... (Ends ~31.9s)
const LINE9_DUR = 242; // Eyo ye nkola ey’amazima gy’osobola okwesigamako. (Buffer added)

// Lottie Loader Hook
const useLottie = (src: string) => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const [data, setData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, [handle, src]);

  return data;
};

// Premium Grid Background
const PremiumGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = interpolate(frame, [0, 1600], [0, 250], { extrapolateRight: "extend" });

  return (
    <AbsoluteFill className="pointer-events-none overflow-hidden">
      <div
        className="absolute inset-[-200px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${GRID_COLOR} 1px, transparent 1px),
            linear-gradient(to bottom, ${GRID_COLOR} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${-offset % 60}px, ${-offset % 60}px) rotate(-1deg)`,
          opacity: 0.8,
        }}
      />
      <div className="absolute inset-0 flex flex-wrap justify-around opacity-30">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-[30vw] h-[30vw] rounded-full blur-[150px]"
            style={{
              backgroundColor: TECH_BLUE,
              transform: `translate(${Math.sin(frame / 200 + i) * 80}px, ${Math.cos(frame / 250 + i) * 80}px)`,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Word-by-word reveal animation
const WordReveal: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}> = ({ text, delay = 0, color = TEXT_DARK, className = "text-5xl", highlightWords = [], highlightColor = WARNING_RED }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div className={`flex flex-wrap items-center ${className} font-black leading-tight`}>
      {text.split(" ").map((word, i) => {
        const spr = spring({
          frame: frame - delay - i * 3,
          fps,
          config: { damping: 14, stiffness: 220 },
        });

        const isHighlight = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()));

        return (
          <span
            key={i}
            className="inline-block mr-3"
            style={{
              opacity: interpolate(spr, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(spr, [0, 1], [30, 0])}px)`,
              color: isHighlight ? highlightColor : color,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Modern Scene Wrapper with fade in/out
const SceneWrapper: React.FC<{ children: React.ReactNode; duration: number; bg?: string }> = ({
  children,
  duration,
  bg = "#E9F3FF",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bg, opacity }}>
      <PremiumGrid />
      <div className="relative z-10 w-full h-full flex items-center justify-center px-16">{children}</div>
    </AbsoluteFill>
  );
};

// ============================================================
// LINE 1: "Mistake number two: Not verifying the car's real condition."
// Assets: car_with_problems.png + problem_2_intro_bg.png + Lottie car_solc_with_trust
// ============================================================
const Line1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_ALERT);

  const badgeScale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 200 } });
  const imgSlide = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const lineWidth = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

  return (
    <SceneWrapper duration={LINE1_DUR}>
      <div className="w-full max-w-6xl flex items-center gap-12">
        <div className="flex-1 relative" style={{ opacity: imgSlide, transform: `translateX(${interpolate(imgSlide, [0, 1], [-80, 0])}px)` }}>
          <Img src={IMG_WARNING_LIGHT} className="w-full rounded-3xl shadow-2xl" style={{ filter: "brightness(0.85)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl" style={{ opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }) }}>⚠️</div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg" style={{ transform: `scale(${interpolate(badgeScale, [0, 1], [0.5, 1])})`, opacity: badgeScale }}>
            <span className="text-white text-3xl font-black tracking-wider">ENSOBI #2</span>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ transform: `scaleX(${lineWidth})`, transformOrigin: "left" }} />
          <WordReveal text="Ensobi ey’okubiri:" delay={20} className="text-5xl" highlightWords={["Ensobi", "okubiri"]} highlightColor={WARNING_RED} />
          {lottieData && (
            <div style={{ width: 120, height: 120, opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }) }}>
              <Lottie animationData={lottieData} style={{ width: 120, height: 120 }} />
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 2: "At Carbarn, you get two inspection reports before you commit:
//          the original Auction Sheet plus the Carbarn Inspection Report."
// Assets: two_inspection_report.png
// ============================================================
const Line2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_TRUST);

  const logoSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const imgScale = spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 180 } });

  return (
    <SceneWrapper duration={LINE2_DUR}>
      <div className="w-full max-w-6xl flex items-center gap-12">
        <div className="flex-1 space-y-8">
          <div style={{ opacity: logoSpring, transform: `translateY(${interpolate(logoSpring, [0, 1], [-30, 0])}px)` }}>
            <WordReveal text="Obutakebera mbeera ntuufu mmotoka gy’erimu." delay={10} className="text-5xl" highlightWords={["Obutakebera", "ntuufu"]} highlightColor={WARNING_RED} />
          </div>
          {lottieData && (
            <div style={{ width: 180, height: 180, opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" }) }}>
              <Lottie animationData={lottieData} style={{ width: 180, height: 180 }} />
            </div>
          )}
        </div>
        <div className="flex-1" style={{ opacity: imgScale, transform: `scale(${interpolate(imgScale, [0, 1], [0.85, 1])})` }}>
          <Img src={IMG_TWO_REPORTS} className="w-full rounded-3xl shadow-2xl" />
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 3: "This is where you confirm the important things:
//          exterior condition, interior condition,"
// Assets: extorior_conditons.png + interiro_conditions.png
// ============================================================
const Line3Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_CAR);
  const textSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const imgSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 180 } });

  return (
    <SceneWrapper duration={LINE3_DUR}>
      <div className="w-full max-w-6xl flex items-center gap-12">
        <div className="flex-1" style={{ opacity: imgSpring, transform: `translateX(${interpolate(imgSpring, [0, 1], [-60, 0])}px) scale(${interpolate(imgSpring, [0, 1], [0.9, 1])})` }}>
          <Img src={IMG_TWO_REPORTS} className="w-full rounded-3xl shadow-2xl" />
        </div>
        <div className="flex-1 space-y-6">
          <div style={{ opacity: textSpring, transform: `translateY(${interpolate(textSpring, [0, 1], [-20, 0])}px)` }}>
            <Img src={LOGO} className="h-16 mb-4" />
            <WordReveal text="Ku Carbarn, ofuna alipoota z'okukebera bbiri nga tonnasalawo:" delay={5} className="text-5xl" highlightWords={["alipoota", "bbiri"]} highlightColor={TECH_BLUE} />
          </div>
          {lottieData && (
            <div style={{ width: 140, height: 140, opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
              <Lottie animationData={lottieData} style={{ width: 140, height: 140 }} />
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 4: "and the specific issues — like warning lights,
//          bumper scratches, interior wear, and wheel scuffs —"
// Assets: warning_light.png, bumper_scratch_body_mar.png, interior_ware.png, Wheel_scuffs.png
// ============================================================
const Line4Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_SEARCH);
  const imgSpring = spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 180 } });

  return (
    <SceneWrapper duration={LINE4_DUR}>
      <div className="w-full max-w-6xl space-y-8">
        <WordReveal text="Wano w’okakasiza ebintu ebikulu: embeera y'okungulu n’eyomunda," delay={5} className="text-4xl" highlightWords={["Wano", "ntuufu"]} highlightColor={TECH_BLUE} />
        <div className="flex gap-12 items-center">
          <div className="flex-1" style={{ opacity: imgSpring, transform: `scale(${interpolate(imgSpring, [0, 1], [0.85, 1])})` }}>
            <div className="grid grid-cols-2 gap-4">
              <Img src={IMG_EXTERIOR} className="rounded-2xl shadow-xl" />
              <Img src={IMG_INTERIOR} className="rounded-2xl shadow-xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {lottieData && (
                <div style={{ width: 250, height: 250, opacity: interpolate(frame, [40, 60], [0, 0.8], { extrapolateRight: "clamp" }) }}>
                  <Lottie animationData={lottieData} style={{ width: 250, height: 250 }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 5: "Mabhureki a tshwanetse go utlwala a rita e bile a tshephega,"
// ============================================================
const Line5Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_PERFECT);
  const imgSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 180 } });
  const textSpring = spring({ frame: frame - 15, fps, config: { damping: 200 } });

  return (
    <SceneWrapper duration={LINE5_DUR}>
      <div className="w-full max-w-5xl flex items-center gap-12">
        <div className="flex-1 space-y-4" style={{ opacity: textSpring, transform: `translateX(${interpolate(textSpring, [0, 1], [-40, 0])}px)` }}>
          <WordReveal text="n’ebizibu ebirala nga 'warning lights'," delay={5} className="text-5xl" highlightWords={["ebizibu", "warning"]} highlightColor={WARNING_RED} />
        </div>
        <div className="flex-1 relative" style={{ opacity: imgSpring, transform: `scale(${interpolate(imgSpring, [0, 1], [0.85, 1])})` }}>
          <Img src={IMG_WARNING_LIGHT} className="w-full rounded-2xl shadow-2xl" />
          {lottieData && (
            <div className="absolute top-4 right-4" style={{ width: 100, height: 100, opacity: interpolate(frame, [60, 80], [0, 1]) }}>
              <Lottie animationData={lottieData} style={{ width: 100, height: 100 }} />
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 6: "e seng go dira ruzha kgotsa go roroma."
// ============================================================
const Line6Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_ALERT);
  const imgSpring = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const textSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 180 } });

  return (
    <SceneWrapper duration={LINE6_DUR} bg="#FFF5F5">
      <div className="w-full max-w-5xl flex flex-row-reverse items-center gap-12">
        <div className="flex-1 space-y-4" style={{ opacity: textSpring, transform: `translateX(${interpolate(textSpring, [0, 1], [40, 0])}px)` }}>
          <WordReveal text="obulale ku 'bumper', ebibaddewo munda," delay={5} className="text-5xl" highlightWords={["obulale", "bumper"]} highlightColor={WARNING_ORANGE} />
          {lottieData && (
            <div style={{ width: 120, height: 120, opacity: interpolate(frame, [60, 80], [0, 1]) }}>
              <Lottie animationData={lottieData} />
            </div>
          )}
        </div>
        <div className="flex-1 relative" style={{ opacity: imgSpring, transform: `scale(${interpolate(imgSpring, [0, 1], [0.9, 1])})` }}>
          <div className="grid grid-cols-2 gap-4">
            <Img src={IMG_BUMPER} className="rounded-xl shadow-lg" />
            <Img src={IMG_INTERIOR_WEAR} className="rounded-xl shadow-lg" />
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 7: "Ka dipego tsa Carbarn le dinepe tse di tletseng,"
// ============================================================
const Line7Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_REPORT);
  const imgScale = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 150 } });

  return (
    <SceneWrapper duration={LINE7_DUR}>
      <div className="w-full max-w-6xl flex items-center gap-12">
        <div className="flex-1" style={{ opacity: imgScale, transform: `scale(${interpolate(imgScale, [0, 1], [0.8, 1])}) rotate(-2deg)` }}>
          <Img src={IMG_RIMS} className="w-full rounded-3xl shadow-2xl border-4 border-white" />
        </div>
        <div className="flex-1 space-y-6">
          <WordReveal text="n'obuvune ku 'rims'—byonna nga biriko ebifaananyi n'annyinyonnyola." delay={10} className="text-4xl" highlightWords={["obuvune"]} highlightColor={TECH_BLUE} />
          {lottieData && (
            <div style={{ width: 140, height: 140, opacity: interpolate(frame, [50, 70], [0, 1]) }}>
              <Lottie animationData={lottieData} style={{ width: 140, height: 140 }} />
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 8: "o ka bona go fela ga dilo tse go sa le gale —"
// ============================================================
const Line8Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_SUCCESS);
  const imgSpring = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  return (
    <SceneWrapper duration={LINE8_DUR} bg="#F0FFF4">
      <div className="w-full max-w-6xl flex flex-col items-center gap-8">
        <WordReveal text="Eyo ye nkola ey’amazima" delay={5} className="text-5xl text-center" highlightWords={["amazima"]} highlightColor={SUCCESS_GREEN} />
        <div className="w-2/3 relative" style={{ opacity: imgSpring, transform: `translateY(${interpolate(imgSpring, [0, 1], [40, 0])}px)` }}>
          <Img src={IMG_PHOTOS_COMMENTS} className="w-full rounded-3xl shadow-2xl" />
          {lottieData && (
            <div className="absolute -top-10 -right-10" style={{ width: 120, height: 120 }}>
              <Lottie animationData={lottieData} />
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
};

// ============================================================
// LINE 9: "gore o tsee tshwetso e e botlhale pele o lefa."
// ============================================================
const Line9Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lottieData = useLottie(LOTTIE_CAR);
  const logoSpring = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 200 } });

  return (
    <SceneWrapper duration={LINE9_DUR}>
      <div className="w-full max-w-6xl flex items-center gap-12">
        <div className="flex-1 relative" style={{ transform: `scale(${interpolate(frame, [0, LINE9_DUR], [1, 1.1])})` }}>
          <Img src={IMG_TRANSPARENCY} className="w-full rounded-2xl shadow-2xl relative z-10" />
        </div>
        <div className="flex-1 space-y-8">
          <WordReveal text="gy’osobola okwesigamako." delay={10} className="text-6xl font-bold" highlightWords={["okwesigamako"]} highlightColor={TECH_BLUE} />
          {lottieData && (
            <div style={{ width: 150, height: 150, opacity: interpolate(frame, [30, 50], [0, 1]) }}>
              <Lottie animationData={lottieData} />
            </div>
          )}
          <div style={{ opacity: logoSpring, transform: `translateY(${interpolate(logoSpring, [0, 1], [20, 0])}px)` }}>
            <Img src={LOGO} className="h-24" />
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

// Main Composition - Scene 2 (Mistake #2)
export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#E9F3FF]">
      <Audio src={AUDIO} />

      <Series>
        <Series.Sequence durationInFrames={LINE1_DUR}>
          <Line1Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE2_DUR}>
          <Line2Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE3_DUR}>
          <Line3Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE4_DUR}>
          <Line4Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE5_DUR}>
          <Line5Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE6_DUR}>
          <Line6Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE7_DUR}>
          <Line7Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE8_DUR}>
          <Line8Scene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={LINE9_DUR}>
          <Line9Scene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

// Scene 8 Composition - Outro / Call-to-Action
export const Scene8: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#0A0E27]">
      <Audio src={staticFile("assets/global/script_audio.mp3")} />
      <Scene8Composition />
    </AbsoluteFill>
  );
};
