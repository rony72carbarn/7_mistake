import { staticFile } from "remotion";

// ============================================================
// COLORS & THEME (Scene 7)
// ============================================================
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B3B";
export const SUCCESS_GREEN = "#00C853";
export const SLATE_BG = "#F8FAFC";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ============================================================
// SCENE 7 MAIN IMAGES (Mapped to sence_8_assets EXACT BEATS)
// ============================================================
export const IMG_MISTAKE_INTRO = staticFile("assets/global/sence_8_assets/asset_00.png"); // Uncertainty
export const IMG_CARBARN_DIFFERENT = staticFile("assets/global/sence_8_assets/asset_01.png"); // Different/Dashboard hub
export const IMG_WAIT_HOPE = staticFile("assets/global/sence_8_assets/asset_00.png"); // "Don't just wait and hope"
export const IMG_DASHBOARD = staticFile("assets/global/sence_8_assets/asset_01.png"); // Dashboard launch
export const IMG_VESSEL = staticFile("assets/global/sence_8_assets/asset_02.png"); // Vessel progress
export const IMG_DOCUMENTS = staticFile("assets/global/sence_8_assets/asset_03.png"); // Download docs
export const IMG_READY_TO_SHIP = staticFile("assets/global/sence_8_assets/asset_04.png"); // Stage 1
export const IMG_SHIPPED = staticFile("assets/global/sence_8_assets/asset_05.png"); // Stage 2
export const IMG_ARRIVED = staticFile("assets/global/sence_8_assets/asset_06.png"); // Stage 3
export const IMG_ALWAYS_KNOW = staticFile("assets/global/sence_8_assets/asset_06.png"); // Final state

// ============================================================
// LOTTIE ANIMATIONS
// ============================================================
export const LOTTIE_TRACKING = staticFile("assets/global/animated_icons/Shipping.json");
export const LOTTIE_DASHBOARD = staticFile("assets/global/animated_icons/Report V2.json");
export const LOTTIE_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
export const LOTTIE_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOTTIE_CHECK = staticFile("assets/global/animated_icons/Validation.json");

// ============================================================
// REGION TOGGLE
// ============================================================
export const CURRENT_REGION: string = 'UGANDA';

// ============================================================
// CARBARN LOGO
// ============================================================
export const LOGO = staticFile("assets/carbarn_uganda/main_logo.webp");

// ============================================================
// SCENE 7 TIMINGS (frames @ 30fps) - Derived from script_metadata.json
// ============================================================

// Sentence 1: Ensobi ey'omusanvu
// Duration: 4.122s = 124 frames
export const SCENE7_LINE1_DUR = 124;

// Sentence 2: tewali mawulire
// Duration: 4.122s = 124 frames
export const SCENE7_LINE2_DUR = 124;

// Sentence 3: "You don’t just “wait and hope."
// Duration: 2.253s = 68 frames
export const SCENE7_LINE3_DUR = 53;

// Sentence 4: "You log into your Carbarn Dashboard to track real vessel progress..."
// Duration: 5.416s = 162 frames
export const SCENE7_LINE4_DUR = 64;   // 2.148s - Tobeera awo

// Sentence 5+6: Dashboard tracking + Ready to Ship stages (combined)
// Duration: 6.414s + 6.415s = 12.829s = 385 frames (split into LINE5: 193, visual stages in LINE5)
export const SCENE7_LINE5_DUR = 193;  // 6.414s - Dashboard tracking part

// Sentence 7: Always know
// Duration: 4.377s = 131 frames
export const SCENE7_LINE6_DUR = 131;  // 6.415s - Ready to Ship stages

export const SCENE7_TOTAL_DUR =
    SCENE7_LINE1_DUR +
    SCENE7_LINE2_DUR +
    SCENE7_LINE3_DUR +
    SCENE7_LINE4_DUR +
    SCENE7_LINE5_DUR +
    SCENE7_LINE6_DUR;
