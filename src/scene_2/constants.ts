import { staticFile } from "remotion";

// DURATIONS (Total ~35.6s @ 30fps = 1069 frames)
// Splitting 1069 frames into 5 sequences
export const SCENE2_LINE1_DUR = 214;
export const SCENE2_LINE2_DUR = 214;
export const SCENE2_LINE3_DUR = 214;
export const SCENE2_LINE4_DUR = 214;
export const SCENE2_LINE5_DUR = 213;

export const SCENE2_BUFFER = 30;
export const SCENE2_TOTAL_DUR = SCENE2_LINE1_DUR + SCENE2_LINE2_DUR + SCENE2_LINE3_DUR + SCENE2_LINE4_DUR + SCENE2_LINE5_DUR + SCENE2_BUFFER;

// COLORS
export const TECH_BLUE = "#0052FF";
export const WARNING_RED = "#FF3B30";
export const WARNING_ORANGE = "#FF9500";
export const SUCCESS_GREEN = "#34C759";
export const TEXT_DARK = "#0A0A0B";
export const GRID_COLOR = "rgba(0, 82, 255, 0.12)";

// ASSETS
export const S2_IMG_00 = staticFile("assets/global/scene_2_assets/asset_00.png");
export const S2_IMG_01 = staticFile("assets/global/scene_2_assets/asset_01.png");
export const S2_IMG_02 = staticFile("assets/global/scene_2_assets/asset_02.png");
export const S2_IMG_03 = staticFile("assets/global/scene_2_assets/asset_03.png");
export const S2_IMG_04 = staticFile("assets/global/scene_2_assets/asset_04.png");

// LOTTIES
export const LOT_ALERT = staticFile("assets/global/animated_icons/Alert.json");
export const LOT_CAR = staticFile("assets/global/animated_icons/Car.json");
export const LOT_SUCCESS = staticFile("assets/global/animated_icons/Success.json");
export const LOT_SEARCH = staticFile("assets/global/animated_icons/search.json");
export const LOT_CHOOSE = staticFile("assets/global/animated_icons/Choose.json");
export const LOT_GDPR = staticFile("assets/global/animated_icons/GDPR.json");
