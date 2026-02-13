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
} from "remotion";
import React from "react";

// Colors
const TECH_BLUE = "#0052FF";
const WARNING_RED = "#FF3B30";
const WARNING_ORANGE = "#FF9500";
const SUCCESS_GREEN = "#34C759";
const TEXT_DARK = "#0A0A0B";
const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// Assets
const AUDIO = staticFile("audio.mp3");
const LOGO = staticFile("assets/carbarn_zimbabwe/main_logo.webp");
const BG_CAR = staticFile("assets/carbarn_zimbabwe/bg-1.png");

// Scene Timings (Total: 1080 frames / 36s for 34s audio + 2s buffer)
const S1_DUR = 90;   // 3s - Title "MHOSHO #2"
const S2_DUR = 120;  // 4s - Problem statement
const S3_DUR = 150;  // 5s - Two documents intro
const S4_DUR = 150;  // 5s - Auction Sheet
const S5_DUR = 150;  // 5s - Carbarn Report
const S6_DUR = 90;   // 3s - Verification intro
const S7_DUR = 120;  // 4s - 3 categories
const S8_DUR = 150;  // 5s - 4 specific issues
const S9_DUR = 60;   // 2s - Final CTA
const TOTAL_DURATION = S1_DUR + S2_DUR + S3_DUR + S4_DUR + S5_DUR + S6_DUR + S7_DUR + S8_DUR + S9_DUR;

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
              transform: `translate(${Math.sin(frame / 200 + i) * 80}px, ${Math.cos(frame / 250 + i) * 80}px)`
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Character Reveal Animation
const CharReveal: React.FC<{ text: string; delay?: number; color?: string; size?: string }> = ({
  text, delay = 0, color = TEXT_DARK, size = "text-9xl"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div className={`flex flex-wrap items-center justify-center ${size} font-black tracking-tighter leading-none`}>
      {text.split("").map((char, i) => {
        const spr = spring({
          frame: frame - delay - i * 1.5,
          fps,
          config: { damping: 14, stiffness: 220 },
        });

        const opacity = interpolate(spr, [0, 1], [0, 1]);
        const translateY = interpolate(spr, [0, 1], [60, 0]);
        const rotate = interpolate(spr, [0, 1], [15, 0]);

        return (
          <span
            key={i}
            style={{
              opacity,
              display: "inline-block",
              transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
              color: char === "#" || !isNaN(Number(char)) ? WARNING_RED : color,
              paddingRight: char === " " ? "0.25em" : "0"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

// Modern Scene Wrapper
const ModernSceneWrapper: React.FC<{ children: React.ReactNode; duration: number }> = ({ children, duration }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-[#E9F3FF]" style={{ opacity }}>
      <PremiumGrid />
      <div className="relative z-10 w-full h-full flex items-center justify-center px-16">
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Scene 1: Title Reveal - "MHOSHO #2"
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S1_DUR}>
      <div className="text-center space-y-8">
        <div className="overflow-hidden py-4">
          <CharReveal text="MHOSHO #2" color={WARNING_RED} />
        </div>
        <div
          className="h-2 w-48 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
          style={{
            transform: `scaleX(${interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" })})`
          }}
        />
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 2: Problem Statement
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <ModernSceneWrapper duration={S2_DUR}>
      <div className="w-full max-w-6xl flex items-center gap-16">
        <div className="flex-1 relative">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl"
            style={{ opacity: interpolate(frame, [0, 30], [0, 1]) }}
          />
          <Img src={BG_CAR} className="w-full rounded-3xl" style={{ filter: "grayscale(100%) brightness(0.5)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl">❓</div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-6xl font-black text-black leading-tight">
            {"Kurega kuongorora mamiriro chaiwo emotokari.".split(" ").map((word, i) => {
              const spr = spring({ frame: frame - 20 - i * 3, fps });
              return (
                <span key={i} className="inline-block" style={{
                  opacity: spr,
                  transform: `translateY(${interpolate(spr, [0, 1], [20, 0])}px)`
                }}>
                  {word}&nbsp;
                </span>
              );
            })}
          </h2>
          <p className="text-2xl text-black/60 font-bold">Not checking the actual car condition</p>
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 3: Two Documents Intro
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S3_DUR}>
      <div className="w-full max-w-5xl text-center space-y-12">
        <div className="space-y-4">
          <Img src={LOGO} className="h-16 mx-auto" />
          <h3 className="text-4xl font-black text-black">
            Unopiwa <span className="text-blue-600">magwaro maviri</span> ekuongorora
          </h3>
          <p className="text-xl text-black/60">You get TWO inspection documents</p>
          <div
            className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-black text-lg"
            style={{
              opacity: interpolate(frame, [40, 60], [0, 1]),
              transform: `scale(${interpolate(frame, [40, 60], [0.8, 1])})`
            }}
          >
            BEFORE YOU PAY
          </div>
        </div>

        <div className="flex gap-8 justify-center">
          {["Document 1", "Document 2"].map((doc, i) => {
            const delay = 60 + i * 20;
            const spr = spring({ frame: frame - delay, fps: 30 });
            return (
              <div
                key={i}
                className="w-64 h-80 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-4 border-white p-8 flex items-center justify-center"
                style={{
                  opacity: spr,
                  transform: `translateX(${interpolate(spr, [0, 1], [i === 0 ? -100 : 100, 0])}px) rotate(${interpolate(spr, [0, 1], [i === 0 ? -10 : 10, 0])}deg)`
                }}
              >
                <div className="text-center space-y-4">
                  <div className="text-7xl">📄</div>
                  <p className="text-2xl font-black text-blue-600">{doc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 4: Auction Sheet
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S4_DUR}>
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-6xl font-black text-black">Auction Sheet</h3>
          <p className="text-3xl text-blue-600 font-bold">Gwaro rekubhurandi</p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-2xl p-12 border-8 border-yellow-400">
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-black">
            OFFICIAL
          </div>

          <div className="space-y-6">
            {[
              { label: "Year", value: "2019", icon: "📅" },
              { label: "Mileage", value: "45,000 km", icon: "🛣️" },
              { label: "Grade", value: "4.5 / 5.0", icon: "⭐" },
              { label: "Auction Score", value: "A+", icon: "🏆" }
            ].map((item, i) => {
              const spr = spring({ frame: frame - 30 - i * 15, fps: 30 });
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-blue-50 rounded-2xl"
                  style={{
                    opacity: spr,
                    transform: `translateX(${interpolate(spr, [0, 1], [-50, 0])}px)`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{item.icon}</span>
                    <span className="text-3xl font-bold text-black">{item.label}</span>
                  </div>
                  <span className="text-4xl font-black text-blue-600">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 5: Carbarn Inspection Report
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S5_DUR}>
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <Img src={LOGO} className="h-20 mx-auto" />
          <h3 className="text-5xl font-black text-black">Carbarn Inspection Report</h3>
          <p className="text-2xl text-blue-600 font-bold">Gwaro rekuongorora reCarbarn</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            { title: "Exterior", icon: "🚗", status: "✓" },
            { title: "Interior", icon: "🪑", status: "✓" },
            { title: "Mechanical", icon: "⚙️", status: "✓" }
          ].map((item, i) => {
            const spr = spring({ frame: frame - 40 - i * 15, fps: 30 });
            return (
              <div
                key={i}
                className="relative"
                style={{
                  opacity: spr,
                  transform: `translateY(${interpolate(spr, [0, 1], [50, 0])}px) scale(${interpolate(spr, [0, 1], [0.8, 1])})`
                }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-center space-y-4 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-5xl">{item.status}</div>
                  <div className="text-8xl">{item.icon}</div>
                  <p className="text-3xl font-black text-white">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 6: Verification Points Intro
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S6_DUR}>
      <div className="text-center space-y-8">
        <div className="text-8xl">🔍</div>
        <h3 className="text-7xl font-black text-black">
          Zvinhu Zvakakosha
        </h3>
        <p className="text-4xl text-blue-600 font-bold">Important Verification Points</p>

        <div className="relative w-64 h-64 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="16"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke={TECH_BLUE}
              strokeWidth="16"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={2 * Math.PI * 120 * (1 - interpolate(frame, [15, 60], [0, 1], { extrapolateRight: "clamp" }))}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-blue-600">
              {Math.round(interpolate(frame, [15, 60], [0, 100], { extrapolateRight: "clamp" }))}%
            </span>
          </div>
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 7: Three Categories
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S7_DUR}>
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-3 gap-8">
          {[
            { title: "Kunze", subtitle: "Exterior", icon: "🚗", color: "from-blue-500 to-blue-600" },
            { title: "Mukati", subtitle: "Interior", icon: "🪑", color: "from-purple-500 to-purple-600" },
            { title: "Matambudziko", subtitle: "Problems", icon: "⚠️", color: "from-red-500 to-red-600" }
          ].map((item, i) => {
            const spr = spring({ frame: frame - 20 - i * 15, fps: 30 });
            return (
              <div
                key={i}
                style={{
                  opacity: spr,
                  transform: `translateY(${interpolate(spr, [0, 1], [80, 0])}px)`
                }}
              >
                <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-10 text-center space-y-6 h-full`}>
                  <div className="text-9xl">{item.icon}</div>
                  <div>
                    <p className="text-5xl font-black text-white">{item.title}</p>
                    <p className="text-2xl text-white/80 font-bold mt-2">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 8: Specific Issues with Icons
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S8_DUR}>
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Warning Lights", shona: "Mwenje yeyambiro", icon: "🚨", color: "bg-red-100 border-red-400" },
            { title: "Brake Performance", shona: "Kukwesheka kwebhamu", icon: "🛑", color: "bg-orange-100 border-orange-400" },
            { title: "Interior Wear", shona: "Kusakara kwemukati", icon: "🪑", color: "bg-yellow-100 border-yellow-400" },
            { title: "Tire Wear", shona: "Kukwesheka kwemavhiri", icon: "⚙️", color: "bg-blue-100 border-blue-400" }
          ].map((item, i) => {
            const spr = spring({ frame: frame - 25 - i * 12, fps: 30 });
            return (
              <div
                key={i}
                className={`${item.color} border-4 rounded-3xl p-8 flex items-center gap-6`}
                style={{
                  opacity: spr,
                  transform: `scale(${interpolate(spr, [0, 1], [0.8, 1])})`
                }}
              >
                <div className="text-8xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-3xl font-black text-black">{item.shona}</p>
                  <p className="text-xl text-black/60 font-bold">{item.title}</p>
                </div>
                <div
                  className="text-6xl"
                  style={{
                    opacity: interpolate(frame, [60 + i * 10, 80 + i * 10], [0, 1])
                  }}
                >
                  ✅
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModernSceneWrapper>
  );
};

// Scene 9: Final CTA - Photos & Descriptions
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ModernSceneWrapper duration={S9_DUR}>
      <div className="text-center space-y-8">
        <div className="text-9xl">📸</div>
        <div className="space-y-4">
          <h3 className="text-6xl font-black text-black">
            Paine mapikicha netsananguro
          </h3>
          <p className="text-3xl text-blue-600 font-bold">
            With Photos & Descriptions
          </p>
        </div>
        <Img src={LOGO} className="h-16 mx-auto" />
      </div>
    </ModernSceneWrapper>
  );
};

// Main Composition
export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#E9F3FF]">
      <Audio src={AUDIO} />

      <Series>
        <Series.Sequence durationInFrames={S1_DUR}>
          <Scene1 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S2_DUR}>
          <Scene2 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S3_DUR}>
          <Scene3 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S4_DUR}>
          <Scene4 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S5_DUR}>
          <Scene5 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S6_DUR}>
          <Scene6 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S7_DUR}>
          <Scene7 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S8_DUR}>
          <Scene8 />
        </Series.Sequence>

        <Series.Sequence durationInFrames={S9_DUR}>
          <Scene9 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
