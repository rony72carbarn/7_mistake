import { staticFile } from "remotion";

// ============================================================
// COLORS & THEME (Scene 8 - Outro)
// ============================================================
export const TECH_BLUE = "#0052FF";
export const ACCENT_CYAN = "#00D4FF";
export const SUCCESS_GREEN = "#00C853";
export const GOLD = "#FFB800";
export const TEXT_DARK = "#0A0A0B";
export const TEXT_WHITE = "#FFFFFF";
export const SLATE_BG = "#F8FAFC";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ============================================================
// SCENE 8 ASSETS
// ============================================================
export const IMG_DASHBOARD = staticFile("assets/global/sence_8_assets/asset_01.png");
export const IMG_VESSEL = staticFile("assets/global/sence_8_assets/asset_02.png");
export const IMG_DOCUMENTS = staticFile("assets/global/sence_8_assets/asset_03.png");
export const IMG_READY_TO_SHIP = staticFile("assets/global/sence_8_assets/asset_04.png");
export const IMG_SHIPPED = staticFile("assets/global/sence_8_assets/asset_05.png");
export const IMG_ARRIVED = staticFile("assets/global/sence_8_assets/asset_06.png");

// ============================================================
// LOTTIE ANIMATIONS
// ============================================================
export const LOTTIE_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
export const LOTTIE_SHIPPING = staticFile("assets/global/animated_icons/Shipping.json");
export const LOTTIE_DASHBOARD = staticFile("assets/global/animated_icons/Report V2.json");
export const LOTTIE_DOWNLOAD = staticFile("assets/global/animated_icons/download.json");
export const LOTTIE_CAR = staticFile("assets/global/animated_icons/Car.json");
export const LOTTIE_TROPHY = staticFile("assets/global/animated_icons/Trophy.json");
export const LOTTIE_THUMBS_UP = staticFile("assets/global/animated_icons/Thumbs up.json");

// ============================================================
// REGION & LOGO
// ============================================================
export const CURRENT_REGION: string = "UGANDA";
export const LOGO = staticFile("assets/carbarn_uganda/main_logo.webp");

// ============================================================
// SCENE 8 TIMINGS (frames @ 30fps) - From script_metadata.json (Uganda)
// ============================================================

// Sentence 1: "Okulaba mmotoka..."
// Duration: 4.609s = ~138 frames
export const SCENE8_LINE1_DUR = 138;

// Sentence 2: "carbarn."
// Duration: 1.057s = ~32 frames
export const SCENE8_LINE2_DUR = 32;

// Sentence 3: "co." (Skipped in Uganda script "carbarn.ug")
export const SCENE8_LINE3_DUR = 0;

// Sentence 4: "ug, weekenneenye alipoota..." (Features)
// Duration: 7.198s = ~216 frames
export const SCENE8_LINE4_DUR = 216;

// Sentence 5 & 6: "Era bw’oba..." + "okuva e Japan..."
// Duration: 6.339s + 6.339s = 12.678s = ~380 frames
export const SCENE8_LINE5_DUR = 380;

export const SCENE8_TOTAL_DUR =
    SCENE8_LINE1_DUR +
    SCENE8_LINE2_DUR +
    SCENE8_LINE3_DUR +
    SCENE8_LINE4_DUR +
    SCENE8_LINE5_DUR;
